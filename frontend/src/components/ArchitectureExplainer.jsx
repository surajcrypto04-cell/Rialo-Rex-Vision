import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, ExternalLink } from 'lucide-react';
import { ARCHITECTURE_ITEMS } from '../utils/constants';

export const ArchitectureExplainer = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-rialo-blue" />
        <h3 className="text-sm font-semibold text-white">How This Maps to Rialo</h3>
      </div>

      <div className="space-y-2">
        {ARCHITECTURE_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            className="rounded-lg overflow-hidden"
            initial={false}
          >
            <motion.button
              onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
              className="w-full p-3 bg-rialo-deep rounded-lg flex items-center justify-between hover:bg-rialo-card transition-colors"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: activeItem === item.id ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {activeItem === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-rialo-card border-t border-rialo-border">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                    <div 
                      className="mt-3 w-full h-1 rounded-full"
                      style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
        <p className="text-xs text-yellow-500/80">
          <strong>Note:</strong> This is a concept demonstration built to visualize Rialo's 
          architecture based on public information. Not connected to actual devnet.
        </p>
      </div>
    </div>
  );
};