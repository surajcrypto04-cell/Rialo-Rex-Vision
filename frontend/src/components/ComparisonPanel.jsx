import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Zap, Clock, DollarSign } from 'lucide-react';

export const ComparisonPanel = () => {
  const comparisons = [
    {
      category: 'External Data',
      icon: Clock,
      traditional: {
        name: 'Ethereum + Chainlink',
        value: '3-5 minutes',
        cost: '$2-10 per request',
        color: 'text-red-400'
      },
      rialo: {
        name: 'Native HTTPS',
        value: '0ms',
        cost: 'Included in SfS',
        color: 'text-optimistic-green'
      }
    },
    {
      category: 'User Gas Fees',
      icon: DollarSign,
      traditional: {
        name: 'User Pays',
        value: '$5-50 per tx',
        cost: 'Unpredictable spikes',
        color: 'text-red-400'
      },
      rialo: {
        name: 'App Pays (SfS)',
        value: '$0 for users',
        cost: 'Predictable credits',
        color: 'text-optimistic-green'
      }
    },
    {
      category: 'Throughput',
      icon: Zap,
      traditional: {
        name: 'Ethereum',
        value: '15 TPS',
        percentage: 15,
        color: 'text-red-400'
      },
      rialo: {
        name: 'Rialo',
        value: '100k+ TPS',
        percentage: 100,
        color: 'text-optimistic-green'
      }
    }
  ];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Scale className="w-5 h-5 text-rialo-blue" />
        <h3 className="text-sm font-semibold text-white">Rialo vs Traditional</h3>
      </div>

      <div className="space-y-4">
        {comparisons.map((comp, index) => (
          <motion.div
            key={comp.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-rialo-deep rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <comp.icon className="w-4 h-4 text-rialo-blue" />
              <span className="text-xs font-semibold text-gray-400">{comp.category}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Traditional */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{comp.traditional.name}</p>
                <p className={`text-lg font-bold ${comp.traditional.color}`}>
                  {comp.traditional.value}
                </p>
                {comp.traditional.cost && (
                  <p className="text-xs text-gray-600 mt-1">{comp.traditional.cost}</p>
                )}
                {comp.traditional.percentage && (
                  <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${comp.traditional.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                )}
              </div>

              {/* Rialo */}
              <div className="bg-optimistic-green/5 border border-optimistic-green/20 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{comp.rialo.name}</p>
                <p className={`text-lg font-bold ${comp.rialo.color}`}>
                  {comp.rialo.value}
                </p>
                {comp.rialo.cost && (
                  <p className="text-xs text-gray-600 mt-1">{comp.rialo.cost}</p>
                )}
                {comp.rialo.percentage && (
                  <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-optimistic-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${comp.rialo.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};