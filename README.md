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

```bash
sudo rm -rf /Applications/Xcode.app
sudo xcode-select --reset
sudo softwareupdate -i Command\ Line\ Tools\ for\ Xcode-14.2
# If that says "No such update", download CLT 14.2 dmg from:
# https://developer.apple.com/download/all/ -> search "Command Line Tools for Xcode 14.2"
```

**Install app:**

```bash
git clone https://github.com/YOUR_USERNAME/qvac-private-journal.git
cd qvac-private-journal
npm install
```

## Run

```bash
npm start
# open http://localhost:3000
```

First run downloads models (~1-2GB) then runs 100% offline.

1. Save 3 entries
2. Ask: "what stressed me?"
3. See local RAG + LLM answer

## Screenshot / Recording

Take screenshot of http://localhost:3000 showing:
- Saved entries
- Question + AI answer (showing on-device completion)

## X Post Template

```
Built a 100% on-device private journal with @qvac SDK 0.19.1 - embed + ragIngest + ragSearch + completion all local, no cloud. Works on Monterey Intel!

Repo: https://github.com/YOUR_USERNAME/qvac-private-journal

#localAI #qvac
```

Tag @qvac and link repo.

## Why I built it

Private journaling should stay private. Cloud AI reads your thoughts. QVAC runs everything on-device - your journal never leaves your Mac. Built for Monterey Intel where native builds fail with 20GB Xcode requirement.

## License

MIT - See LICENSE file 
