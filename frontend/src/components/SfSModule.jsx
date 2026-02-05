import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const SfSModule = ({ sfsData }) => {
  const creditPercentage = (sfsData.credits / sfsData.maxCredits) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (creditPercentage / 100) * circumference;

  return (
    <div className="glass rounded-xl p-5 glow-blue">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-rialo-blue" />
        <h3 className="text-sm font-semibold text-white">Stake-for-Service</h3>
      </div>

      {/* Circular Credit Gauge */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#1a1a1a"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="45"
              stroke="url(#creditGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                strokeDasharray: circumference,
              }}
            />
            <defs>
              <linearGradient id="creditGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F2FF" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={sfsData.credits}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-white"
            >
              {sfsData.credits.toFixed(0)}
            </motion.span>
            <span className="text-xs text-gray-500">Credits</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-rialo-deep rounded-lg p-3">
          <div className="flex items-center gap-1 text-optimistic-green mb-1">
            <ArrowUpCircle className="w-3 h-3" />
            <span className="text-xs">Earned</span>
          </div>
          <span className="text-sm font-bold text-white">
            {sfsData.totalEarned.toFixed(1)}
          </span>
        </div>
        <div className="bg-rialo-deep rounded-lg p-3">
          <div className="flex items-center gap-1 text-red-400 mb-1">
            <ArrowDownCircle className="w-3 h-3" />
            <span className="text-xs">Spent</span>
          </div>
          <span className="text-sm font-bold text-white">
            {sfsData.totalSpent.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Staking Info */}
      <div className="bg-rialo-deep rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Staked Amount</span>
          <span className="text-sm font-bold text-rialo-blue">
            {sfsData.stakedAmount.toLocaleString()} RIA
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Est. APY</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-optimistic-green" />
            <span className="text-sm font-bold text-optimistic-green">
              {sfsData.apy}%
            </span>
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-optimistic-green"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-gray-500">Auto-refilling from staking rewards</span>
      </div>
    </div>
  );
};