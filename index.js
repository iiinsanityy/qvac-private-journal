import { loadModel, embed, ragIngest, ragSearch, completion } from '@qvac/sdk';

console.log('QVAC Private Journal - Loading models on-device (cpu)...');

const embeddingModel = await loadModel('embedding', { 
  model: 'all-MiniLM-L6-v2', 
  device: 'cpu' 
});

const llmModel = await loadModel('llm', { 
  model: 'llama-3.2-1b-instruct', 
  device: 'cpu' 
});

console.log('Models loaded - 100% on-device');

// Example private journal flow
const journalEntry = "Today I felt stressed about the QVAC bounty deadline on my Monterey Intel Mac";

const vector = await embed({ 
  modelId: embeddingModel, 
  text: journalEntry 
});

await ragIngest({ 
  modelId: embeddingModel, 
  documents: [{ id: '1', text: journalEntry }], 
  workspace: 'journal' 
});

const question = "What stressed me?";
const searchResults = await ragSearch({ 
  modelId: embeddingModel, 
  query: question, 
  workspace: 'journal' 
});

const answer = await completion({ 
  modelId: llmModel, 
  prompt: `Based on these journal entries: ${JSON.stringify(searchResults)} Answer this question: ${question}`,
  maxTokens: 200
});

console.log('Q:', question);
console.log('A:', answer);
console.log('Done - All inference ran on-device (cpu), no cloud');
