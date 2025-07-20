import React from 'react';
import { TrendingUp, Shield, Satellite, Zap, AlertTriangle, Rocket } from 'lucide-react';

const FutureSection = () => {
  const predictions = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "Evento Tipo Carrington",
      probability: "100-150 anos",
      description: "Modelos indicam que eventos similares ao de 1859 ocorrem a cada século",
      impact: "Blackouts continentais e falhas em cascata"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: "Máximo Solar 2025",
      probability: "2024-2026",
      description: "Pico do ciclo solar 25 com aumento da atividade solar",
      impact: "Maior frequência de tempestades geomagnéticas"
    }
  ];

  const mitigationStrategies = [
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Proteção de Infraestrutura",
      description: "Desenvolvimento de transformadores resistentes e sistemas de proteção"
    },
    {
      icon: <Satellite className="w-8 h-8 text-purple-500" />,
      title: "Monitoramento Espacial",
      description: "Rede global de satélites para detecção precoce de CMEs"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Redes Inteligentes",
      description: "Smart grids capazes de se adaptar automaticamente a distúrbios"
    }
  ];

  return (
    <section id="future" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Projeções Futuras
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Preparando-nos para os desafios futuros do clima espacial e explorando 
              as oportunidades científicas que estes fenômenos oferecem.
            </p>
          </div>

          {/* Predictions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Previsões Científicas</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-6 border border-red-500/20">
                  <div className="flex items-center space-x-4 mb-4">
                    {prediction.icon}
                    <div>
                      <h4 className="text-xl font-semibold text-white">{prediction.title}</h4>
                      <p className="text-red-400 font-medium">{prediction.probability}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{prediction.description}</p>
                  <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/30">
                    <p className="text-red-300 text-sm">
                      <strong>Impacto Esperado:</strong> {prediction.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mitigation Strategies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Estratégias de Mitigação</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {mitigationStrategies.map((strategy, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    {strategy.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 text-center">
                    {strategy.title}
                  </h4>
                  <p className="text-gray-300 text-center">
                    {strategy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Opportunities */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-8 border border-purple-500/20">
            <div className="flex items-center space-x-4 mb-6">
              <Rocket className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Oportunidades Científicas</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Propulsão Espacial</h4>
                <p className="text-gray-300 mb-4">
                  Estudos de plasma solar inspiram conceitos revolucionários como:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Motores de plasma avançados</li>
                  <li>Velas magnéticas para viagens interplanetárias</li>
                  <li>Conceitos teóricos de propulsão por dobra espacial</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Fusão Nuclear</h4>
                <p className="text-gray-300 mb-4">
                  A física das explosões solares contribui para:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Compreensão da reconexão magnética</li>
                  <li>Controle de plasma em reatores de fusão</li>
                  <li>Desenvolvimento de energia limpa e abundante</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <p className="text-purple-200 text-center italic">
                "As explosões solares não são apenas uma ameaça - são uma janela para o futuro 
                da tecnologia humana e nossa expansão pelo cosmos."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;