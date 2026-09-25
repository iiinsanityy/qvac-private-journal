# QVAC Private Journal - 100% On-Device

Private journaling with **QVAC SDK 0.19.1** running entirely on-device. No cloud, no data leaves your Mac.

## What it does and which QVAC function it calls
QVAC Private Journal saves journal entries on-device — each entry is embedded with `embed()` and stored via `ragIngest()`, then users can ask natural questions that are answered by `ragSearch()` + `completion()` after loading models with `loadModel()` on CPU.

## Why I built it
I built it because private journaling should stay private — cloud AI reads your thoughts. QVAC keeps everything local, and I wanted it to work on my Monterey 12.7 Intel Mac without the 20GB Xcode requirement.

## SDK Version
**@qvac/sdk: 0.19.1**

Functions used:
- `loadModel('embedding', {model: 'all-MiniLM-L6-v2', device: 'cpu'})`
- `loadModel('llm', {model: 'llama-3.2-1b-instruct', device: 'cpu'})`
- `embed()`
- `ragIngest()`
- `ragSearch()`
- `completion()`

All inference runs on-device (cpu). No cloud API.

## What it does (detailed)
Save private thoughts → embedded locally with QVAC → stored in local vector store via `ragIngest` → ask natural language questions → `ragSearch` finds relevant entries → `completion` answers using local LLM. 100% private, offline.

## Install
```bash
git clone https://github.com/iiinsanityy/qvac-private-journal.git
cd qvac-private-journal
npm install
