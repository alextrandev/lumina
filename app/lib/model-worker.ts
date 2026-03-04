/**
 * Web Worker for local model inference using @mlc-ai/web-llm with WebGPU.
 *
 * Loads the fine-tuned tarot model from /model/ (served from public/model/).
 * Uses the MLC WebGPU runtime for fast in-browser inference.
 *
 * Messages IN:
 *   { type: "init" }                                 — Start downloading / loading
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
const MODEL_LIB_URL =
  "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/" +
  webllm.modelVersion +
  "/Qwen2-1.5B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm";

let engine: webllm.MLCEngine | null = null;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function initModel(origin: string) {
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
        postMessage({
          type: "init-progress",
          progress: pct,
          message: report.text,
        });
      },
    });

    postMessage({ type: "init-done" });
  } catch (error) {
    console.error("[Worker] Model loading failed:", error);
    postMessage({
      type: "init-error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

async function generate(messages: ChatMessage[]) {
  if (!engine) {
    postMessage({ type: "generate-error", error: "Model not loaded" });
    return;
  }

  let fullText = "";

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
        fullText += delta;
        postMessage({ type: "token", token: delta, fullText });
      }
    }

    postMessage({ type: "generate-done", fullText });
  } catch (error) {
    // If generation was interrupted, silently return
    if (error instanceof Error && error.message.includes("interrupt")) {
      return;
    }
    console.error("[Worker] Generation error:", error);
    postMessage({
      type: "generate-error",
      error: error instanceof Error ? error.message : String(error),
    });
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
      engine?.interruptGenerate();
      break;
  }
});
