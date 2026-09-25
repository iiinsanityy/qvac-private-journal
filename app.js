import { loadModel, embed, ragIngest, ragSearch, completion } from '@qvac/sdk';

async function main() {
  // Load models on-device (cpu)
  const embedModel = await loadModel('embedding', { model: 'all-MiniLM-L6-v2', device: 'cpu' });
  const llmModel = await loadModel('llm', { model: 'llama-3.2-1b-instruct', device: 'cpu' });

  console.log('QVAC Private Journal - 100% On-Device');
  
  // Example: embed and ingest
  const entry = "Today I was stressed about QVAC bounty on my Monterey Intel Mac";
  const vector = await embed({ modelId: embedModel, text: entry });
  await ragIngest({ modelId: embedModel, documents: [{ text: entry }], workspace: "journal" });

  // Example: search and complete
  const question = "what stressed me?";
  const results = await ragSearch({ modelId: embedModel, query: question, workspace: "journal" });
  const answer = await completion({ modelId: llmModel, prompt: `Based on ${JSON.stringify(results)} answer: ${question}` });
  
  console.log(answer);
}

main();
