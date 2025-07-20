import React from 'react';
import { Atom, Thermometer, Zap, Magnet } from 'lucide-react';

const PhysicsSection = () => {
  const physicsData = [
    {
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      title: "Temperatura Extrema",
      value: "10 milhões K",
      description: "Temperaturas locais durante as erupções"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Energia Liberada",
      value: "10²⁰ - 10²⁵ J",
      description: "Equivalente a bilhões de bombas de hidrogênio"
    },
    {
      icon: <Atom className="w-8 h-8 text-blue-500" />,
      title: "Velocidade das Partículas",
      value: "2×10⁷ m/s",
      description: "6% da velocidade da luz"
    },
    {
      icon: <Magnet className="w-8 h-8 text-purple-500" />,
      title: "Massa Expelida (CME)",
      value: "10¹² - 10¹³ kg",
      description: "Plasma solar ejetado ao espaço"
    }
  ];

  return (
    <section id="physics" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Fundamentos Físicos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              As explosões solares são resultado da reconexão magnética, um processo onde 
              linhas de campo magnético tensionadas se rompem e reconectam, liberando energia colossal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {physicsData.map((item, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 text-center">
                  {item.title}
                </h3>
                <div className="text-2xl font-bold text-orange-400 text-center mb-2">
                  {item.value}
                </div>
                <p className="text-gray-400 text-sm text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg p-8 border border-orange-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Reconexão Magnética</h3>
            <p className="text-gray-300 mb-4">
              O processo físico fundamental por trás das explosões solares é a <strong>reconexão magnética</strong>. 
              Quando as linhas de campo magnético em regiões ativas do Sol (manchas solares) se reorganizam 
              subitamente, a energia potencial magnética acumulada é convertida em:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Radiação eletromagnética intensa</li>
              <li>Aceleração de partículas carregadas</li>
              <li>Aquecimento do plasma solar</li>
              <li>Ejeção de massa coronal (quando aplicável)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysicsSection;