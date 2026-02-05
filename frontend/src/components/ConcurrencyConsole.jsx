import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Lock, Unlock } from 'lucide-react';
import { PulseEffect } from './PulseEffect';

export const ConcurrencyConsole = ({ concurrencyMode, setMode, txStats }) => {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-rialo-blue" />
        <h3 className="text-sm font-semibold text-white">Concurrency Console</h3>
      </div>

      {/* Mode Toggle Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <PulseEffect color="rgba(0, 255, 136, 0.4)">
          <motion.button
            onClick={() => setMode('OPTIMISTIC')}
            className={`relative w-full p-4 rounded-lg border-2 transition-all duration-300 ${
              concurrencyMode === 'OPTIMISTIC'
                ? 'border-optimistic-green bg-optimistic-green/10 glow-green'
                : 'border-rialo-border bg-rialo-card hover:border-optimistic-green/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Unlock className={`w-6 h-6 ${
                concurrencyMode === 'OPTIMISTIC' ? 'text-optimistic-green' : 'text-gray-500'
              }`} />
              <span className={`text-sm font-bold ${
                concurrencyMode === 'OPTIMISTIC' ? 'text-optimistic-green' : 'text-gray-400'
              }`}>
                OPTIMISTIC
              </span>
              <span className="text-xs text-gray-500">Fast Execution</span>
            </div>
            
            {concurrencyMode === 'OPTIMISTIC' && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.2), transparent 70%)'
                }}
              />
            )}
          </motion.button>
        </PulseEffect>

        <PulseEffect color="rgba(0, 102, 255, 0.4)">
          <motion.button
            onClick={() => setMode('PESSIMISTIC')}
            className={`relative w-full p-4 rounded-lg border-2 transition-all duration-300 overflow-hidden ${
              concurrencyMode === 'PESSIMISTIC'
                ? 'border-pessimistic-blue bg-pessimistic-blue/10 glow-pessimistic'
                : 'border-rialo-border bg-rialo-card hover:border-pessimistic-blue/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Lock className={`w-6 h-6 ${
                concurrencyMode === 'PESSIMISTIC' ? 'text-pessimistic-blue' : 'text-gray-500'
              }`} />
              <span className={`text-sm font-bold ${
                concurrencyMode === 'PESSIMISTIC' ? 'text-pessimistic-blue' : 'text-gray-400'
              }`}>
                PESSIMISTIC
              </span>
              <span className="text-xs text-gray-500">Secure Lock</span>
            </div>

            {/* Vault Door Animation */}
            <AnimatePresence>
              {concurrencyMode === 'PESSIMISTIC' && (
                <>
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-pessimistic-blue"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-pessimistic-blue"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 w-1 h-full bg-pessimistic-blue"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-1 h-full bg-pessimistic-blue"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  />
                </>
              )}
            </AnimatePresence>
          </motion.button>
        </PulseEffect>
      </div>

      {/* Transaction Stats */}
      <div className="bg-rialo-deep rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-2xl font-bold text-white">{txStats.total}</span>
            <p className="text-xs text-gray-500 mt-1">Total TXs</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-optimistic-green">{txStats.optimistic}</span>
            <p className="text-xs text-gray-500 mt-1">Optimistic</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-pessimistic-blue">{txStats.pessimistic}</span>
            <p className="text-xs text-gray-500 mt-1">Pessimistic</p>
          </div>
        </div>
      </div>

      {/* Mode Description */}
      <div className="mt-4 p-3 rounded-lg bg-rialo-card border border-rialo-border">
        <p className="text-xs text-gray-400">
          {concurrencyMode === 'OPTIMISTIC' ? (
            <>
              <span className="text-optimistic-green font-semibold">Optimistic Mode:</span> Transactions execute 
              immediately with post-validation. Ideal for low-risk, high-frequency operations.
            </>
          ) : (
            <>
              <span className="text-pessimistic-blue font-semibold">Pessimistic Mode:</span> Transactions acquire 
              locks before execution. Required for high-value RWA settlements.
            </>
          )}
        </p>
      </div>
    </div>
  );
};