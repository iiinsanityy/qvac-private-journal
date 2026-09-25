# QVAC Private Journal - 100% On-Device

Private journaling app that runs 100% on-device with QVAC SDK. No cloud, no Ollama, no Xcode 20GB download, no data leaves your Mac. Built for Monterey 12.7 Intel where native AI builds fail.

## What it does
- Save journal entries → locally embedded via `embed()` → stored via `ragIngest()`
- Ask questions in natural language → `ragSearch()` finds relevant entries → `completion()` answers with local LLM
- All models run on CPU, 100% offline after first download

## SDK Version
**@qvac/sdk: 0.19.1**

**Functions used for bounty:**
- `loadModel('embedding', {model: 'all-MiniLM-L6-v2', device: 'cpu'})` - loads embedding model
- `loadModel('llm', {model: 'llama-3.2-1b-instruct', device: 'cpu'})` - loads LLM
- `embed(text)` - creates vector for entry
- `ragIngest(documents)` - stores entries in local vector DB
- `ragSearch(query)` - semantic search over your journal
- `completion(prompt)` - local LLM answers

## Install
```bash
git clone https://github.com/iiinsanityy/qvac-private-journal.git
cd qvac-private-journal
npm install
