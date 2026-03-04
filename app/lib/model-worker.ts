/**
 * Web Worker for local model inference using @mlc-ai/web-llm with WebGPU.
 *
 * Loads the fine-tuned tarot model from /model/ (served from public/model/).
 * Uses the MLC WebGPU runtime for fast in-browser inference.
 *
 * Messages IN:
 *   { type: "init", origin: string }                 — Start downloading / loading
 *   { type: "generate", messages: ChatMessage[] }    — Run text generation
 *   { type: "abort" }                                — Abort current generation
 *
 * Messages OUT:
 *   { type: "init-progress", progress: number, message: string }
 *   { type: "init-done" }
 *   { type: "init-error", error: string }
 *   { type: "token", token: string, fullText: string }
 *   { type: "generate-done", fullText: string }
 *   { type: "generate-error", error: string }
 */

import * as webllm from "@mlc-ai/web-llm";

const MODEL_ID = "lumina-tarot-qwen2";

// Qwen2.5-3B architecture (36 layers, 2048 hidden) — must match the compiled model
const MODEL_LIB_URL =
  "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/" +
  webllm.modelVersion +
  "/Qwen2.5-3B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm";

let engine: webllm.MLCEngine | null = null;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

function log(level: "info" | "warn" | "error", ...args: unknown[]) {
  const prefix = `[Worker:${MODEL_ID}]`;
  switch (level) {
    case "info":
      console.log(prefix, ...args);
      break;
    case "warn":
      console.warn(prefix, ...args);
      break;
    case "error":
      console.error(prefix, ...args);
      break;
  }
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    // WASM runtime crash — provide a more helpful message
    if (error.name === "ExitStatus" || error.message.includes("exit(")) {
      return (
        "WebGPU/WASM runtime crashed. This usually means: " +
        "(1) the WASM library doesn't match the model architecture, " +
        "(2) the device ran out of GPU memory, or " +
        "(3) WebGPU is not fully supported on this browser. " +
        `Original: ${error.name}: ${error.message}`
      );
    }
    // Cache API failures
    if (error.message.includes("Cache") || error.message.includes("Request failed")) {
      return (
        "Failed to cache model files. The model files at /model/ may not be accessible. " +
        `Original: ${error.message}`
      );
    }
    // WebGPU not available
    if (error.message.includes("WebGPU") || error.message.includes("gpu")) {
      return (
        "WebGPU is not available. Please use a recent version of Chrome, Edge, or other WebGPU-capable browser. " +
        `Original: ${error.message}`
      );
    }
    return `${error.name}: ${error.message}`;
  }
  return String(error);
}

async function initModel(origin: string) {
  log("info", "Starting model initialization...");
  log("info", "Model URL:", origin + "/model");
  log("info", "WASM library:", MODEL_LIB_URL);

  try {
    postMessage({ type: "init-progress", progress: 0, message: "Preparing WebGPU engine..." });

    const appConfig: webllm.AppConfig = {
      model_list: [
        {
          model: origin + "/model",
          model_id: MODEL_ID,
          model_lib: MODEL_LIB_URL,
          overrides: {
            context_window_size: 4096,
          },
        },
      ],
    };

    engine = await webllm.CreateMLCEngine(MODEL_ID, {
      appConfig,
      initProgressCallback: (report: webllm.InitProgressReport) => {
        const pct = Math.round(report.progress * 100);
        log("info", `Init progress: ${pct}% — ${report.text}`);
        postMessage({
          type: "init-progress",
          progress: pct,
          message: report.text,
        });
      },
    });

    log("info", "Model loaded successfully!");
    postMessage({ type: "init-done" });
  } catch (error) {
    const msg = formatError(error);
    log("error", "Model loading failed:", error);
    postMessage({ type: "init-error", error: msg });
  }
}

async function generate(messages: ChatMessage[]) {
  if (!engine) {
    const msg = "Cannot generate: model is not loaded yet.";
    log("error", msg);
    postMessage({ type: "generate-error", error: msg });
    return;
  }

  log("info", "Starting generation with", messages.length, "messages");
  let fullText = "";
  let tokenCount = 0;
  const startTime = Date.now();

  try {
    const chunks = await engine.chat.completions.create({
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
      stream: true,
    });

    for await (const chunk of chunks) {
      const delta = chunk.choices[0]?.delta?.content || "";
      if (delta) {
        tokenCount++;
        fullText += delta;
        postMessage({ type: "token", token: delta, fullText });
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const tokPerSec = tokenCount > 0 ? (tokenCount / ((Date.now() - startTime) / 1000)).toFixed(1) : "0";
    log("info", `Generation complete: ${tokenCount} tokens in ${elapsed}s (${tokPerSec} tok/s)`);
    postMessage({ type: "generate-done", fullText });
  } catch (error) {
    // If generation was interrupted by user, silently return
    if (error instanceof Error && error.message.includes("interrupt")) {
      log("info", "Generation interrupted by user.");
      return;
    }

    const msg = formatError(error);
    log("error", "Generation failed:", error);
    postMessage({ type: "generate-error", error: msg });
  }
}

// Handle messages from main thread
self.addEventListener("message", (event: MessageEvent) => {
  const { type, messages: chatMessages, origin } = event.data;

  switch (type) {
    case "init":
      initModel(origin);
      break;
    case "generate":
      generate(chatMessages);
      break;
    case "abort":
      log("info", "Abort requested");
      engine?.interruptGenerate();
      break;
  }
});
