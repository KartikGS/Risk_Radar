// In case streaming is needed we will use client side request to this route

export const runtime = "nodejs";

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

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const session = await getSession();

  const text = await generate({
    session,
    meta,
    prompt,
    maxNewTokens: 200,
  });

  return Response.json({ text });
}
