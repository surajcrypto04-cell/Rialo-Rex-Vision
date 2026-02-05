// Transaction Simulator - Hybrid concurrency model
const eventBus = require('../utils/eventBus');
const { v4: uuidv4 } = require('uuid');

class TransactionSimulator {
  constructor(sfsSimulator) {
    this.sfs = sfsSimulator;
    this.concurrencyMode = 'OPTIMISTIC';
    this.tps = 95000;
    this.totalTx = 0;
    this.optimisticTx = 0;
    this.pessimisticTx = 0;
    this.pending = [];
  }

  start() {
    // TPS fluctuation
    setInterval(() => {
      this.tps = 80000 + Math.floor(Math.random() * 40000);
      eventBus.emit('TPS_UPDATE', { 
        tps: this.tps,
        formatted: this.formatTPS(this.tps)
      });
    }, 500);

    // Transaction generation based on HTTPS events
    eventBus.on('HTTPS_EVENT', (event) => {
      this.processHTTPSEvent(event);
    });

    // Periodic high-value transaction simulation
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.generateHighValueTransaction();
      }
    }, 5000);
  }

  formatTPS(tps) {
    if (tps >= 1000) {
      return `${(tps / 1000).toFixed(1)}k`;
    }
    return tps.toString();
  }

  processHTTPSEvent(event) {
    const isHighValue = this.isHighValueEvent(event);
    const mode = isHighValue ? 'PESSIMISTIC' : this.concurrencyMode;
    const gasCost = isHighValue ? 15 : 5;

    if (this.sfs.deductCredits(gasCost, `TX: ${event.action}`)) {
      this.totalTx++;
      
      if (mode === 'OPTIMISTIC') {
        this.optimisticTx++;
      } else {
        this.pessimisticTx++;
      }

      const transaction = {
        id: uuidv4().slice(0, 12),
        trigger: event.source,
        triggerIcon: event.icon,
        action: event.action,
        mode: mode,
        gasCost: gasCost,
        status: 'PROCESSING',
        data: event,
        sequence: this.totalTx
      };

      this.pending.push(transaction);

      eventBus.emit('TRANSACTION', {
        type: 'NEW',
        transaction,
        stats: this.getStats()
      });

      // Simulate processing time
      const processTime = mode === 'PESSIMISTIC' ? 1500 : 300;
      setTimeout(() => {
        transaction.status = 'CONFIRMED';
        this.pending = this.pending.filter(
          t => t.id !== transaction.id
        );

        eventBus.emit('TRANSACTION', {
          type: 'CONFIRMED',
          transaction,
          stats: this.getStats()
        });
      }, processTime);
    } else {
      eventBus.emit('TRANSACTION', {
        type: 'FAILED',
        reason: 'INSUFFICIENT_CREDITS',
        requiredCredits: gasCost,
        trigger: event.source
      });
    }
  }

  generateHighValueTransaction() {
    const rwaTypes = [
      { type: 'Real Estate', value: 1500000, icon: '[HOUSE]' },
      { type: 'Treasury Bond', value: 5000000, icon: '[BOND]' },
      { type: 'Carbon Credit', value: 250000, icon: '[EARTH]' },
      { type: 'Art NFT', value: 800000, icon: '[ART]' },
      { type: 'Commodity Future', value: 2000000, icon: '[GOODS]' }
    ];

    const rwa = rwaTypes[Math.floor(Math.random() * rwaTypes.length)];
    const gasCost = 25;

    if (this.sfs.deductCredits(gasCost, `RWA: ${rwa.type}`)) {
      this.totalTx++;
      this.pessimisticTx++;

      const transaction = {
        id: uuidv4().slice(0, 12),
        trigger: 'RWA_ENGINE',
        triggerIcon: rwa.icon,
        action: 'high_value_settlement',
        mode: 'PESSIMISTIC',
        gasCost: gasCost,
        status: 'PROCESSING',
        isHighValue: true,
        rwaType: rwa.type,
        rwaValue: rwa.value,
        sequence: this.totalTx
      };

      eventBus.emit('TRANSACTION', {
        type: 'HIGH_VALUE',
        transaction,
        stats: this.getStats()
      });

      setTimeout(() => {
        transaction.status = 'CONFIRMED';
        eventBus.emit('TRANSACTION', {
          type: 'HIGH_VALUE_CONFIRMED',
          transaction,
          stats: this.getStats()
        });
      }, 2000);
    }
  }

  isHighValueEvent(event) {
    if (event.amount && parseFloat(event.amount) > 500) return true;
    if (event.total && parseFloat(event.total) > 300) return true;
    if (event.price && parseFloat(event.price) > 60000) return true;
    return false;
  }

  setConcurrencyMode(mode) {
    this.concurrencyMode = mode;
    eventBus.emit('CONCURRENCY_MODE_CHANGE', { 
      mode,
      stats: this.getStats()
    });
  }

  getStats() {
    return {
      total: this.totalTx,
      optimistic: this.optimisticTx,
      pessimistic: this.pessimisticTx,
      pending: this.pending.length,
      currentMode: this.concurrencyMode
    };
  }
}

module.exports = TransactionSimulator;