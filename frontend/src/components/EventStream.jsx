import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Clock } from 'lucide-react';

export const EventStream = ({ events }) => {
  return (
    <div className="glass rounded-xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-rialo-blue" />
          <h3 className="text-sm font-semibold text-white">Native HTTPS Stream</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>0ms latency</span>
        </div>
      </div>

      {/* Event Log */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-2 pr-2">
          <AnimatePresence mode="popLayout">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-rialo-deep rounded-lg p-3 border border-rialo-border hover:border-rialo-blue/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{event.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">{event.source}</p>
                      <p className="text-xs text-gray-500">{event.action}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-rialo-blue font-mono">{event.latency}</span>
                    <span className="text-xs text-gray-600">#{event.eventNumber}</span>
                  </div>
                </div>

                {/* Event Data Preview */}
                <div className="mt-2 p-2 rounded bg-rialo-card">
                  <pre className="text-xs text-gray-400 overflow-hidden text-ellipsis">
                    {JSON.stringify(
                      Object.fromEntries(
                        Object.entries(event).filter(
                          ([key]) => !['id', 'icon', 'source', 'latency', 'eventNumber', 'sourceType', 'timestamp'].includes(key)
                        )
                      ),
                      null,
                      0
                    ).slice(0, 80)}
                    {JSON.stringify(event).length > 80 ? '...' : ''}
                  </pre>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Radio className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-xs">Waiting for events...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};