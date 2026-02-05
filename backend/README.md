# Rialo REX-Vision Backend

WebSocket server that simulates Rialo's core features for the REX-Vision debugger.

## What this does

Simulates three main Rialo concepts:
- **SfS (Stake-for-Service)** - credit system that auto-refills from staking
- **Native HTTPS** - fake Web2 API events hitting the chain
- **Hybrid Concurrency** - optimistic/pessimistic transaction modes

## Quick Start

```bash
npm install
npm start