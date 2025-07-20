import React from 'react';
import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import PhysicsSection from './components/PhysicsSection';
import SimulationsSection from './components/SimulationsSection';
import RealTimeDataSection from './components/RealTimeDataSection';
import EffectsSection from './components/EffectsSection';
import HistorySection from './components/HistorySection';
import FutureSection from './components/FutureSection';
import Footer from './components/Footer';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <PhysicsSection />
      <SimulationsSection />
      <RealTimeDataSection />
      <EffectsSection />
      <HistorySection />
      <FutureSection />
      <Footer />
    </div>
  );
}

export default App;