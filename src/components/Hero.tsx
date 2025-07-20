import React from 'react';
import { Zap, AlertTriangle, Satellite } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-orange-900 flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Explosões
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              {" "}Solares
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Física, Impactos Terrestres e Implicações Tecnológicas
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Explore os fenômenos mais poderosos do nosso sistema solar e como eles afetam 
            nossa tecnologia e vida na Terra.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Energia Colossal</h3>
              <p className="text-gray-300">Até 10²⁵ joules de energia liberada em minutos</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Impactos Terrestres</h3>
              <p className="text-gray-300">Blackouts, interferências e auroras polares</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <Satellite className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Tecnologia Vulnerável</h3>
              <p className="text-gray-300">GPS, satélites e redes elétricas em risco</p>
            </div>
          </div>

          <a
            href="#physics"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explorar a Ciência
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;