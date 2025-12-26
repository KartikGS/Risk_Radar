import BaseLLMChat from "./BaseLLMChat";
import Navbar from "../ui/navbar";

export default function BaseLLMPage() {
  return (
    <div className="h-full flex">
      <Navbar />
      <div className="w-full flex-1 flex flex-col gap-28 p-12 overflow-y-auto">
        <header>
          <div className="w-full flex justify-around items-center gap-16">
            <div className="text-6xl mb-4">Base LLM</div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              A decoder-only self-attention transformer model built from scratch with ~0.2M parameters, trained on the Shakespeare dataset.
              <span className="block mt-2 text-base">
                <strong>Note:</strong> The output may appear somewhat illogical as this is a very small model trained on limited data.
                The model is converted to ONNX format and runs locally using ONNX Runtime for efficient inference on the server.
              </span>
            </p>
          </div>
        </header>

        <main className="w-full flex flex-col gap-20">
          {/* Reference Materials */}
          <div className="w-full flex gap-6 justify-around items-center">
            <h2 className="text-2xl font-semibold">Reference Materials</h2>

            {/* YouTube Video */}
            <div className="flex flex-col gap-2 w-1/2">
              <h3 className="text-lg font-medium">YouTube Video</h3>
              <div className="w-full aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/kCc8FmEb1nY?si=wqL0c-99Cn29LJoz"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Colab Link */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Colab Notebook</h3>
              <a
                href="https://colab.research.google.com/drive/1B6ZeJNR0eiDCEUbexOj6beXZ-qMiH-3B?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open in Google Colab →
              </a>
            </div>

          </div>

          {/* Chat Interface */}
          <BaseLLMChat />
        </main>
      </div>
    </div>
  );
}

