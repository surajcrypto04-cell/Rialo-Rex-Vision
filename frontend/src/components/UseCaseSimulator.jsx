import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, Loader2, Circle, Home, Plane, Gamepad2, CreditCard } from 'lucide-react';

const useCases = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Tokenize and trade property with instant settlement',
    steps: [
      { text: 'Property listed on Web2 platform', duration: 1000 },
      { text: 'Native HTTPS verifies listing data', duration: 800 },
      { text: 'Smart contract creates property tokens', duration: 1500 },
      { text: 'Pessimistic mode locks transaction', duration: 2000 },
      { text: 'Ownership transferred on-chain', duration: 1000 }
    ],
    mode: 'PESSIMISTIC',
    value: '$1,500,000'
  },
  {
    id: 'flight-insurance',
    name: 'Flight Insurance',
    icon: Plane,
    description: 'Automatic payouts when flights are delayed',
    steps: [
      { text: 'User purchases flight insurance', duration: 500 },
      { text: 'Policy stored in smart contract', duration: 800 },
      { text: 'Native HTTPS monitors FlightAware API', duration: 1000 },
      { text: 'Delay detected - reactive TX triggered', duration: 1200 },
      { text: 'Automatic payout via optimistic mode', duration: 800 }
    ],
    mode: 'OPTIMISTIC',
    value: '$500'
  },
  {
    id: 'gaming',
    name: 'Gaming NFT',
    icon: Gamepad2,
    description: 'Instant in-game asset trading',
    steps: [
      { text: 'Player finds rare item in game', duration: 500 },
      { text: 'Game server sends HTTPS to chain', duration: 300 },
      { text: 'NFT minted in optimistic mode', duration: 400 },
      { text: 'Player trades item on marketplace', duration: 600 },
      { text: 'Instant settlement, zero gas for player', duration: 500 }
    ],
    mode: 'OPTIMISTIC',
    value: '150 RIA'
  },
  {
    id: 'payment',
    name: 'Payment Escrow',
    icon: CreditCard,
    description: 'Secure escrow for online purchases',
    steps: [
      { text: 'Buyer initiates payment on e-commerce site', duration: 600 },
      { text: 'Stripe webhook triggers Native HTTPS', duration: 400 },
      { text: 'Funds locked in escrow contract', duration: 1000 },
      { text: 'Seller ships item, tracking confirmed', duration: 1500 },
      { text: 'Funds released to seller automatically', duration: 800 }
    ],
    mode: 'PESSIMISTIC',
    value: '$299'
  }
];

export const UseCaseSimulator = () => {
  const [selectedCase, setSelectedCase] = useState(useCases[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const runSimulation = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setCompletedSteps([]);

    for (let i = 0; i < selectedCase.steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, selectedCase.steps[i].duration));
      setCompletedSteps(prev => [...prev, i]);
    }

    setCurrentStep(-1);
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setCurrentStep(-1);
    setCompletedSteps([]);
    setIsRunning(false);
  };

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Play className="w-5 h-5 text-rialo-blue" />
        <h3 className="text-sm font-semibold text-white">Use Case Simulator</h3>
      </div>

      {/* Use Case Selection */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {useCases.map((useCase) => (
          <motion.button
            key={useCase.id}
            onClick={() => {
              setSelectedCase(useCase);
              resetSimulation();
            }}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedCase.id === useCase.id
                ? 'border-rialo-blue bg-rialo-blue/10'
                : 'border-rialo-border bg-rialo-card hover:border-rialo-blue/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <useCase.icon className={`w-5 h-5 mx-auto mb-1 ${
              selectedCase.id === useCase.id ? 'text-rialo-blue' : 'text-gray-500'
            }`} />
            <p className={`text-xs ${
              selectedCase.id === useCase.id ? 'text-white' : 'text-gray-400'
            }`}>
              {useCase.name}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Selected Use Case Details */}
      <div className="bg-rialo-deep rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-semibold text-white">{selectedCase.name}</h4>
            <p className="text-xs text-gray-500">{selectedCase.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              selectedCase.mode === 'OPTIMISTIC'
                ? 'bg-optimistic-green/10 text-optimistic-green'
                : 'bg-pessimistic-blue/10 text-pessimistic-blue'
            }`}>
              {selectedCase.mode}
            </span>
            <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-medium">
              {selectedCase.value}
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {selectedCase.steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentStep === index
                  ? 'bg-rialo-blue/10 border border-rialo-blue/30'
                  : completedSteps.includes(index)
                  ? 'bg-optimistic-green/5'
                  : 'bg-rialo-card'
              }`}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: currentStep === index || completedSteps.includes(index) ? 1 : 0.5 
              }}
            >
              {completedSteps.includes(index) ? (
                <CheckCircle className="w-4 h-4 text-optimistic-green flex-shrink-0" />
              ) : currentStep === index ? (
                <Loader2 className="w-4 h-4 text-rialo-blue animate-spin flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-600 flex-shrink-0" />
              )}
              <span className={`text-xs ${
                completedSteps.includes(index)
                  ? 'text-optimistic-green'
                  : currentStep === index
                  ? 'text-white'
                  : 'text-gray-500'
              }`}>
                Step {index + 1}: {step.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Run Button */}
      <motion.button
        onClick={isRunning ? resetSimulation : runSimulation}
        className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
          isRunning
            ? 'bg-red-500/10 border border-red-500/30 text-red-500'
            : 'bg-rialo-blue/10 border border-rialo-blue/30 text-rialo-blue hover:bg-rialo-blue/20'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {isRunning ? 'Reset Simulation' : 'Run Simulation'}
      </motion.button>
    </div>
  );
};