import { loadModel, completion, QWEN3_600M_INST_Q4 } from '@qvac/sdk';

async function main() {
  console.log('Loading model on-device...');
  const modelId = await loadModel({
    modelSrc: QWEN3_600M_INST_Q4,
    modelType: 'llamacpp-completion',
    modelConfig: { ctx_size: 512 }
  });
  console.log('Model loaded! QVAC Private Journal - 100% on-device');
  const run = completion({
    modelId,
    history: [{ role: 'user', content: 'You are a private journal assistant running entirely on-device. Reflect supportively on: Today I felt focused.' }],
    stream: false
  });
  const result = await run.final;
  console.log(result.text || result.content);
}
main();
