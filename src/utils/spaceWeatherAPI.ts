// Utilitários para APIs de Dados Espaciais
// Este arquivo contém as integrações com APIs reais de clima espacial

// URLs das APIs abertas disponíveis
export const API_ENDPOINTS = {
  // NOAA Space Weather Prediction Center
  NOAA: {
    PLANETARY_K_INDEX: 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json',
    MAGNETOMETER: 'https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json',
    SOLAR_WIND: 'https://services.swpc.noaa.gov/json/rtsw/rtsw_plasma_1m.json',
    XRAY_FLUX: 'https://services.swpc.noaa.gov/json/goes/primary/xrays-7-day.json',
    ALERTS: 'https://services.swpc.noaa.gov/json/notifications.json'
  },
  
  // NASA DONKI APIs
  NASA: {
    DONKI_NOTIFICATIONS: 'https://api.nasa.gov/DONKI/notifications',
    DONKI_SOLAR_FLARE: 'https://api.nasa.gov/DONKI/FLR', // Explosões Solares
    DONKI_CME: 'https://api.nasa.gov/DONKI/CME', // Ejeções de Massa Coronal
    DONKI_CME_ANALYSIS: 'https://api.nasa.gov/DONKI/CMEAnalysis', // Análise de CME
    DONKI_GEOMAGNETIC_STORM: 'https://api.nasa.gov/DONKI/GST', // Tempestades Geomagnéticas
    DONKI_INTERPLANETARY_SHOCK: 'https://api.nasa.gov/DONKI/IPS', // Choques Interplanetários
    DONKI_SOLAR_ENERGETIC_PARTICLE: 'https://api.nasa.gov/DONKI/SEP', // Partículas Energéticas Solares
    DONKI_MAGNETOPAUSE_CROSSING: 'https://api.nasa.gov/DONKI/MPC', // Cruzamento de Magnetopausa
    DONKI_RADIATION_BELT_ENHANCEMENT: 'https://api.nasa.gov/DONKI/RBE', // Aprimoramento do Cinturão de Radiação
    DONKI_HIGH_SPEED_STREAM: 'https://api.nasa.gov/DONKI/HSS', // Fluxo de Alta Velocidade
    DONKI_WSA_ENLIL_SIMULATION: 'https://api.nasa.gov/DONKI/WSAEnlilSimulations' // Simulações WSA+Enlil
  },
  
  // ESA Space Weather Service Network
  ESA: {
    SPACE_WEATHER: 'https://swe.ssa.esa.int/web/guest/monitoring-external'
  }
};

// Interface para dados do índice K
export interface KIndexData {
  time_tag: string;
  k_index: number;
  estimated: boolean;
}

// Interface para dados do magnetômetro
export interface MagnetometerData {
  time_tag: string;
  bx_gsm: number;
  by_gsm: number;
  bz_gsm: number;
  bt: number;
}

// Interface para dados do vento solar
export interface SolarWindData {
  time_tag: string;
  density: number;
  speed: number;
  temperature: number;
}

// Interface para dados de raios-X
export interface XRayData {
  time_tag: string;
  flux: number;
  energy: string;
}

// Interface para alertas do NOAA
export interface NOAAAlert {
  message_id: string;
  message_type: string;
  message_issue_time: string;
  message_body: string;
  severity: string;
}

// Função para buscar dados do índice K planetário
export async function fetchPlanetaryKIndex(): Promise<KIndexData[]> {
  try {
    const response = await fetch(API_ENDPOINTS.NOAA.PLANETARY_K_INDEX);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do índice K:', error);
    throw error;
  }
}

// Função para buscar dados do magnetômetro
export async function fetchMagnetometerData(): Promise<MagnetometerData[]> {
  try {
    const response = await fetch(API_ENDPOINTS.NOAA.MAGNETOMETER);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do magnetômetro:', error);
    throw error;
  }
}

// Função para buscar dados do vento solar
export async function fetchSolarWindData(): Promise<SolarWindData[]> {
  try {
    const response = await fetch(API_ENDPOINTS.NOAA.SOLAR_WIND);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do vento solar:', error);
    throw error;
  }
}

// Função para buscar dados de raios-X
export async function fetchXRayData(): Promise<XRayData[]> {
  try {
    const response = await fetch(API_ENDPOINTS.NOAA.XRAY_FLUX);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados de raios-X:', error);
    throw error;
  }
}

// Função para buscar alertas do NOAA
export async function fetchNOAAAlerts(): Promise<NOAAAlert[]> {
  try {
    const response = await fetch(API_ENDPOINTS.NOAA.ALERTS);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar alertas do NOAA:', error);
    throw error;
  }
}

// === FUNÇÕES ESPECÍFICAS DA NASA DONKI ===

// Função para buscar explosões solares (Solar Flares)
export async function fetchNASASolarFlares(apiKey: string, startDate: string, endDate: string) {
  try {
    const url = `${API_ENDPOINTS.NASA.DONKI_SOLAR_FLARE}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar explosões solares da NASA:', error);
    throw error;
  }
}

// Função para buscar ejeções de massa coronal (CME)
export async function fetchNASACME(apiKey: string, startDate: string, endDate: string) {
  try {
    const url = `${API_ENDPOINTS.NASA.DONKI_CME}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar CMEs da NASA:', error);
    throw error;
  }
}

// Função para buscar tempestades geomagnéticas (GST)
export async function fetchNASAGeomagneticStorms(apiKey: string, startDate: string, endDate: string) {
  try {
    const url = `${API_ENDPOINTS.NASA.DONKI_GEOMAGNETIC_STORM}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar tempestades geomagnéticas da NASA:', error);
    throw error;
  }
}

// Função para buscar partículas energéticas solares (SEP)
export async function fetchNASASolarEnergeticParticles(apiKey: string, startDate: string, endDate: string) {
  try {
    const url = `${API_ENDPOINTS.NASA.DONKI_SOLAR_ENERGETIC_PARTICLE}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar partículas energéticas solares da NASA:', error);
    throw error;
  }
}

// Função para buscar fluxos de alta velocidade (HSS)
export async function fetchNASAHighSpeedStreams(apiKey: string, startDate: string, endDate: string) {
  try {
    const url = `${API_ENDPOINTS.NASA.DONKI_HIGH_SPEED_STREAM}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar fluxos de alta velocidade da NASA:', error);
    throw error;
  }
}

// Função para buscar aprimoramentos do cinturão de radiação (RBE)
export async function fetchNASARadiationBeltEnhancement(apiKey: string, startDate: string, endDate: string) {
  try {
    const url = `${API_ENDPOINTS.NASA.DONKI_RADIATION_BELT_ENHANCEMENT}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados de cinturão de radiação da NASA:', error);
    throw error;
  }
}

