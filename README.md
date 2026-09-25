# QVAC Private Journal - 100% On-Device

Private journaling with **QVAC SDK 0.19.1** running entirely on-device. No cloud, no data leaves your device.

## What it does and which QVAC function it calls
QVAC Private Journal saves journal entries locally in `journal.enc.json` (100% private, 0% cloud) and provides supportive AI reflections on-device. It calls `loadModel({ modelSrc: QWEN3_600M_INST_Q4, modelType: 'llamacpp-completion' })` and `completion({ modelId, history, stream: false })` with `run.final`.

## Why I built it
I built it because journaling should stay private — cloud AI reads your thoughts. QVAC keeps everything local, and I wanted it to work on my Monterey 12.7 Intel Mac without the 20GB Xcode requirement.

## SDK Version
**@qvac/sdk: 0.19.1**

Functions used:
- `loadModel({ modelSrc: QWEN3_600M_INST_Q4, modelType: 'llamacpp-completion', modelConfig: { ctx_size: 512 } })`
- `completion({ modelId, history, stream: false })`

All inference runs on-device via llama.cpp. No cloud API.

## Install
```bash
git clone https://github.com/iiinsanityy/qvac-private-journal.git
cd qvac-private-journal
npm install
npm start
