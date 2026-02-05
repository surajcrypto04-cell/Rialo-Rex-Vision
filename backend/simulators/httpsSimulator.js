// HTTPS Simulator - Web2 API data without oracles
const eventBus = require('../utils/eventBus');
const { v4: uuidv4 } = require('uuid');

class HTTPSSimulator {
  constructor() {
    this.sources = [
      { name: 'Stripe_API', type: 'payment', icon: '[PAY]' },
      { name: 'FlightAware_API', type: 'travel', icon: '[FLY]' },
      { name: 'Coinbase_API', type: 'price', icon: '[BTC]' },
      { name: 'OpenWeather_API', type: 'weather', icon: '[SKY]' },
      { name: 'Twilio_API', type: 'communication', icon: '[MSG]' },
      { name: 'GitHub_Webhook', type: 'developer', icon: '[GIT]' },
      { name: 'Shopify_API', type: 'commerce', icon: '[BUY]' },
      { name: 'Plaid_API', type: 'banking', icon: '[BANK]' }
    ];
    this.eventCount = 0;
  }

  start() {
    // Random intervval between 500ms - 3000ms
    const scheduleNext = () => {
      const delay = 500 + Math.random() * 2500;
      setTimeout(() => {
        this.generateEvent();
        scheduleNext();
      }, delay);
    };
    scheduleNext();
  }

  generateEvent() {
    const source = this.sources[Math.floor(Math.random() * this.sources.length)];
    const event = this.createEventByType(source);
    this.eventCount++;

    eventBus.emit('HTTPS_EVENT', {
      id: uuidv4().slice(0, 8),
      eventNumber: this.eventCount,
      source: source.name,
      sourceType: source.type,
      icon: source.icon,
      latency: '0ms',
      ...event
    });
  }

  createEventByType(source) {
    switch (source.type) {
      case 'payment':
        return {
          action: 'payment_received',
          amount: (Math.random() * 1000).toFixed(2),
          currency: 'USD',
          customer: `cus_${uuidv4().slice(0, 8)}`
        };
      case 'travel':
        return {
          action: 'flight_update',
          flight: `RIA${Math.floor(Math.random() * 9000) + 1000}`,
          status: ['ON_TIME', 'DELAYED', 'BOARDING'][Math.floor(Math.random() * 3)],
          gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 30) + 1}`
        };
      case 'price':
        return {
          action: 'price_update',
          asset: ['BTC', 'ETH', 'RIA'][Math.floor(Math.random() * 3)],
          price: (40000 + Math.random() * 30000).toFixed(2),
          change24h: ((Math.random() - 0.5) * 10).toFixed(2)
        };
      case 'weather':
        return {
          action: 'weather_alert',
          condition: ['STORM', 'CLEAR', 'RAIN', 'SNOW'][Math.floor(Math.random() * 4)],
          temperature: Math.floor(Math.random() * 40) + 10,
          location: ['NYC', 'LA', 'CHI', 'MIA'][Math.floor(Math.random() * 4)]
        };
      case 'communication':
        return {
          action: 'sms_received',
          from: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          messageType: ['verification', 'alert', 'notification'][Math.floor(Math.random() * 3)]
        };
      case 'developer':
        return {
          action: 'webhook_triggered',
          event: ['push', 'pull_request', 'issue'][Math.floor(Math.random() * 3)],
          repo: `rialo-${['core', 'sdk', 'contracts'][Math.floor(Math.random() * 3)]}`
        };
      case 'commerce':
        return {
          action: 'order_placed',
          orderId: `ORD-${uuidv4().slice(0, 6).toUpperCase()}`,
          items: Math.floor(Math.random() * 5) + 1,
          total: (Math.random() * 500).toFixed(2)
        };
      case 'banking':
        return {
          action: 'transaction_detected',
          type: ['deposit', 'withdrawal', 'transfer'][Math.floor(Math.random() * 3)],
          amount: (Math.random() * 5000).toFixed(2),
          account: `***${Math.floor(Math.random() * 9000) + 1000}`
        };
      default:
        return { action: 'unknown', data: {} };
    }
  }
}

module.exports = HTTPSSimulator;