// Função para buscar notificações da NASA
export async function fetchNASANotifications(apiKey: string, startDate: string, endDate: string, type: string = 'all') {
  try {
    const url = `${API_ENDPOINTS.NASA.DONKI_NOTIFICATIONS}?startDate=${startDate}&endDate=${endDate}&type=${type}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar notificações da NASA:', error);
    throw error;
  }
}

// Função consolidada para buscar eventos recentes da NASA
export async function fetchNASARecentEvents(apiKey: string) {
  const endDate = new Date().toISOString().split('T')[0]; // Hoje
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 7 dias atrás

  try {
    console.log(`🛰️ Buscando eventos da NASA dos últimos 7 dias (${startDate} a ${endDate})...`);
    
    const [solarFlares, cme, geoStorms, sep, hss, rbe, notifications] = await Promise.allSettled([
      fetchNASASolarFlares(apiKey, startDate, endDate),
      fetchNASACME(apiKey, startDate, endDate),
      fetchNASAGeomagneticStorms(apiKey, startDate, endDate),
      fetchNASASolarEnergeticParticles(apiKey, startDate, endDate),
      fetchNASAHighSpeedStreams(apiKey, startDate, endDate),
      fetchNASARadiationBeltEnhancement(apiKey, startDate, endDate),
      fetchNASANotifications(apiKey, startDate, endDate)
    ]);

    const events = {
      solarFlares: solarFlares.status === 'fulfilled' ? solarFlares.value : [],
      cme: cme.status === 'fulfilled' ? cme.value : [],
      geomagneticStorms: geoStorms.status === 'fulfilled' ? geoStorms.value : [],
      solarEnergeticParticles: sep.status === 'fulfilled' ? sep.value : [],
      highSpeedStreams: hss.status === 'fulfilled' ? hss.value : [],
      radiationBeltEnhancement: rbe.status === 'fulfilled' ? rbe.value : [],
      notifications: notifications.status === 'fulfilled' ? notifications.value : []
    };

    console.log(`✅ Dados da NASA obtidos:`, {
      solarFlares: events.solarFlares.length,
      cme: events.cme.length,
      geomagneticStorms: events.geomagneticStorms.length,
      solarEnergeticParticles: events.solarEnergeticParticles.length,
      highSpeedStreams: events.highSpeedStreams.length,
      radiationBeltEnhancement: events.radiationBeltEnhancement.length,
      notifications: events.notifications.length
    });

    return events;
  } catch (error) {
    console.error('Erro ao buscar eventos recentes da NASA:', error);
    return {
      solarFlares: [],
      cme: [],
      geomagneticStorms: [],
      solarEnergeticParticles: [],
      highSpeedStreams: [],
      radiationBeltEnhancement: [],
      notifications: []
    };
  }
}

// Função de compatibilidade (antiga)
export async function fetchNASADonkiData(apiKey: string, startDate: string, endDate: string) {
  return fetchNASASolarFlares(apiKey, startDate, endDate);
}

// Função auxiliar para converter dados do índice K para descrição
export function getKIndexDescription(kIndex: number): string {
  if (kIndex === 0) return 'Inativo';
  if (kIndex <= 2) return 'Muito Calmo';
  if (kIndex === 3) return 'Calmo';
  if (kIndex === 4) return 'Moderado';
  if (kIndex === 5) return 'Ativo';
  if (kIndex === 6) return 'Tempestade Menor';
  if (kIndex === 7) return 'Tempestade Moderada';
  if (kIndex === 8) return 'Tempestade Forte';
  return 'Tempestade Extrema';
}

// Função auxiliar para determinar a cor baseada no índice K
export function getKIndexColor(kIndex: number): string {
  if (kIndex <= 2) return 'green';
  if (kIndex <= 4) return 'yellow';
  if (kIndex <= 6) return 'orange';
  return 'red';
}

// Função auxiliar para determinar severidade de alertas
export function getAlertSeverity(messageType: string): 'low' | 'moderate' | 'high' | 'extreme' {
  const type = messageType.toLowerCase();
  if (type.includes('watch') || type.includes('outlook')) return 'low';
  if (type.includes('warning')) return 'moderate';
  if (type.includes('alert')) return 'high';
  return 'extreme';
}

// Função híbrida que combina dados reais quando disponíveis
export async function fetchRealTimeSpaceWeatherData() {
  try {
    const enableRealAPIs = import.meta.env.VITE_ENABLE_REAL_APIS === 'true';
    const nasaApiKey = import.meta.env.VITE_NASA_API_KEY;
    
    if (!enableRealAPIs) {
      throw new Error('APIs reais desabilitadas');
    }

    console.log('🚀 Buscando dados reais das APIs espaciais...');
    
    // Buscar dados de múltiplas fontes em paralelo
    const [kIndexData, magnetometerData, solarWindData, xrayData, alerts, nasaEvents] = await Promise.allSettled([
      fetchPlanetaryKIndex(),
      fetchMagnetometerData(), 
      fetchSolarWindData(),
      fetchXRayData(),
      fetchNOAAAlerts(),
      nasaApiKey ? fetchNASARecentEvents(nasaApiKey) : Promise.resolve([])
    ]);

    // Processar os dados mais recentes
    let latestKIndex = 0;
    if (kIndexData.status === 'fulfilled' && kIndexData.value.length > 0) {
      const latest = kIndexData.value[kIndexData.value.length - 1];
      latestKIndex = latest.k_index;
    }

    let latestMagField = 0;
    if (magnetometerData.status === 'fulfilled' && magnetometerData.value.length > 0) {
      const latest = magnetometerData.value[magnetometerData.value.length - 1];
      latestMagField = latest.bt;
    }

    let latestSolarWind = { density: 0, speed: 0 };
    if (solarWindData.status === 'fulfilled' && solarWindData.value.length > 0) {
      const latest = solarWindData.value[solarWindData.value.length - 1];
      latestSolarWind = { density: latest.density, speed: latest.speed };
    }

    let latestXRayFlux = '0.0e-0';
    if (xrayData.status === 'fulfilled' && xrayData.value.length > 0) {
      const latest = xrayData.value[xrayData.value.length - 1];
      latestXRayFlux = latest.flux.toExponential(1);
    }

    let processedAlerts: any[] = [];
    if (alerts.status === 'fulfilled') {
      processedAlerts = alerts.value.slice(0, 3).map(alert => ({
        type: alert.message_type,
        severity: getAlertSeverity(alert.message_type),
        description: alert.message_body.slice(0, 100) + '...',
        issued: alert.message_issue_time
      }));
    }

    return {
      magneticData: {
        kIndex: latestKIndex,
        kIndexDescription: getKIndexDescription(latestKIndex),
        magneticField: latestMagField,
        lastUpdate: new Date().toISOString()
      },
      solarData: {
        solarWindSpeed: latestSolarWind.speed,
        protonDensity: latestSolarWind.density,
        btMagnetic: latestMagField,
        xrayFlux: latestXRayFlux,
        lastUpdate: new Date().toISOString()
      },
      alerts: processedAlerts
    };

  } catch (error) {
    console.error('Erro ao processar dados em tempo real:', error);
    throw error;
  }
}

// Informações sobre as fontes de dados
export const DATA_SOURCES = {
  NOAA_SWPC: {
    name: 'NOAA Space Weather Prediction Center',
    description: 'Centro oficial dos EUA para previsão do clima espacial',
    url: 'https://www.swpc.noaa.gov/',
    dataTypes: ['Índice K', 'Campo Magnético', 'Vento Solar', 'Alertas']
  },
  GOES_SATELLITE: {
    name: 'GOES Weather Satellites',
    description: 'Satélites geoestacionários para monitoramento contínuo',
    url: 'https://www.goes.noaa.gov/',
    dataTypes: ['Raios-X', 'Partículas Energéticas', 'Campo Magnético']
  },
  ACE_SATELLITE: {
    name: 'Advanced Composition Explorer',
    description: 'Monitor do vento solar no ponto Lagrange L1',
    url: 'https://www.srl.caltech.edu/ACE/',
    dataTypes: ['Vento Solar', 'Campo Magnético Interplanetário']
  },
  NASA_DONKI: {
    name: 'NASA DONKI',
    description: 'Database of Notifications, Knowledge, Information',
    url: 'https://ccmc.gsfc.nasa.gov/tools/DONKI/',
    dataTypes: ['Eventos Solares', 'CMEs', 'Partículas Energéticas Solares']
  }
};
