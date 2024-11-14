'use client'

import ChatInput from "./ChatInput";
import LoadButton from "./LoadButton";
import { useState } from "react";

export default function InteractLLM() {
    const [modelState, setModelState] = useState("Not Loaded");
    const [timer, setTimer] = useState(0);

    return (
      <div className="w-1/2 flex flex-col justify-items-center gap-12">
            <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
              <LoadButton modelState={modelState} setModelState={setModelState} setTimer={setTimer}/>
              <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read our docs
              </a>
            </div>
            {modelState=='Loaded' && <div className="basis-1/2"><ChatInput/></div>}
            {modelState==='Loading' && <div> Try after {timer} seconds</div>}
            {modelState=='Not Loaded' && <p className="text-center">Please Load The Model</p>}
      </div>
    )
}