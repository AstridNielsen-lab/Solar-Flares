import React from 'react';
import Hero from '../components/Hero';
import PhysicsSection from '../components/PhysicsSection';
import SimulationsSection from '../components/SimulationsSection';
import RealTimeDataSection from '../components/RealTimeDataSection';
import EffectsSection from '../components/EffectsSection';
import HistorySection from '../components/HistorySection';
import FutureSection from '../components/FutureSection';
import MagneticFieldSection from '../components/MagneticFieldSection';
import PollutionTemperatureSection from '../components/PollutionTemperatureSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <PollutionTemperatureSection />
      <MagneticFieldSection />
      <PhysicsSection />
      <SimulationsSection />
      <RealTimeDataSection />
      <EffectsSection />
      <HistorySection />
      <FutureSection />
    </>
  );
};

export default HomePage;
