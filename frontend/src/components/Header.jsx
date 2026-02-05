import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Zap, Activity } from 'lucide-react';

export const Header = ({ isConnected, tps, concurrencyMode }) => {
  return (
    <header className="glass-strong border-b border-rialo-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rialo-blue to-rialo-blue-dark flex items-center justify-center">
                <span className="text-xl font-bold text-rialo-deep">R</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-lg bg-rialo-blue"
                animate={{ opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: 'blur(8px)' }}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Rialo <span className="text-rialo-blue">REX-Vision</span>
              </h1>
              <p className="text-xs text-gray-500">Debugger v1.0.0</p>
            </div>
          </motion.div>

          {/* Demo Badge */}
          <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
            <span className="text-xs text-yellow-500 font-medium">
              CONCEPT DEMO
            </span>
          </div>
        </div>

        {/* Status Section */}
        <div className="flex items-center gap-6">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-optimistic-green" />
                <span className="text-sm text-optimistic-green font-medium">
                  DevNet: Connected
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500 font-medium">
                  Disconnected
                </span>
              </>
            )}
          </div>

          {/* Concurrency Mode Indicator */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            concurrencyMode === 'OPTIMISTIC' 
              ? 'bg-optimistic-green/10 border border-optimistic-green/30' 
              : 'bg-pessimistic-blue/10 border border-pessimistic-blue/30'
          }`}>
            <motion.div
              className={`w-2 h-2 rounded-full ${
                concurrencyMode === 'OPTIMISTIC' 
                  ? 'bg-optimistic-green' 
                  : 'bg-pessimistic-blue'
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className={`text-xs font-medium ${
              concurrencyMode === 'OPTIMISTIC' 
                ? 'text-optimistic-green' 
                : 'text-pessimistic-blue'
            }`}>
              {concurrencyMode} MODE
            </span>
          </div>

          {/* TPS Counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rialo-card border border-rialo-border">
            <Activity className="w-4 h-4 text-rialo-blue" />
            <div className="flex items-baseline gap-1">
              <motion.span
                key={tps.tps}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold text-rialo-blue text-glow"
              >
                {tps.formatted}
              </motion.span>
              <span className="text-xs text-gray-500">TPS</span>
            </div>
          </div>

          {/* Timestamp */}
          <div className="text-xs text-gray-600 font-mono">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </header>
  );
};