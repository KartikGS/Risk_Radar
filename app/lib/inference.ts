import * as ort from "onnxruntime-web";

let session: ort.InferenceSession | null = null;

export async function generateNext(x: Float32Array, T: number) {
  if (!session) {
    session = await ort.InferenceSession.create(
      "/models/bigram.onnx",
      { executionProviders: ["wasm"] }
    );
  }

  const input = new ort.Tensor("float32", x, [1, T, 64]);

  const outputs = await session.run({ input });

  return outputs;
}
