# QVAC Private Journal - 100% On-Device

Private journaling with **QVAC SDK 0.19.1** running entirely on-device. No cloud, no data leaves your machine.

**Bounty Requirements Met:**
- ✅ `@qvac/sdk` ^0.19.1 in package.json
- ✅ Calls `loadModel`, `embed`, `ragIngest`, `ragSearch`, `completion`
- ✅ All inference on-device (cpu)
- ✅ Public repo, MIT license

## What it does
Save private thoughts → embedded locally with QVAC → stored via `ragIngest` → ask natural language questions → `ragSearch` finds relevant entries → `completion` answers using local LLM.

All models run on your Mac. Works on Monterey 12.7 Intel.

## SDK Version
**@qvac/sdk: 0.19.1**

Functions used:
- `loadModel('embedding', {model: 'all-MiniLM-L6-v2', device: 'cpu'})`
- `loadModel('llm', {model: 'llama-3.2-1b-instruct', device: 'cpu'})`
- `embed()`
- `ragIngest()`
- `ragSearch()`
- `completion()`

## Install

**For Monterey Intel (fix 20GB Xcode popup):**
If you see `xcode-select: note: no developer tools were found`:
