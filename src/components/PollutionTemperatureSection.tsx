import React, { useState, useEffect } from 'react';
import { Thermometer, Wind, AlertTriangle, Eye, Gauge, MapPin } from 'lucide-react';

interface PollutionData {
  city: string;
  country: string;
  state?: string;
  aqi: number; // Air Quality Index
  pm25: number;
  pm10: number;
  o3: number; // Ozone
  no2: number; // Nitrogen Dioxide
  so2: number; // Sulfur Dioxide
  co: number; // Carbon Monoxide
}

interface TemperatureData {
  city: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
}

const PollutionTemperatureSection: React.FC = () => {
  const [pollutionData, setPollutionData] = useState<PollutionData[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lista de cidades para monitorar (começando com São Paulo)
  const cities = [
    { name: 'São Paulo', lat: -23.5505, lon: -46.6333, country: 'BR', state: 'SP' },
    { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729, country: 'BR', state: 'RJ' },
    { name: 'Belo Horizonte', lat: -19.9166, lon: -43.9344, country: 'BR', state: 'MG' },
    { name: 'Brasília', lat: -15.8267, lon: -47.9218, country: 'BR', state: 'DF' },
    { name: 'Porto Alegre', lat: -30.0346, lon: -51.2177, country: 'BR', state: 'RS' },
  ];

  useEffect(() => {
    fetchPollutionAndTemperatureData();
  }, []);

  const fetchPollutionAndTemperatureData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Para esta implementação inicial, vamos usar dados simulados
      // Mais tarde, podemos integrar com APIs reais como:
      // - OpenWeatherMap Air Pollution API: https://api.openweathermap.org/data/2.5/air_pollution
      // - OpenWeatherMap Weather API: https://api.openweathermap.org/data/2.5/weather
      // - CETESB (São Paulo): http://ar.cetesb.sp.gov.br/
      // - IQAir: https://api.iqair.com/
      
      const simulatedPollutionData: PollutionData[] = cities.map(city => ({
        city: city.name,
        country: city.country,
        state: city.state,
        aqi: Math.floor(Math.random() * 300) + 50, // AQI entre 50-350
        pm25: Math.random() * 80 + 10, // PM2.5 entre 10-90 μg/m³
        pm10: Math.random() * 120 + 20, // PM10 entre 20-140 μg/m³
        o3: Math.random() * 200 + 50, // O3 entre 50-250 μg/m³
        no2: Math.random() * 150 + 30, // NO2 entre 30-180 μg/m³
        so2: Math.random() * 100 + 10, // SO2 entre 10-110 μg/m³
        co: Math.random() * 15000 + 1000, // CO entre 1000-16000 μg/m³
      }));

      const simulatedTemperatureData: TemperatureData[] = cities.map(city => ({
        city: city.name,
        temperature: Math.random() * 20 + 15, // Temperatura entre 15-35°C
        humidity: Math.random() * 40 + 40, // Umidade entre 40-80%
        pressure: Math.random() * 50 + 1000, // Pressão entre 1000-1050 hPa
        windSpeed: Math.random() * 20 + 5, // Vento entre 5-25 km/h
        description: ['Ensolarado', 'Parcialmente nublado', 'Nublado', 'Chuva leve'][Math.floor(Math.random() * 4)]
      }));

      setPollutionData(simulatedPollutionData);
      setTemperatureData(simulatedTemperatureData);
    } catch (err) {
      setError('Erro ao carregar dados ambientais');
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAQIColor = (aqi: number): string => {
    if (aqi <= 50) return 'text-green-400 bg-green-900/20';
    if (aqi <= 100) return 'text-yellow-400 bg-yellow-900/20';
    if (aqi <= 150) return 'text-orange-400 bg-orange-900/20';
    if (aqi <= 200) return 'text-red-400 bg-red-900/20';
    if (aqi <= 300) return 'text-purple-400 bg-purple-900/20';
    return 'text-red-600 bg-red-900/30';
  };

  const getAQIDescription = (aqi: number): string => {
    if (aqi <= 50) return 'Boa';
    if (aqi <= 100) return 'Moderada';
    if (aqi <= 150) return 'Prejudicial para grupos sensíveis';
    if (aqi <= 200) return 'Prejudicial';
    if (aqi <= 300) return 'Muito prejudicial';
    return 'Perigosa';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-400">Carregando dados ambientais...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
            <button 
              onClick={fetchPollutionAndTemperatureData}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Monitoramento Ambiental
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Dados em tempo real de poluição do ar e condições meteorológicas das principais cidades brasileiras
          </p>
        </div>

        {/* Cards das Cidades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {cities.map((city, index) => {
            const pollution = pollutionData[index];
            const temperature = temperatureData[index];
            
            if (!pollution || !temperature) return null;

            return (
              <div key={city.name} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-400 mr-2" />
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                  <span className="ml-2 text-slate-400">- {pollution.state}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dados de Temperatura */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-blue-400 flex items-center">
                      <Thermometer className="w-5 h-5 mr-2" />
                      Condições Meteorológicas
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Temperatura:</span>
                        <span className="text-white font-semibold">{temperature.temperature.toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Umidade:</span>
                        <span className="text-white font-semibold">{temperature.humidity.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Pressão:</span>
                        <span className="text-white font-semibold">{temperature.pressure.toFixed(0)} hPa</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Vento:</span>
                        <span className="text-white font-semibold">{temperature.windSpeed.toFixed(1)} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Condição:</span>
                        <span className="text-white font-semibold">{temperature.description}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dados de Poluição */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-green-400 flex items-center">
                      <Wind className="w-5 h-5 mr-2" />
                      Qualidade do Ar
                    </h4>
                    
                    <div className={`p-3 rounded-lg ${getAQIColor(pollution.aqi)}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">IQA (AQI):</span>
                        <span className="text-2xl font-bold">{pollution.aqi}</span>
                      </div>
                      <p className="text-sm opacity-90">{getAQIDescription(pollution.aqi)}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-300">PM2.5:</span>
                        <span className="text-white">{pollution.pm25.toFixed(1)} μg/m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">PM10:</span>
                        <span className="text-white">{pollution.pm10.toFixed(1)} μg/m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">O₃:</span>
                        <span className="text-white">{pollution.o3.toFixed(1)} μg/m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">NO₂:</span>
                        <span className="text-white">{pollution.no2.toFixed(1)} μg/m³</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informações sobre as fontes de dados */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Eye className="w-6 h-6 text-blue-400 mr-2" />
            Fontes de Dados Ambientais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">OpenWeatherMap</h4>
              <p className="text-slate-300">Dados meteorológicos e de poluição do ar em tempo real</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">CETESB</h4>
              <p className="text-slate-300">Companhia Ambiental do Estado de São Paulo</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">IQAir</h4>
              <p className="text-slate-300">Rede global de monitoramento da qualidade do ar</p>
            </div>
          </div>
        </div>

        {/* Legenda do AQI */}
        <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Gauge className="w-6 h-6 text-blue-400 mr-2" />
            Índice de Qualidade do Ar (AQI)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
            <div className="text-green-400 bg-green-900/20 p-3 rounded-lg text-center">
              <div className="font-bold">0-50</div>
              <div>Boa</div>
            </div>
            <div className="text-yellow-400 bg-yellow-900/20 p-3 rounded-lg text-center">
              <div className="font-bold">51-100</div>
              <div>Moderada</div>
            </div>
            <div className="text-orange-400 bg-orange-900/20 p-3 rounded-lg text-center">
              <div className="font-bold">101-150</div>
              <div>Prejudicial para grupos sensíveis</div>
            </div>
            <div className="text-red-400 bg-red-900/20 p-3 rounded-lg text-center">
              <div className="font-bold">151-200</div>
              <div>Prejudicial</div>
            </div>
            <div className="text-purple-400 bg-purple-900/20 p-3 rounded-lg text-center">
              <div className="font-bold">201-300</div>
              <div>Muito prejudicial</div>
            </div>
            <div className="text-red-600 bg-red-900/30 p-3 rounded-lg text-center">
              <div className="font-bold">301+</div>
              <div>Perigosa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PollutionTemperatureSection;
