import React from 'react';
import { Wifi, Zap, Plane, Satellite, Radio, Shield } from 'lucide-react';

const EffectsSection = () => {
  const effects = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Redes Elétricas",
      description: "Flutuações de corrente e possíveis blackouts",
      severity: "Alto"
    },
    {
      icon: <Satellite className="w-8 h-8 text-blue-500" />,
      title: "Satélites",
      description: "Danos aos componentes eletrônicos e perda de comunicação",
      severity: "Crítico"
    },
    {
      icon: <Wifi className="w-8 h-8 text-green-500" />,
      title: "GPS",
      description: "Interferências na navegação e posicionamento",
      severity: "Médio"
    },
    {
      icon: <Plane className="w-8 h-8 text-purple-500" />,
      title: "Aviação",
      description: "Aumento de radiação em rotas polares",
      severity: "Médio"
    },
    {
      icon: <Radio className="w-8 h-8 text-red-500" />,
      title: "Comunicações HF",
      description: "Interrupção de comunicações de longa distância",
      severity: "Alto"
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Astronautas",
      description: "Exposição aumentada à radiação espacial",
      severity: "Crítico"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Crítico': return 'text-red-400 bg-red-500/20';
      case 'Alto': return 'text-orange-400 bg-orange-500/20';
      case 'Médio': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <section id="effects" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Efeitos na Terra
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Quando uma ejeção de massa coronal atinge a Terra, o campo magnético planetário 
              interage com o plasma carregado, gerando diversos distúrbios tecnológicos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {effects.map((effect, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  {effect.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                  {effect.title}
                </h3>
                <p className="text-gray-300 mb-4 text-center">
                  {effect.description}
                </p>
                <div className="flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(effect.severity)}`}>
                    {effect.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">Tempestades Geomagnéticas</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Efeitos Visíveis</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Auroras polares em latitudes mais baixas</li>
                  <li>Brilho intensificado das auroras existentes</li>
                  <li>Cores incomuns no céu noturno</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Efeitos Tecnológicos</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Correntes induzidas em transformadores</li>
                  <li>Interferência em sistemas de comunicação</li>
                  <li>Degradação de sinais de satélite</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EffectsSection;