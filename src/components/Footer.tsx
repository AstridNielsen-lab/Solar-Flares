import React from 'react';
import { Sun, Github, Mail, ExternalLink, Phone, Globe } from 'lucide-react';

const Footer = () => {
  const references = [
    "Aschwanden, M.J. Physics of the Solar Corona. Springer, 2004.",
    "Priest, E., Forbes, T. Magnetic Reconnection. Cambridge, 2000.",
    "NOAA Space Weather Prediction Center",
    "NASA Solar Dynamics Observatory",
    "ESA Space Weather Coordination Centre"
  ];

  return (
    <footer className="bg-slate-900 border-t border-orange-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Sun className="w-8 h-8 text-orange-500" />
                <h3 className="text-xl font-bold text-white">Explosões Solares</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Explorando os fenômenos mais poderosos do nosso sistema solar e 
                seus impactos na tecnologia terrestre.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Developer Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Desenvolvido por</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-orange-400 font-semibold">Julio Campos Machado</p>
                  <p className="text-gray-400 text-sm">Like Look Solutions</p>
                </div>
                
                <div className="space-y-2">
                  <a 
                    href="https://wa.me/5511970603441" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center space-x-2 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+55 11 97060-3441</span>
                  </a>
                  
                  <a 
                    href="https://likelook.wixsite.com/solutions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Like Look Solutions</span>
                  </a>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#physics" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Fundamentos Físicos
                  </a>
                </li>
                <li>
                  <a href="#simulations" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Simulações 3D
                  </a>
                </li>
                <li>
                  <a href="#effects" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Efeitos Terrestres
                  </a>
                </li>
                <li>
                  <a href="#history" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Eventos Históricos
                  </a>
                </li>
                <li>
                  <a href="#future" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Projeções Futuras
                  </a>
                </li>
              </ul>
            </div>

            {/* External Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Recursos Externos</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.swpc.noaa.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 transition-colors flex items-center space-x-2"
                  >
                    <span>NOAA Space Weather</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://sdo.gsfc.nasa.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 transition-colors flex items-center space-x-2"
                  >
                    <span>NASA SDO</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.esa.int/Space_Safety/Space_Weather" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 transition-colors flex items-center space-x-2"
                  >
                    <span>ESA Space Weather</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* References */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Referências Científicas</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {references.map((reference, index) => (
                <p key={index} className="text-gray-400 text-sm">
                  {reference}
                </p>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8 text-center">
            <div className="mb-4">
              <p className="text-orange-400 font-semibold">
                Desenvolvido por Like Look Solutions
              </p>
              <p className="text-gray-400 text-sm">
                Julio Campos Machado - Especialista em Desenvolvimento Web
              </p>
            </div>
            <p className="text-gray-400">
              © 2024 Explosões Solares. Conteúdo educacional baseado em pesquisas científicas.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Este site foi criado para fins educacionais e divulgação científica.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;