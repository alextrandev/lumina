"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import { ChatMessage } from "@/app/lib/build-prompt";

export type ModelStatus = "idle" | "downloading" | "ready" | "generating" | "done" | "error";

interface UseModelReturn {
  status: ModelStatus;
  progress: number;
  progressMessage: string;
  streamedText: string;
  error: string | null;
  generate: (messages: ChatMessage[]) => void;
  abort: () => void;
}

export function useModel(): UseModelReturn {
  const [status, setStatus] = useState<ModelStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [streamedText, setStreamedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create the Web Worker
    const worker = new Worker(
      new URL("../lib/model-worker.ts", import.meta.url),
      { type: "module" }
    );
    workerRef.current = worker;

    worker.addEventListener("message", (event: MessageEvent) => {
      const data = event.data;

      switch (data.type) {
        case "init-progress":
          setStatus("downloading");
          setProgress(data.progress);
          setProgressMessage(data.message);
          break;
        case "init-done":
          setStatus("ready");
          setProgress(100);
          setProgressMessage("");
          break;
        case "init-error":
          setStatus("error");
          setError(data.error);
          break;
        case "token":
          setStreamedText(data.fullText);
          break;
        case "generate-progress":
          setProgressMessage(data.message);
          break;
        case "generate-done":
          setStreamedText(data.fullText);
          setStatus("done");
          break;
        case "generate-error":
          setStatus("error");
          setError(data.error);
          break;
      }
    });

    // Start downloading the model immediately.
    // Use env var for model URL (e.g. HuggingFace), falling back to local /model path.
    const modelUrl = process.env.NEXT_PUBLIC_MODEL_URL || window.location.origin + "/model";
    worker.postMessage({ type: "init", modelUrl });

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const generate = useCallback((messages: ChatMessage[]) => {
    if (!workerRef.current) return;
    setStreamedText("");
    setStatus("generating");
    setError(null);
    workerRef.current.postMessage({ type: "generate", messages });
  }, []);

  const abort = useCallback(() => {
    workerRef.current?.postMessage({ type: "abort" });
  }, []);

  return {
    status,
    progress,
    progressMessage,
    streamedText,
    error,
    generate,
    abort,
  };
}
