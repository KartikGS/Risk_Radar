function softmax(logits: Float32Array | number[]) {
  const max = Math.max(...logits);
  const exps = Array.from(logits).map(v => Math.exp(v - max));
  const sum = exps.reduce((a: number, b: number): number => a + b, 0);
  return exps.map(v => v / sum);
}

function sampleMultinomial(probs: number[]) {
  let r = Math.random();
  let cum = 0;
  for (let i = 0; i < probs.length; i++) {
    cum += probs[i];
    if (r < cum) return i;
  }
  return probs.length - 1;
}

export { softmax, sampleMultinomial };