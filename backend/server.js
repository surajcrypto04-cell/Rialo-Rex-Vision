// REX-VISION Debugger - WebSocket Hub
const WebSocket = require('ws');
const http = require('http');
const eventBus = require('./utils/eventBus');
const SfSSimulator = require('./simulators/sfsSimulator');
const HTTPSSimulator = require('./simulators/httpsSimulator');
const TransactionSimulator = require('./simulators/transactionSimulator');

// Use environment variable for port (required for hosting)
const PORT = process.env.PORT || 8080;

const sfsSimulator = new SfSSimulator();
const httpsSimulator = new HTTPSSimulator();
const transactionSimulator = new TransactionSimulator(sfsSimulator);

// Create HTTP server for health checks
const server = http.createServer((req, res) => {
  // Health check endpoint
  if (req.url === '/health' || req.url === '/') {
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Rialo REX-Vision Backend is running',
      timestamp: Date.now()
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Attach WebSocket to HTTP server
const wss = new WebSocket.Server({ server });

console.log('REX-VISION Debugger running on port', PORT);

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.send(JSON.stringify({
    type: 'INIT',
    data: {
      sfs: sfsSimulator.getState(),
      transaction: transactionSimulator.getStats(),
      concurrencyMode: transactionSimulator.concurrencyMode,
      serverTime: Date.now()
    }
  }));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      
      switch (parsed.type) {
        case 'SET_CONCURRENCY_MODE':
          transactionSimulator.setConcurrencyMode(parsed.mode);
          break;
        case 'SET_STAKE_AMOUNT':
          sfsSimulator.setStakedAmount(parsed.amount);
          break;
        case 'TRIGGER_MANUAL_TX':
          httpsSimulator.generateEvent();
          break;
        default:
          console.log('Unknown message type:', parsed.type);
      }
    } catch (e) {
      console.error('Message parse error:', e);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const broadcast = (type, data) => {
  const message = JSON.stringify({ type, data, timestamp: Date.now() });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

eventBus.on('SFS_UPDATE', (data) => broadcast('SFS_UPDATE', data));
eventBus.on('HTTPS_EVENT', (data) => broadcast('HTTPS_EVENT', data));
eventBus.on('TRANSACTION', (data) => broadcast('TRANSACTION', data));
eventBus.on('TPS_UPDATE', (data) => broadcast('TPS_UPDATE', data));
eventBus.on('CONCURRENCY_MODE_CHANGE', (data) => broadcast('CONCURRENCY_MODE_CHANGE', data));

sfsSimulator.start();
httpsSimulator.start();
transactionSimulator.start();

// Start HTTP server
server.listen(PORT, () => {
  console.log('Server running on port', PORT);
  console.log('WebSocket ready for connections');
  console.log('Health check: http://localhost:' + PORT + '/health\n');
});