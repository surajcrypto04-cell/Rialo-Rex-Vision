import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Radio, Shield, Cpu, CheckCircle, Database } from 'lucide-react';

export const TransactionTimeline = ({ transactions }) => {
  const [selectedTx, setSelectedTx] = useState(null);

  const timelineStages = [
    { name: 'HTTPS', icon: Radio, time: '0ms', color: 'text-blue-400' },
    { name: 'Validate', icon: Shield, time: '12ms', color: 'text-purple-400' },
    { name: 'Execute', icon: Cpu, time: '45ms', color: 'text-yellow-400' },
    { name: 'Confirm', icon: CheckCircle, time: '89ms', color: 'text-optimistic-green' },
    { name: 'Settle', icon: Database, time: '120ms', color: 'text-rialo-blue' }
  ];

  const latestTx = transactions[0];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-rialo-blue" />
        <h3 className="text-sm font-semibold text-white">Transaction Timeline</h3>
      </div>

      {latestTx ? (
        <>
          {/* Transaction ID */}
          <div className="bg-rialo-deep rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Latest Transaction</p>
                <p className="text-sm font-mono text-rialo-blue">
                  TX: {latestTx.id}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                latestTx.status === 'CONFIRMED'
                  ? 'bg-optimistic-green/10 text-optimistic-green'
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {latestTx.status}
              </span>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="relative mb-4">
            {/* Timeline Line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-rialo-border" />
            
            {/* Animated Progress */}
            <motion.div
              className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-rialo-blue to-optimistic-green"
              initial={{ width: '0%' }}
              animate={{ width: latestTx.status === 'CONFIRMED' ? '100%' : '60%' }}
              transition={{ duration: 1.5 }}
            />

            {/* Timeline Points */}
            <div className="flex justify-between relative">
              {timelineStages.map((stage, index) => (
                <motion.div
                  key={stage.name}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      latestTx.status === 'CONFIRMED' || index < 3
                        ? 'bg-rialo-deep border-2 border-rialo-blue'
                        : 'bg-rialo-card border-2 border-rialo-border'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  >
                    <stage.icon className={`w-4 h-4 ${
                      latestTx.status === 'CONFIRMED' || index < 3
                        ? stage.color
                        : 'text-gray-600'
                    }`} />
                  </motion.div>
                  <p className="text-xs text-gray-400 mt-2">{stage.name}</p>
                  <p className={`text-xs font-mono ${
                    latestTx.status === 'CONFIRMED' || index < 3
                      ? 'text-rialo-blue'
                      : 'text-gray-600'
                  }`}>
                    {stage.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-rialo-deep rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-3">Event Details</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Source</span>
                <span className="text-xs text-white">{latestTx.trigger}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Action</span>
                <span className="text-xs text-white">{latestTx.action}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Mode</span>
                <span className={`text-xs ${
                  latestTx.mode === 'OPTIMISTIC' ? 'text-optimistic-green' : 'text-pessimistic-blue'
                }`}>
                  {latestTx.mode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Gas Cost</span>
                <span className="text-xs text-yellow-500">{latestTx.gasCost} credits</span>
              </div>
              {latestTx.isHighValue && (
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Value</span>
                  <span className="text-xs text-yellow-500">
                    ${latestTx.rwaValue?.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <Search className="w-8 h-8 mb-2 opacity-30" />
          <p className="text-xs">Waiting for transactions...</p>
        </div>
      )}
    </div>
  );
};