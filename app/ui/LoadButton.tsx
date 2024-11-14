"use client";

import Image from "next/image";
import { query } from "../lib/actions";
import { useState } from "react";

export default function LoadButton(
  {modelState,setModelState,setTimer}:
  {modelState: string,
  setModelState:React.Dispatch<React.SetStateAction<string>>,
  setTimer:React.Dispatch<React.SetStateAction<number>>
}) {
  
    const [disabled, setDisabled] = useState(false);

  async function loadModel() {
    if (modelState==='Not Loaded'){
      const response = await query({ inputs: "" });
      console.log(response);
      if('estimated_time' in response){
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
          setModelState('Loaded')
        }, response.estimated_time*1000);
        setModelState('Loading');
        setTimer(response.estimated_time);
      }
      else if('error_type' in response){
        console.log('Model already loaded');
        setModelState('Loaded') 
      }
      else if ('error' in response){
        console.log('error occured try again')
      }
    }
    else{
      console.log('Model already loaded')
    }
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
