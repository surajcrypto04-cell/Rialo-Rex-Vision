import { useState, useEffect, useCallback, useRef } from 'react';
import { WS_URL } from '../utils/constants';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [sfsData, setSfsData] = useState({
    credits: 100,
    maxCredits: 500,
    stakedAmount: 10000,
    totalEarned: 0,
    totalSpent: 0,
    apy: '0.00'
  });
  const [tps, setTps] = useState({ tps: 95000, formatted: '95k' });
  const [concurrencyMode, setConcurrencyMode] = useState('OPTIMISTIC');
  const [events, setEvents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [txStats, setTxStats] = useState({
    total: 0,
    optimistic: 0,
    pessimistic: 0,
    pending: 0
  });

  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;

  const handleMessage = useCallback((message) => {
    switch (message.type) {
      case 'INIT':
        setSfsData(message.data.sfs);
        setTxStats(message.data.transaction);
        setConcurrencyMode(message.data.concurrencyMode);
        break;

      case 'SFS_UPDATE':
        setSfsData(prev => ({
          ...prev,
          credits: message.data.credits,
          maxCredits: message.data.maxCredits,
          totalEarned: message.data.totalEarned || prev.totalEarned,
          totalSpent: message.data.totalSpent || prev.totalSpent,
          stakedAmount: message.data.stakedAmount || prev.stakedAmount,
          apy: message.data.apy || prev.apy
        }));
        break;

      case 'TPS_UPDATE':
        setTps(message.data);
        break;

      case 'HTTPS_EVENT':
        setEvents(prev => [message.data, ...prev].slice(0, 50));
        break;

      case 'TRANSACTION':
        if (message.data.type === 'NEW' || message.data.type === 'HIGH_VALUE') {
          setTransactions(prev => [message.data.transaction, ...prev].slice(0, 20));
        } else if (message.data.type === 'CONFIRMED' || message.data.type === 'HIGH_VALUE_CONFIRMED') {
          setTransactions(prev =>
            prev.map(tx =>
              tx.id === message.data.transaction.id
                ? { ...tx, status: 'CONFIRMED' }
                : tx
            )
          );
        }
        if (message.data.stats) {
          setTxStats(message.data.stats);
        }
        break;

      case 'CONCURRENCY_MODE_CHANGE':
        setConcurrencyMode(message.data.mode);
        if (message.data.stats) {
          setTxStats(message.data.stats);
        }
        break;

      default:
        break;
    }
  }, []);

  const connect = useCallback(() => {
    try {
      console.log(`🔄 Connecting to ${WS_URL}...`);
      wsRef.current = new WebSocket(WS_URL);

      wsRef.current.onopen = () => {
        console.log('✅ Connected to Rialo REX Simulator');
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          handleMessage(message);
        } catch (e) {
          console.error('Parse error:', e);
        }
      };

      wsRef.current.onclose = () => {
        console.log('❌ Disconnected from server');
        setIsConnected(false);
        
        // Reconnect with exponential backoff
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
          console.log(`🔄 Reconnecting in ${delay/1000}s... (attempt ${reconnectAttempts.current + 1})`);
          reconnectAttempts.current++;
          reconnectTimeoutRef.current = setTimeout(connect, delay);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (e) {
      console.error('Connection error:', e);
    }
  }, [handleMessage]);

  const sendMessage = useCallback((type, data = {}) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, ...data }));
    }
  }, []);

  const setMode = useCallback((mode) => {
    sendMessage('SET_CONCURRENCY_MODE', { mode });
  }, [sendMessage]);

  const triggerManualTx = useCallback(() => {
    sendMessage('TRIGGER_MANUAL_TX');
  }, [sendMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  return {
    isConnected,
    sfsData,
    tps,
    concurrencyMode,
    events,
    transactions,
    txStats,
    setMode,
    triggerManualTx
  };
};