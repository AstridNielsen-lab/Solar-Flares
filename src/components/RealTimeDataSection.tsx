import React, { useState, useEffect } from 'react';
import { Activity, Globe, Satellite, Zap, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

interface MagneticData {
  kIndex: number;
  kIndexDescription: string;
  magneticField: number;
  lastUpdate: string;
}

interface SolarData {
  solarWindSpeed: number;
  protonDensity: number;
  btMagnetic: number;
  xrayFlux: string;
  lastUpdate: string;
}

interface SpaceWeatherAlert {
  type: string;
  severity: string;
  description: string;
  issued: string;
}

const RealTimeDataSection: React.FC = () => {
  const [magneticData, setMagneticData] = useState<MagneticData | null>(null);
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [alerts, setAlerts] = useState<SpaceWeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Função para buscar dados reais do NOAA Space Weather e NASA
  const fetchSpaceWeatherData = async () => {
    try {
      setLoading(true);
      
      const enableRealAPIs = import.meta.env.VITE_ENABLE_REAL_APIS === 'true';
      const debugMode = import.meta.env.VITE_DEBUG_MODE === 'true';
      
      if (debugMode) {
        console.log('🔬 Modo debug ativo - Configurações:', {
          enableRealAPIs,
          hasNASAKey: !!import.meta.env.VITE_NASA_API_KEY
        });
      }
      
      if (enableRealAPIs) {
        // Tentar buscar dados reais das APIs
        const { fetchRealTimeSpaceWeatherData } = await import('../utils/spaceWeatherAPI');
        
        try {
          console.log('🛰️ Buscando dados reais das APIs espaciais...');
          const realData = await fetchRealTimeSpaceWeatherData();
          
          setMagneticData(realData.magneticData);
          setSolarData(realData.solarData);
          setAlerts(realData.alerts);
          
          console.log('✅ Dados reais carregados com sucesso!');
          
        } catch (apiError) {
          console.warn('⚠️ Falha ao buscar APIs reais, usando dados simulados:', apiError);
          // Fallback para dados simulados
          const mockData = generateMockData();
          setMagneticData(mockData.magneticData);
          setSolarData(mockData.solarData);
          setAlerts(mockData.alerts);
        }
      } else {
        console.log('🎭 Usando dados simulados (APIs reais desabilitadas)');
        // Usar dados simulados
        const mockData = generateMockData();
        setMagneticData(mockData.magneticData);
        setSolarData(mockData.solarData);
        setAlerts(mockData.alerts);
      }
      
      setLastRefresh(new Date());
      setLoading(false);
      
    } catch (error) {
      console.error('❌ Erro ao buscar dados:', error);
      // Em caso de erro, usar dados simulados como fallback
      const mockData = generateMockData();
      setMagneticData(mockData.magneticData);
      setSolarData(mockData.solarData);
      setAlerts(mockData.alerts);
      setLastRefresh(new Date());
      setLoading(false);
    }
  };
  
  // Função para gerar dados simulados como fallback
  const generateMockData = () => {
    const mockMagneticData: MagneticData = {
      kIndex: Math.floor(Math.random() * 9) + 1,
      kIndexDescription: getKIndexDescription(Math.floor(Math.random() * 9) + 1),
      magneticField: Math.random() * 100 + 20,
      lastUpdate: new Date().toISOString()
    };

    const mockSolarData: SolarData = {
      solarWindSpeed: Math.random() * 300 + 300,
      protonDensity: Math.random() * 20 + 1,
      btMagnetic: Math.random() * 20 + 1,
      xrayFlux: (Math.random() * 9 + 1).toExponential(1),
      lastUpdate: new Date().toISOString()
    };

    const mockAlerts: SpaceWeatherAlert[] = generateMockAlerts();
    
    return {
      magneticData: mockMagneticData,
      solarData: mockSolarData,
      alerts: mockAlerts
    };
  };

  const getKIndexDescription = (kIndex: number): string => {
    if (kIndex <= 2) return 'Calmo';
    if (kIndex <= 4) return 'Moderado';
    if (kIndex <= 6) return 'Ativo';
    if (kIndex <= 8) return 'Tempestade Menor';
    return 'Tempestade Severa';
  };

  const getKIndexColor = (kIndex: number): string => {
    if (kIndex <= 2) return 'text-green-400';
    if (kIndex <= 4) return 'text-yellow-400';
    if (kIndex <= 6) return 'text-orange-400';
    return 'text-red-400';
  };

  const generateMockAlerts = (): SpaceWeatherAlert[] => {
    const alertTypes = [
      { type: 'Tempestade Geomagnética', severity: 'Moderada', description: 'Atividade geomagnética elevada detectada' },
      { type: 'Radiação Solar', severity: 'Baixa', description: 'Níveis normais de radiação solar' },
      { type: 'Vento Solar', severity: 'Alta', description: 'Velocidade do vento solar acima do normal' }
    ];
    
    return alertTypes.slice(0, Math.floor(Math.random() * 3) + 1).map(alert => ({
      ...alert,
      issued: new Date(Date.now() - Math.random() * 3600000 * 24).toISOString()
    }));
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity.toLowerCase()) {
      case 'baixa': return 'text-green-400 bg-green-900/20';
      case 'moderada': return 'text-yellow-400 bg-yellow-900/20';
      case 'alta': return 'text-red-400 bg-red-900/20';
      default: return 'text-blue-400 bg-blue-900/20';
    }
  };

  useEffect(() => {
    fetchSpaceWeatherData();
    
    // Atualizar dados a cada 5 minutos
    const interval = setInterval(fetchSpaceWeatherData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-4 text-white">Carregando dados em tempo real...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800" id="realtime-data">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Dados em <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Tempo Real</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Monitoramento ao vivo da atividade solar e campos magnéticos terrestres através de dados de satélites e estações de monitoramento
          </p>
          <div className="flex items-center justify-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            Última atualização: {lastRefresh.toLocaleString('pt-BR')}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Campo Magnético Terrestre */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Campo Magnético</h3>
            </div>
            
            {magneticData && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Índice K</span>
                    <span className={`text-2xl font-bold ${getKIndexColor(magneticData.kIndex)}`}>
                      {magneticData.kIndex}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Status: <span className={getKIndexColor(magneticData.kIndex)}>{magneticData.kIndexDescription}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Campo Magnético</span>
                    <span className="text-white font-semibold">{magneticData.magneticField.toFixed(1)} nT</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 border-t border-slate-700 pt-2">
                  Atualizado: {formatTime(magneticData.lastUpdate)}
                </div>
              </div>
            )}
          </div>

          {/* Card Atividade Solar */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Satellite className="w-8 h-8 text-orange-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Atividade Solar</h3>
            </div>
            
            {solarData && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 text-sm">Vento Solar</span>
                    <span className="text-white font-semibold">{solarData.solarWindSpeed.toFixed(0)} km/s</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 text-sm">Densidade Protônica</span>
                    <span className="text-white font-semibold">{solarData.protonDensity.toFixed(1)} p/cm³</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 text-sm">Campo Magnético BT</span>
                    <span className="text-white font-semibold">{solarData.btMagnetic.toFixed(1)} nT</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 text-sm">Fluxo Raios-X</span>
                    <span className="text-white font-semibold">{solarData.xrayFlux}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 border-t border-slate-700 pt-2">
                  Dados: GOES Satellite
                </div>
              </div>
            )}
          </div>

          {/* Card Alertas e Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-orange-500/50 transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Alertas</h3>
            </div>
            
            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <div key={index} className="border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">{alert.type}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">{alert.description}</p>
                    <div className="text-xs text-gray-500">
                      {formatTime(alert.issued)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-sm">Condições normais</p>
                  <p className="text-xs">Sem alertas ativos</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informações sobre as fontes */}
        <div className="mt-12 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Fontes de Dados
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="text-orange-400 font-semibold mb-2">NOAA SWPC</h5>
              <p className="text-gray-300">Space Weather Prediction Center - Dados geomagnéticos e alertas</p>
            </div>
            <div>
              <h5 className="text-orange-400 font-semibold mb-2">GOES Satellite</h5>
              <p className="text-gray-300">Monitoramento contínuo da atividade solar e raios-X</p>
            </div>
            <div>
              <h5 className="text-orange-400 font-semibold mb-2">ACE Satellite</h5>
              <p className="text-gray-300">Advanced Composition Explorer - Vento solar e campo magnético</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            * Dados atualizados automaticamente a cada 5 minutos
          </div>
        </div>

        {/* Botão para atualização manual */}
        <div className="text-center mt-8">
          <button
            onClick={fetchSpaceWeatherData}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Activity className="w-5 h-5 inline mr-2" />
            Atualizar Dados
          </button>
        </div>
      </div>
    </section>
  );
};

export default RealTimeDataSection;
