/**
 * Event Bus - Central communication hub for all simulators
 * Mimics Rialo's internal event-driven architecture
 */
const { EventEmitter } = require('events');

class RialoEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
    this.eventLog = [];
  }

  emit(event, data) {
    const timestamp = Date.now();
    const logEntry = { event, data, timestamp };
    this.eventLog.push(logEntry);
    
    // Keep only last 100 events
    if (this.eventLog.length > 100) {
      this.eventLog.shift();
    }
    
    super.emit(event, { ...data, timestamp });
  }

  getRecentEvents(count = 10) {
    return this.eventLog.slice(-count);
  }
}

module.exports = new RialoEventBus();