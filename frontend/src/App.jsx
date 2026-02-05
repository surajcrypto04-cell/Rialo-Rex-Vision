import React from 'react';
import { motion } from 'framer-motion';
import { useWebSocket } from './hooks/useWebSocket';
import { Header } from './components/Header';
import { SfSModule } from './components/SfSModule';
import { ConcurrencyConsole } from './components/ConcurrencyConsole';
import { EventStream } from './components/EventStream';
import { TransactionCanvas } from './components/TransactionCanvas';
import { ArchitectureExplainer } from './components/ArchitectureExplainer';
import { MetricsPanel } from './components/MetricsPanel';
import { ComparisonPanel } from './components/ComparisonPanel';
import { UseCaseSimulator } from './components/UseCaseSimulator';
import { TransactionTimeline } from './components/TransactionTimeline';

function App() {
  const {
    isConnected,
    sfsData,
    tps,
    concurrencyMode,
    events,
    transactions,
    txStats,
    setMode,
    triggerManualTx
  } = useWebSocket();

  return (
    <div className="min-h-screen bg-rialo-deep grid-bg pb-16">
      {/* Header */}
      <Header 
        isConnected={isConnected} 
        tps={tps} 
        concurrencyMode={concurrencyMode} 
      />

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Top Row - Main Dashboard */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            
            {/* Left Sidebar - SfS & Concurrency */}
            <motion.div 
              className="col-span-12 lg:col-span-3 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SfSModule sfsData={sfsData} />
              <ConcurrencyConsole 
                concurrencyMode={concurrencyMode} 
                setMode={setMode}
                txStats={txStats}
              />
            </motion.div>

            {/* Center - Transaction Canvas & Streams */}
            <motion.div 
              className="col-span-12 lg:col-span-6 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Transaction Canvas */}
              <div className="h-[380px]">
                <TransactionCanvas 
                  transactions={transactions}
                  triggerManualTx={triggerManualTx}
                />
              </div>
              
              {/* Event Stream & Transaction Timeline Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[320px]">
                  <EventStream events={events} />
                </div>
                <div className="h-[320px]">
                  <TransactionTimeline transactions={transactions} />
                </div>
              </div>
            </motion.div>

            {/* Right Sidebar - Metrics & Architecture */}
            <motion.div 
              className="col-span-12 lg:col-span-3 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MetricsPanel 
                txStats={txStats}
                sfsData={sfsData}
                tps={tps}
              />
              <ComparisonPanel />
              <ArchitectureExplainer />
            </motion.div>

          </div>

          {/* Bottom Row - Use Case Simulator (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <UseCaseSimulator />
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-rialo-deep/80 backdrop-blur-sm border-t border-rialo-border">
        <p className="text-xs text-gray-600">
          Made by Alex • Demo • Not Financial Advice
        </p>
      </footer>

      {/* Global Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(0, 242, 255, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(0, 242, 255, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(0, 242, 255, 0.03) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

export default App;