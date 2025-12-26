import { softmax, sampleMultinomial } from "./sampling";
import type * as OrtType from "onnxruntime-web";

interface ModelMeta {
  stoi: Record<string, number>;
  itos: Record<string, string>;
  block_size: number;
}

let session: OrtType.InferenceSession | null = null;
let ort: typeof OrtType | null = null;

async function getOrt(): Promise<typeof OrtType> {
  if (!ort) {
    ort = await import("onnxruntime-web");
  }
  return ort;
}

async function getSession(): Promise<OrtType.InferenceSession> {
  if (!session) {
    const ortModule = await getOrt();
    session = await ortModule.InferenceSession.create(
      "/models/bigram.onnx",
      { executionProviders: ["wasm"] }
    );
  }
  return session;
}

export async function generate({
  meta,
  prompt = "",
  maxNewTokens = 200,
}: {
  meta: ModelMeta;
  prompt: string;
  maxNewTokens: number;
}) {
  const { stoi, itos, block_size } = meta;
  const session = await getSession();

  // encode prompt
  let idx: number[] = prompt.split("").map(c => stoi[c] ?? 0);

  if (idx.length === 0) idx = [0];

  for (let step = 0; step < maxNewTokens; step++) {
    // crop to block_size (causal window)
    const idxCond =
      idx.length > block_size
        ? idx.slice(idx.length - block_size)
        : idx;

    // ONNX expects int64 - use BigInt64Array for web
    const ortModule = await getOrt();
    const inputTensor = new ortModule.Tensor(
      "int64",
      new BigInt64Array(idxCond.map(BigInt)),
      [1, idxCond.length]
    );

    const outputs = await session.run({
      input_ids: inputTensor,
    });

    // logits shape: [1, T, vocab]
    const logits = outputs.logits.data as Float32Array;
    const vocabSize = Object.keys(itos).length;
    const T = idxCond.length;

    // take last timestep logits
    const start = (T - 1) * vocabSize;
    const end = start + vocabSize;
    const lastLogits = Array.from(logits.slice(start, end));

    // softmax + sampling
    const probs = softmax(lastLogits);
    const nextToken = sampleMultinomial(probs);

    // append
    idx.push(nextToken);
  }

  // decode
  return idx.map(i => itos[String(i)] ?? "").join("");
}

