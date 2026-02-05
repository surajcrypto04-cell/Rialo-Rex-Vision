export const COLORS = {
  rialoBlue: '#00F2FF',
  rialoBlueDark: '#00C4CC',
  rialoDeep: '#050505',
  optimisticGreen: '#00FF88',
  pessimisticBlue: '#0066FF',
};

// Use environment variable for WebSocket URL
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';

export const ARCHITECTURE_ITEMS = [
  {
    id: 'native-https',
    title: 'Native HTTPS',
    subtitle: 'No Oracle Required',
    description: 'Rialo validators can directly receive and verify HTTPS requests from Web2 APIs, eliminating the need for oracle networks.',
    icon: '🌐',
    color: '#00F2FF'
  },
  {
    id: 'sfs',
    title: 'Stake-for-Service',
    subtitle: 'Self-Paying Gas',
    description: 'Applications stake RIA tokens and receive continuous credits to pay for gas, enabling gasless UX for end users.',
    icon: '⚡',
    color: '#00FF88'
  },
  {
    id: 'hybrid-concurrency',
    title: 'Hybrid Concurrency',
    subtitle: 'Optimistic + Pessimistic',
    description: 'Choose execution mode per transaction: fast optimistic for low-risk, secure pessimistic for high-value settlements.',
    icon: '🔄',
    color: '#FFB800'
  },
  {
    id: 'reactive-txs',
    title: 'Reactive Transactions',
    subtitle: 'Event-Driven Logic',
    description: 'Smart contracts can "wake up" based on external events without continuous polling or cron jobs.',
    icon: '🎯',
    color: '#FF6B6B'
  }
];