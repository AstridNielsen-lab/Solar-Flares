import React from 'react';
import { Calendar, Zap, AlertTriangle } from 'lucide-react';

const HistorySection = () => {
  const historicalEvents = [
    {
      year: "1859",
      name: "Tempestade de Carrington",
      description: "A maior tempestade geomagnética registrada na história. Auroras foram vistas até o Caribe e sistemas telegráficos entraram em pane mundial.",
      impact: "Crítico",
      details: "Telégrafos funcionaram sem energia elétrica, alguns operadores receberam choques"
    },
    {
      year: "1989",
      name: "Evento de Quebec",
      description: "Blackout de 9 horas em Quebec, Canadá, afetando 6 milhões de pessoas. Transformadores foram danificados permanentemente.",
      impact: "Alto",
      details: "Prejuízos de centenas de milhões de dólares"
    },
    {
      year: "2003",
      name: "Tempestade de Halloween",
      description: "Série de explosões solares classe X que afetaram GPS, comunicações militares e forçaram o desvio de voos transpolares.",
      impact: "Alto",
      details: "Satélites perdidos, astronautas da ISS se abrigaram"
    },
    {
      year: "2012",
      name: "Evento de Julho",
      description: "Uma das CMEs mais poderosas já registradas passou pela órbita terrestre, mas a Terra não estava na trajetória.",
      impact: "Potencial Catastrófico",
      details: "Poderia ter causado danos trilionários se atingisse a Terra"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Crítico': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'Alto': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Potencial Catastrófico': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <section id="history" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Eventos Históricos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ao longo da história moderna, várias tempestades solares causaram impactos 
              significativos na tecnologia humana, demonstrando nossa vulnerabilidade.
            </p>
          </div>

          <div className="space-y-8">
            {historicalEvents.map((event, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-full">
                      <Calendar className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{event.name}</h3>
                      <p className="text-orange-400 font-semibold">{event.year}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full border ${getImpactColor(event.impact)}`}>
                    <span className="font-medium">{event.impact}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 text-lg">
                  {event.description}
                </p>
                
                <div className="flex items-start space-x-3 bg-slate-600/30 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-400">
                    <strong>Detalhes:</strong> {event.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-8 border border-red-500/20">
            <div className="flex items-center space-x-4 mb-4">
              <Zap className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-white">Lições Aprendidas</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Estes eventos históricos demonstram que nossa sociedade tecnológica é vulnerável 
              aos fenômenos solares. Cada evento nos ensinou mais sobre:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>A necessidade de sistemas de monitoramento espacial</li>
              <li>Importância de protocolos de emergência para infraestrutura crítica</li>
              <li>Desenvolvimento de tecnologias mais resistentes à radiação</li>
              <li>Cooperação internacional para previsão do clima espacial</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;