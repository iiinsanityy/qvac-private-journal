
import { Qvac } from '@qvac/sdk';
import express from 'express';

const app = express();
app.use(express.json());

console.log('🧠 QVAC SDK 0.19.1 - Initializing on-device AI (Monterey Intel compatible)...');

const qvac = new Qvac();

// Bounty required: loadModel
console.log('Loading embedding model...');
const embeddingModel = await qvac.loadModel('embedding', { 
  model: 'all-MiniLM-L6-v2',
  device: 'cpu'
});
console.log('✓ Embedding model ready (on-device)');

console.log('Loading LLM...');
const llmModel = await qvac.loadModel('llm', {
  model: 'llama-3.2-1b-instruct',
  device: 'cpu'
});
console.log('✓ LLM ready (on-device)');

let journals = [];

app.get('/', (req, res) => res.send(`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>QVAC Private Journal - 100% On-Device</title>
<style>
body{font-family:system-ui;max-width:720px;margin:30px auto;padding:20px;line-height:1.6}
textarea{width:100%;height:110px;padding:12px;font-size:15px}
input{width:70%;padding:10px;font-size:15px}
button{padding:10px 18px;margin:6px 4px;cursor:pointer;background:#000;color:#fff;border:0;border-radius:6px}
button:disabled{opacity:0.5}
.entry{border:1px solid #e5e5e5;padding:12px;margin:10px 0;border-radius:8px;background:#fafafa}
#out{background:#f5f5f5;padding:15px;border-radius:8px;white-space:pre-wrap;min-height:60px}
.badge{display:inline-block;background:#000;color:#fff;padding:2px 8px;border-radius:12px;font-size:12px;margin-right:6px}
</style>
</head>
<body>
<h1>📓 QVAC Private Journal</h1>
<p><span class="badge">QVAC SDK 0.19.1</span> <span class="badge">on-device</span> <span class="badge">embed</span> <span class="badge">ragIngest</span> <span class="badge">ragSearch</span> <span class="badge">completion</span></p>
<p>100% private - No cloud. All AI runs on your Mac via QVAC SDK. Monterey Intel compatible.</p>

<textarea id="e" placeholder="Today I felt... (saved only on this device)"></textarea><br>
<button onclick="save()">Save Private (ragIngest)</button>

<hr>
<input id="q" placeholder="Ask your journal: what stressed me this week?">
<button onclick="ask()">Ask (ragSearch + completion)</button>

<pre id="out">Ready. Save some entries first, then ask.</pre>

<h3>Your Entries (on-device)</h3>
<div id="list"><i>Loading...</i></div>

<script>
async function save(){
  const text=document.getElementById('e').value.trim();
  if(!text) return;
  document.getElementById('out').textContent='Embedding + ragIngest locally (QVAC SDK)...';
  const r=await fetch('/api/ingest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
  const j=await r.json();
  document.getElementById('e').value='';
  document.getElementById('out').textContent='✓ Saved on-device via QVAC embed + ragIngest. Total: '+j.count;
  load();
}
async function ask(){
  const q=document.getElementById('q').value.trim();
  if(!q) return;
  document.getElementById('out').textContent='QVAC ragSearch + completion running on-device...';
  const r=await fetch('/api/ask?q='+encodeURIComponent(q));
  document.getElementById('out').textContent=await r.text();
}
async function load(){
  const r=await fetch('/api/entries');
  const data=await r.json();
  document.getElementById('list').innerHTML=data.length? data.map(e=>'<div class=entry><b>'+new Date(e.date).toLocaleString()+'</b><br>'+e.text+'</div>').join('') : '<i>No entries yet</i>';
}
load();
</script>
</body>
</html>
`));

app.post('/api/ingest', async (req, res) => {
  const { text } = req.body;
  // QVAC required functions: embed + ragIngest
  const embedding = await qvac.embed(text, { model: embeddingModel });
  const doc = { id: Date.now().toString(), text, embedding, date: new Date().toISOString() };
  await qvac.ragIngest(doc, { model: embeddingModel });
  journals.push(doc);
  console.log('✓ ragIngest:', text.slice(0,50));
  res.json({ ok: true, count: journals.length });
});

app.get('/api/ask', async (req, res) => {
  const query = req.query.q;
  console.log('Query:', query);
  // QVAC required: embed + ragSearch + completion
  const qEmbedding = await qvac.embed(query, { model: embeddingModel });
  const results = await qvac.ragSearch(query, { model: embeddingModel, topK: 3, embedding: qEmbedding });
  const context = results.map(r => r.text || r.document?.text || '').join('\n');
  console.log('ragSearch found', results.length, 'docs');

  const prompt = `You are a private journal assistant. Use ONLY this context from user's private journal:\n${context}\n\nQuestion: ${query}\nAnswer helpfully and privately in 2-3 sentences:`;
  const answer = await qvac.completion(prompt, { model: llmModel, maxTokens: 250 });
  console.log('✓ completion done');
  res.send(answer);
});

app.get('/api/entries', (req, res) => res.json(journals));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n✅ QVAC Private Journal running: http://localhost:${PORT}`);
  console.log('SDK: 0.19.1 | Functions: loadModel, embed, ragIngest, ragSearch, completion | All on-device');
  console.log('Ready for screenshot/recording\n');
});
