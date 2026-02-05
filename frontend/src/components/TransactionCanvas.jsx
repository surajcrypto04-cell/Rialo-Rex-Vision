import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Cpu, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export const TransactionCanvas = ({ transactions, triggerManualTx }) => {
  return (
    <div className="glass rounded-xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-rialo-blue" />
          <h3 className="text-sm font-semibold text-white">Transaction Canvas</h3>
        </div>
        <motion.button
          onClick={triggerManualTx}
          className="px-3 py-1.5 rounded-lg bg-rialo-blue/10 border border-rialo-blue/30 text-rialo-blue text-xs font-medium hover:bg-rialo-blue/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Trigger TX
        </motion.button>
      </div>

      {/* Flow Visualization */}
      <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-rialo-deep rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-500">Web2 API</span>
        </div>

        <motion.div
          className="flex items-center gap-1"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-rialo-blue"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          <ArrowRight className="w-5 h-5 text-rialo-blue" />
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <motion.div 
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-rialo-blue to-rialo-blue-dark flex items-center justify-center"
            animate={{ boxShadow: ['0 0 20px rgba(0, 242, 255, 0.3)', '0 0 40px rgba(0, 242, 255, 0.5)', '0 0 20px rgba(0, 242, 255, 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cpu className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-xs text-gray-500">REX Engine</span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-2 pr-2">
          <AnimatePresence mode="popLayout">
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg border transition-all ${
                  tx.isHighValue
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                    : tx.mode === 'OPTIMISTIC'
                    ? 'bg-rialo-deep border-optimistic-green/20 hover:border-optimistic-green/40'
                    : 'bg-rialo-deep border-pessimistic-blue/20 hover:border-pessimistic-blue/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{tx.triggerIcon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">
                          {tx.isHighValue ? tx.rwaType : tx.action}
                        </p>
                        {tx.isHighValue && (
                          <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-500 font-medium">
                            HIGH VALUE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{tx.trigger}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                      tx.mode === 'OPTIMISTIC'
                        ? 'bg-optimistic-green/10 text-optimistic-green'
                        : 'bg-pessimistic-blue/10 text-pessimistic-blue'
                    }`}>
                      {tx.mode}
                    </div>
                    <div className="flex items-center gap-1">
                      {tx.status === 'PROCESSING' ? (
                        <Loader2 className="w-3 h-3 text-yellow-500 animate-spin" />
                      ) : tx.status === 'CONFIRMED' ? (
                        <CheckCircle className="w-3 h-3 text-optimistic-green" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${
                        tx.status === 'CONFIRMED' ? 'text-optimistic-green' : 'text-yellow-500'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>ID: {tx.id}</span>
                  <span>Gas: {tx.gasCost} credits</span>
                  {tx.isHighValue && tx.rwaValue && (
                    <span className="text-yellow-500">
                      Value: ${tx.rwaValue.toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {transactions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Cpu className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-xs">Waiting for transactions...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};