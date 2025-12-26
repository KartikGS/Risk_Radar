"use server";

import fs from "fs";
import path from "path";
import { getSession } from "@/lib/llm/loadModel";
import { generate } from "@/lib/llm/generate";

const meta = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "lib/tokenizer/meta.json"),
    "utf8"
  )
);

export async function generateText(prompt: string) {
  if (!prompt || typeof prompt !== "string") {
    return "Invalid prompt";
  }

  const session = await getSession();

  return await generate({
    session,
    meta,
    prompt,
    maxNewTokens: 500,
  });
}

export async function query(data: { inputs: string; }) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/KartikGPT/Gemma-2b-finetune",
      {
        headers: {
          'Authorization': `Bearer ${process.env.HF_token}`,
          'Content-Type': "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}