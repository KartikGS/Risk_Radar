"use client";

import Image from "next/image";
import { query } from "../lib/actions";
import { useState } from "react";

export default function LoadButton(
  {setModelState,setTimer}:
  {setModelState:React.Dispatch<React.SetStateAction<string>>,
  setTimer:React.Dispatch<React.SetStateAction<number>>}) {
  
    const [disabled, setDisabled] = useState(false);

  async function loadModel() {
    const response = await query({ inputs: "" });
    console.log(response);
    setDisabled(true);
    setModelState('Loading');
    setTimer(response[0].time);
  }

  return (
    <button
      className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center ${disabled?'bg-red-900':'bg-foreground'}  text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5`}
      onClick={loadModel}
      disabled={disabled}
    >
      <Image
        className="dark:invert"
        src="/vercel.svg"
        alt="Vercel logomark"
        width={20}
        height={20}
      />
      Load Model
    </button>
  );
}
