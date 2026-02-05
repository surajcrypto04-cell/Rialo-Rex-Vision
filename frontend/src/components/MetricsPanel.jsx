import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Layers } from 'lucide-react';

export const MetricsPanel = ({ txStats, sfsData, tps }) => {
  const metrics = [
    {
      label: 'Throughput',
      value: tps.formatted,
      suffix: 'TPS',
      icon: BarChart3,
      color: 'text-rialo-blue',
      bgColor: 'bg-rialo-blue/10'
    },
    {
      label: 'Credit Efficiency',
      value: ((sfsData.totalEarned / Math.max(sfsData.totalSpent, 1)) * 100).toFixed(0),
      suffix: '%',
      icon: TrendingUp,
      color: 'text-optimistic-green',
      bgColor: 'bg-optimistic-green/10'
    },
    {
      label: 'Avg Latency',
      value: '0',
      suffix: 'ms',
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      label: 'Block Height',
      value: (1000000 + txStats.total).toLocaleString(),
      suffix: '',
      icon: Layers,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    }
  ];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-rialo-blue" />
        <h3 className="text-sm font-semibold text-white">Network Metrics</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${metric.bgColor} rounded-lg p-3`}
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-xs text-gray-500">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <motion.span
                key={metric.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-xl font-bold ${metric.color}`}
              >
                {metric.value}
              </motion.span>
              <span className="text-xs text-gray-500">{metric.suffix}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};