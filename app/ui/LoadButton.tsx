'use client'

import Image from "next/image";
//import { query } from "../lib/actions";

export default function LoadButton(){

    // let disabled = false;

    // function loadModel(){
    //     const response = query({inputs:''});
    //     console.log(response)
    //     disabled = true;
    // }

    return (
        <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            //onClick={loadModel}
            //disabled={disabled}
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
    )
}