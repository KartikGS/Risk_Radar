'use client'

import { FormEvent, useState, useRef } from "react";
import { generateText } from "../lib/actions";

const sampleInputs = [
    "Before we proceed any further, hear me speak.",
    "You are all resolved rather to die than to famish?",
    "First, you know Caius Marcius is chief enemy to the people.",
    "Let us kill him, and we'll have corn at our own price.",
    "We are accounted poor citizens, the patricians good.",
    "What authority surfeits on would relieve us: if they",
    "Speak, speak.",
    "No more talking on't; let it be done: away, away!"
];

export default function BaseLLMChat() {
    const [response, setResponse] = useState("Model Response ...");
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const inputText = formData.get('chat') as string;

        if (!inputText || inputText.trim() === '') {
            setIsLoading(false);
            return;
        }

        const result = await generateText(inputText);
        setResponse(result || "Error generating text");
        setIsLoading(false);
    }

    function useSampleInput(sample: string) {
        if (textareaRef.current) {
            textareaRef.current.value = sample;
            textareaRef.current.focus();
        }
    }

    return (
        <div className="flex gap-4 w-full justify-around items-center">
            <div className="w-1/2 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Try the Model</h2>

                {/* Sample Inputs */}
                <div className="flex flex-col gap-2">
                    <p className="w-1/2 text-sm font-medium text-gray-700 dark:text-gray-300">Sample Inputs:</p>
                    <div className="flex flex-wrap gap-2">
                        {sampleInputs.map((sample, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => useSampleInput(sample)}
                                disabled={isLoading}
                                className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sample.length > 40 ? `${sample.substring(0, 40)}...` : sample}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-1/2 flex flex-col gap-4">
                <form onSubmit={onSubmit}>
                    <label htmlFor="chat" className="sr-only">Your message</label>
                    <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <textarea
                            ref={textareaRef}
                            id="chat"
                            name="chat"
                            rows={1}
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                            disabled={isLoading}
                        ></textarea>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form>



                <div className="p-4 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white min-h-[100px] whitespace-pre-wrap">
                    {isLoading ? "Generating..." : response}
                </div>
            </div>
        </div>
    )
}

