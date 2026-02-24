/**
 * Web Worker for ONNX model inference using @huggingface/transformers v3.
 *
 * Uses the pre-built onnx-community/Qwen2.5-0.5B-Instruct model from
 * HuggingFace, which is properly optimized for browser inference.
 * The model is ~360MB (q4) and downloads on first use, then cached.
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
 *   { type: "generate-progress", message: string, tokenCount: number, elapsed: number }
 *   { type: "generate-done", fullText: string }
 *   { type: "generate-error", error: string }
 */

import {
  pipeline,
  TextGenerationPipeline,
  TextStreamer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} from "@huggingface/transformers";

const MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";

let generator: TextGenerationPipeline | null = null;
let abortController: AbortController | null = null;

async function initModel() {
  try {
    postMessage({ type: "init-progress", progress: 5, message: "Loading model..." });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generator = (await (pipeline as any)("text-generation", MODEL_ID, {
      dtype: "q4",
      device: "webgpu",
      progress_callback: (progress: { status: string; progress?: number; file?: string }) => {
        if (progress.status === "progress" && progress.progress !== undefined) {
          postMessage({
            type: "init-progress",
            progress: Math.round(progress.progress),
            message: `Downloading: ${progress.file || "model"}`,
          });
        } else if (progress.status === "ready") {
          postMessage({ type: "init-progress", progress: 95, message: "Warming up..." });
        }
      },
    })) as TextGenerationPipeline;

    postMessage({ type: "init-done" });
  } catch (error) {
    const webgpuMsg = error instanceof Error ? error.message : String(error);
    console.warn("[Worker] WebGPU unavailable, falling back to WASM:", webgpuMsg);

    try {
      postMessage({ type: "init-progress", progress: 10, message: "WebGPU unavailable, using CPU..." });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      generator = (await (pipeline as any)("text-generation", MODEL_ID, {
        dtype: "q4",
        device: "wasm",
        progress_callback: (progress: { status: string; progress?: number; file?: string }) => {
          if (progress.status === "progress" && progress.progress !== undefined) {
            postMessage({
              type: "init-progress",
              progress: Math.round(progress.progress),
              message: `Downloading: ${progress.file || "model"}`,
            });
          }
        },
      })) as TextGenerationPipeline;

      postMessage({ type: "init-done" });
    } catch (fallbackError) {
      const wasmMsg = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
      console.error("[Worker] Model loading failed:", wasmMsg);
      postMessage({
        type: "init-error",
        error: `WebGPU: ${webgpuMsg} | WASM: ${wasmMsg}`,
      });
    }
  }
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function generate(messages: ChatMessage[]) {
  if (!generator) {
    postMessage({ type: "generate-error", error: "Model not loaded" });
    return;
  }

  abortController = new AbortController();
  let fullText = "";
  let tokenCount = 0;
  const startTime = Date.now();

  // Heartbeat: send status every 5 seconds
  const heartbeat = setInterval(() => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const tokPerSec = tokenCount > 0 ? (tokenCount / ((Date.now() - startTime) / 1000)).toFixed(1) : "0";
    const msg = tokenCount > 0
      ? `Generating... ${tokenCount} tokens (${tokPerSec} tok/s, ${elapsed}s)`
      : `Processing prompt... (${elapsed}s)`;
    postMessage({ type: "generate-progress", message: msg, tokenCount, elapsed: Number(elapsed) });
  }, 5000);

  // Timeout: if no token generated within 120 seconds, abort
  const timeout = setTimeout(() => {
    if (tokenCount === 0) {
      clearInterval(heartbeat);
      abortController?.abort();
      postMessage({
        type: "generate-error",
        error: "Generation timed out — model may be too slow for this device.",
      });
    }
  }, 120000);

  try {
    // Use TextStreamer for token-by-token streaming (transformers.js v3 API)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const streamer = new (TextStreamer as any)(generator.tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
      callback_function: (text: string) => {
        tokenCount++;
        fullText += text;
        postMessage({ type: "token", token: text, fullText });
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const output = await generator(messages as any, {
      max_new_tokens: 512,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.1,
      do_sample: true,
      return_full_text: false,
      streamer,
    } as any);

    clearInterval(heartbeat);
    clearTimeout(timeout);

    // If streamer didn't capture text, extract from output
    if (!fullText && Array.isArray(output) && output[0]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = output[0] as any;
      if (result.generated_text) {
        if (typeof result.generated_text === "string") {
          fullText = result.generated_text;
        } else if (Array.isArray(result.generated_text)) {
          const lastMsg = result.generated_text[result.generated_text.length - 1];
          fullText = lastMsg?.content || JSON.stringify(lastMsg);
        }
      }
    }

    postMessage({ type: "generate-done", fullText });
  } catch (error) {
    clearInterval(heartbeat);
    clearTimeout(timeout);

    if (abortController?.signal.aborted) {
      return;
    }
    console.error("[Worker] Generation error:", error);
    postMessage({
      type: "generate-error",
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    abortController = null;
  }
}

// Handle messages from main thread
self.addEventListener("message", (event: MessageEvent) => {
  const { type, messages: chatMessages } = event.data;

  switch (type) {
    case "init":
      initModel();
      break;
    case "generate":
      generate(chatMessages);
      break;
    case "abort":
      abortController?.abort();
      break;
  }
});
