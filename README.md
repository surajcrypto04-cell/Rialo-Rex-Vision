                         ## Rialo Rex Vision ##

A visual debugger that demonstrates how Rialo blockchain executes transactions without oracles, pays gas through staking, and handles both fast and secure transaction modes.


## Live Demo

🌐 [https://rialo-rex-vision.vercel.app/]

    ** Wait for atleast 2 minutes for backend to load **


## About

This project visualizes three core Rialo concepts:

**Native HTTPS** — Traditional blockchains need oracles (Chainlink) to get external data. Rialo validators fetch Web2 APIs directly. No middleman, no delay.

**Stake-for-Service** — Users hate paying gas. With SfS, apps stake RIA tokens and earn credits that pay gas on behalf of users. The app pays, users don't.

**Hybrid Concurrency** — Not every transaction needs maximum security. Optimistic mode is fast for gaming/small payments. Pessimistic mode locks resources for high-value settlements like real estate.

---

## Features

| Component | What It Shows |
|-----------|---------------|
| Credit Gauge | SfS balance auto-refilling from staking rewards |
| Mode Toggle | Switch between optimistic (fast) and pessimistic (secure) |
| Event Stream | Live Web2 API events with 0ms latency |
| Transaction Canvas | Real-time tx processing and confirmation |
| Timeline View | Step-by-step transaction lifecycle |
| Use Case Simulator | Interactive demos: real estate, insurance, gaming, payments |
| Comparison Panel | Rialo vs Ethereum side-by-side |

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons

**Backend**
- Node.js
- WebSocket (ws)
- Custom event-driven simulators

---

## Run Locally

```bash
# Backend
cd backend && npm install && npm start

# Frontend (new terminal)
cd frontend && npm install && npm run dev

## About Me

I am Suraj, a full-stack developer with a passion for building scalable and efficient web applications. I have experience in building web applications using React, Node.js, and other modern technologies. I am also interested in blockchain development and have experience in building blockchain applications using Solidity and other blockchain technologies.

My X account: [@SurajCrypto69](https://x.com/SurajCrypto69)