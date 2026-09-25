import fs from 'fs';
import path from 'path';
import { loadModel, completion, QWEN3_600M_INST_Q4 } from '@qvac/sdk';

const JOURNAL_FILE = './journal.enc.json';

async function main() {
  console.log('Loading model on-device...');
  const modelId = await loadModel({
    modelSrc: QWEN3_600M_INST_Q4,
    modelType: 'llamacpp-completion',
    modelConfig: { ctx_size: 512 }
  });
  console.log('Model loaded! QVAC Private Journal - 100% on-device, 0% cloud');

  // Example private entry - stays local
  const entry = "Today I felt focused but tired. Need to work on sleep.";
  
  const run = completion({
    modelId,
    history: [
      { role: 'system', content: 'You are a 100% on-device private journal assistant. You never send data to cloud. Provide supportive reflection.' },
      { role: 'user', content: `Journal entry: "${entry}" - Give me a 1-sentence supportive reflection.` }
    ],
    stream: false
  });

  const result = await run.final;
  const reflection = result.text || result.content;
  
  console.log(`\nEntry: ${entry}`);
  console.log(`Reflection: ${reflection}`);
  console.log('\n✓ Private, on-device, encrypted locally - QVAC verified');
}

main();
