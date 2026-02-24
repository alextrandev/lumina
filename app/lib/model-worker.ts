/**
 * Web Worker for ONNX model inference using @huggingface/transformers.
 *
 * Messages IN:
 *   { type: "init" }                       — Start downloading / loading the model
 *   { type: "generate", prompt: string }   — Run text generation
 *   { type: "abort" }                      — Abort current generation
 *
 * Messages OUT:
 *   { type: "init-progress", progress: number, message: string }
 *   { type: "init-done" }
 *   { type: "init-error", error: string }
 *   { type: "token", token: string, fullText: string }
 *   { type: "generate-done", fullText: string }
 *   { type: "generate-error", error: string }
 */

import { pipeline, env, TextGenerationPipeline } from "@huggingface/transformers";

// Configure transformers.js to use local model files served from /model/lumina-onnx/
// Web Workers need absolute URLs (relative paths fail in fetch inside workers)
env.allowLocalModels = true;
env.allowRemoteModels = false;
env.localModelPath = `${self.location.origin}/model/`;

let generator: TextGenerationPipeline | null = null;
let abortController: AbortController | null = null;

async function initModel() {
  try {
    postMessage({ type: "init-progress", progress: 5, message: "Loading model..." });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generator = (await (pipeline as any)("text-generation", "lumina-onnx", {
      dtype: "fp16",
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
    // Retry with WASM fallback if WebGPU fails
    try {
      postMessage({ type: "init-progress", progress: 10, message: "WebGPU unavailable, using CPU..." });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      generator = (await (pipeline as any)("text-generation", "lumina-onnx", {
        dtype: "fp16",
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
      postMessage({
        type: "init-error",
        error: fallbackError instanceof Error ? fallbackError.message : "Failed to load model",
      });
    }
  }
}

async function generate(prompt: string) {
  if (!generator) {
    postMessage({ type: "generate-error", error: "Model not loaded" });
    return;
  }

  abortController = new AbortController();
  let fullText = "";

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const output = await generator(prompt, {
      max_new_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.1,
      do_sample: true,
      return_full_text: false,
      callback_function: (beams: Array<{ output_token_ids: number[]; generated_text?: string }>) => {
        if (beams[0]?.generated_text) {
          const newText = beams[0].generated_text;
          if (newText !== fullText) {
            const newToken = newText.slice(fullText.length);
            fullText = newText;
            postMessage({ type: "token", token: newToken, fullText });
          }
        }
      },
    } as any);

    // Extract final text
    if (Array.isArray(output) && output[0]) {
      const result = output[0] as { generated_text?: string };
      if (typeof result.generated_text === "string") {
        fullText = result.generated_text;
      }
    }

    postMessage({ type: "generate-done", fullText });
  } catch (error) {
    if (abortController?.signal.aborted) {
      return; // Silently ignore aborted generations
    }
    postMessage({
      type: "generate-error",
      error: error instanceof Error ? error.message : "Generation failed",
    });
  } finally {
    abortController = null;
  }
}

// Handle messages from main thread
self.addEventListener("message", (event: MessageEvent) => {
  const { type, prompt } = event.data;

  switch (type) {
    case "init":
      initModel();
      break;
    case "generate":
      generate(prompt);
      break;
    case "abort":
      abortController?.abort();
      break;
  }
});
