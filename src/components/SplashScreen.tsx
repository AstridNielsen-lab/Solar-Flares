import React, { useState, useEffect } from 'react';
import { Zap, Globe, Phone, ExternalLink } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setShowContent(true), 500);
          setTimeout(() => onComplete(), 3000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-orange-900 flex items-center justify-center z-50">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white animate-bounce" />
              </div>
            </div>
            
            {/* Company Name */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 animate-fade-in">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Like Look
              </span>
              <span className="text-white"> Solutions</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay">
              Soluções Tecnológicas Inovadoras
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Developer Info */}
        {showContent && (
          <div className="animate-fade-in-up bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Globe className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-semibold text-white">Desenvolvido por</h3>
            </div>
            
            <p className="text-2xl font-bold text-orange-400 mb-2">
              Julio Campos Machado
            </p>
            
            <div className="space-y-3">
              <a 
                href="https://wa.me/5511970603441" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+55 11 97060-3441</span>
              </a>
              
              <a 
                href="https://likelook.wixsite.com/solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>likelook.wixsite.com/solutions</span>
              </a>
            </div>
            
            <div className="mt-6 text-gray-400 text-sm">
              <p>Especialista em desenvolvimento web e soluções digitais</p>
            </div>
          </div>
        )}

        {/* Loading Text */}
        <p className="text-gray-400 mt-4 animate-pulse">
          Carregando experiência interativa...
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;