import * as ort from "onnxruntime-node";
import path from "path";

let session: ort.InferenceSession | null = null;

export async function getSession() {
  if (!session) {
    session = await ort.InferenceSession.create(
      path.join(process.cwd(), "public/models/bigram.onnx")
    );
  }
  return session;
}
