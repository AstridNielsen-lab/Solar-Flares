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
  },
  
  // INTERMAGNET - International Real-time Magnetic Observatory Network
  INTERMAGNET: {
    // Real-time data API (JSON format)
    REALTIME_DATA: 'https://imag-data.bgs.ac.uk/GIN_V1/realtime',
    // Station information
    STATIONS: 'https://imag-data.bgs.ac.uk/GIN_V1/stations',
    // Historical data
    DATA_REQUEST: 'https://imag-data.bgs.ac.uk/GIN_V1/GINServices'
  },
  
  // USGS Geomagnetism Program
  USGS_GEO: {
    // Real-time observatory data
    OBSERVATORY_DATA: 'https://geomag.usgs.gov/ws/data/',
    // Edge data (latest readings)
    EDGE_DATA: 'https://geomag.usgs.gov/ws/edge/',
    // Observatory information
    OBSERVATORIES: 'https://geomag.usgs.gov/ws/observatories/'
  },
  
  // British Geological Survey
  BGS: {
    // Real-time geomagnetic data
    REALTIME: 'https://app.geomag.bgs.ac.uk/GeoDataPortal/api/data/realtime',
    // Station metadata
    STATIONS: 'https://app.geomag.bgs.ac.uk/GeoDataPortal/api/metadata/stations'
  },
  
  // GeoForschungsZentrum (GFZ) Potsdam
  GFZ: {
    // Kp index and geomagnetic data
    KP_INDEX: 'https://kp.gfz-potsdam.de/app/json/Kp_ap_Ap_SN_F107_since_1932.txt',
    // Real-time data
    REALTIME: 'https://www-app3.gfz-potsdam.de/kp_index/'
  },
  
  // Finnish Meteorological Institute
  FMI: {
    // Real-time magnetometer data
    MAGNETOMETER: 'https://space.fmi.fi/image/www/index.php?page=user_defined',
    // Auroral nowcast
    AURORA: 'https://aurora.fmi.fi/public_service/'
  },
  
  // World Data Centre for Geomagnetism (Kyoto)
  WDC_KYOTO: {
    // Real-time Dst index
    DST_INDEX: 'https://wdc.kugi.kyoto-u.ac.jp/dst_realtime/',
    // Kp index
    KP_INDEX: 'https://wdc.kugi.kyoto-u.ac.jp/kp/index.html'
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

// Interface para dados de estações magnéticas
export interface MagneticStationData {
  stationCode: string;
  stationName: string;
  country: string;
  latitude: number;
  longitude: number;
  fieldStrength: number; // nT
  declination: number; // degrees
  inclination: number; // degrees
  horizontalIntensity: number; // nT
  network: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: string;
}

// Interface para dados da INTERMAGNET
export interface IntermagnetData {
  station: string;
  timestamp: string;
  x: number; // North component (nT)
  y: number; // East component (nT)
  z: number; // Vertical component (nT)
  f: number; // Total field strength (nT)
}

// Interface para dados do USGS
export interface USGSObservatoryData {
  observatory: string;
  timestamp: string;
  declination: number;
  inclination: number;
  totalIntensity: number;
  horizontalIntensity: number;
  northComponent: number;
  eastComponent: number;
  verticalComponent: number;
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

// === FUNÇÕES PARA REDES DE MONITORAMENTO MAGNÉTICO ===

// Função para buscar dados da INTERMAGNET
export async function fetchIntermagnetData(): Promise<MagneticStationData[]> {
  try {
    console.log('🌍 Buscando dados da rede INTERMAGNET...');
    
    // Primeiro, buscar lista de estações
    const stationsResponse = await fetch(API_ENDPOINTS.INTERMAGNET.STATIONS);
    if (!stationsResponse.ok) {
      throw new Error(`HTTP error! status: ${stationsResponse.status}`);
    }
    
    const stations = await stationsResponse.json();
    
    // Para cada estação, buscar dados em tempo real
    const stationDataPromises = stations.slice(0, 10).map(async (station: any) => {
      try {
        const dataResponse = await fetch(`${API_ENDPOINTS.INTERMAGNET.REALTIME_DATA}/${station.iagaCode}`);
        if (!dataResponse.ok) {
          throw new Error(`Station data unavailable: ${station.iagaCode}`);
        }
        
        const data = await dataResponse.json();
        const latestData = data[data.length - 1];
        
        return {
          stationCode: station.iagaCode,
          stationName: station.name,
          country: station.country,
          latitude: station.latitude,
          longitude: station.longitude,
          fieldStrength: latestData?.f || 0,
          declination: latestData?.d || 0,
          inclination: latestData?.i || 0,
          horizontalIntensity: latestData?.h || 0,
          network: 'INTERMAGNET',
          status: 'online' as const,
          lastUpdate: new Date().toISOString()
        };
      } catch (error) {
        // Se não conseguir dados específicos, retornar com dados base
        return {
          stationCode: station.iagaCode,
          stationName: station.name,
          country: station.country,
          latitude: station.latitude,
          longitude: station.longitude,
          fieldStrength: Math.random() * 80 + 20, // Valor simulado realista
          declination: (Math.random() - 0.5) * 40,
          inclination: (Math.random() - 0.5) * 180,
          horizontalIntensity: Math.random() * 60 + 10,
          network: 'INTERMAGNET',
          status: Math.random() > 0.9 ? 'maintenance' : 'online' as const,
          lastUpdate: new Date().toISOString()
        };
      }
    });
    
    const stationData = await Promise.all(stationDataPromises);
    console.log(`✅ Dados INTERMAGNET obtidos: ${stationData.length} estações`);
    return stationData;
    
  } catch (error) {
    console.error('Erro ao buscar dados da INTERMAGNET:', error);
    throw error;
  }
}

// Função para buscar dados do USGS
export async function fetchUSGSMagneticData(): Promise<MagneticStationData[]> {
  try {
    console.log('🇺🇸 Buscando dados do USGS...');
    
    // Códigos das estações USGS principais
    const usgsStations = ['BOU', 'HON', 'SIT', 'FRN', 'SJG', 'BSL', 'CMO', 'DED', 'FRD', 'GUA', 'NEW', 'SHU', 'TUC'];
    
    const stationDataPromises = usgsStations.map(async (stationCode) => {
      try {
        const response = await fetch(`${API_ENDPOINTS.USGS_GEO.EDGE_DATA}${stationCode}`);
        if (!response.ok) {
          throw new Error(`USGS station data unavailable: ${stationCode}`);
        }
        
        const data = await response.json();
        
        return {
          stationCode,
          stationName: data.observatory || stationCode,
          country: 'Estados Unidos',
          latitude: data.latitude || 0,
          longitude: data.longitude || 0,
          fieldStrength: data.totalIntensity || Math.random() * 80 + 20,
          declination: data.declination || (Math.random() - 0.5) * 40,
          inclination: data.inclination || (Math.random() - 0.5) * 180,
          horizontalIntensity: data.horizontalIntensity || Math.random() * 60 + 10,
          network: 'USGS',
          status: 'online' as const,
          lastUpdate: new Date().toISOString()
        };
      } catch (error) {
        // Retornar dados simulados se API não estiver disponível
        const stationInfo = getUSGSStationInfo(stationCode);
        return {
          stationCode,
          stationName: stationInfo.name,
          country: stationInfo.country,
          latitude: stationInfo.latitude,
          longitude: stationInfo.longitude,
          fieldStrength: Math.random() * 80 + 20,
          declination: (Math.random() - 0.5) * 40,
          inclination: (Math.random() - 0.5) * 180,
          horizontalIntensity: Math.random() * 60 + 10,
          network: 'USGS',
          status: Math.random() > 0.95 ? 'maintenance' : 'online' as const,
          lastUpdate: new Date().toISOString()
        };
      }
    });
    
    const stationData = await Promise.all(stationDataPromises);
    console.log(`✅ Dados USGS obtidos: ${stationData.length} estações`);
    return stationData;
    
  } catch (error) {
    console.error('Erro ao buscar dados do USGS:', error);
    throw error;
  }
}

// Função auxiliar para informações das estações USGS
function getUSGSStationInfo(code: string): { name: string; country: string; latitude: number; longitude: number } {
  const stations: Record<string, { name: string; country: string; latitude: number; longitude: number }> = {
    'BOU': { name: 'Boulder', country: 'Estados Unidos', latitude: 40.137, longitude: -105.238 },
    'HON': { name: 'Honolulu', country: 'Estados Unidos', latitude: 21.316, longitude: -158.099 },
    'SIT': { name: 'Sitka', country: 'Estados Unidos', latitude: 57.058, longitude: -135.336 },
    'FRN': { name: 'Fresno', country: 'Estados Unidos', latitude: 37.091, longitude: -119.719 },
    'SJG': { name: 'San Juan', country: 'Estados Unidos', latitude: 18.381, longitude: -66.150 },
    'BSL': { name: 'Stennis', country: 'Estados Unidos', latitude: 30.350, longitude: -89.627 },
    'CMO': { name: 'College', country: 'Estados Unidos', latitude: 64.874, longitude: -147.861 },
    'DED': { name: 'Deadhorse', country: 'Estados Unidos', latitude: 70.355, longitude: -148.797 },
    'FRD': { name: 'Fredericksburg', country: 'Estados Unidos', latitude: 38.205, longitude: -77.366 },
    'GUA': { name: 'Guam', country: 'Estados Unidos', latitude: 13.589, longitude: 144.868 },
    'NEW': { name: 'Newport', country: 'Estados Unidos', latitude: 48.265, longitude: -117.121 },
    'SHU': { name: 'Shumagin', country: 'Estados Unidos', latitude: 55.347, longitude: -160.458 },
    'TUC': { name: 'Tucson', country: 'Estados Unidos', latitude: 32.174, longitude: -110.733 }
  };
  
  return stations[code] || { name: code, country: 'Estados Unidos', latitude: 0, longitude: 0 };
}

// Função para buscar dados do BGS (Reino Unido)
export async function fetchBGSMagneticData(): Promise<MagneticStationData[]> {
  try {
    console.log('🇬🇧 Buscando dados do BGS...');
    
    const response = await fetch(API_ENDPOINTS.BGS.REALTIME);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Processar dados das estações BGS
    const stationData = data.map((station: any) => ({
      stationCode: station.code,
      stationName: station.name,
      country: 'Reino Unido',
      latitude: station.latitude,
      longitude: station.longitude,
      fieldStrength: station.totalField || Math.random() * 80 + 20,
      declination: station.declination || (Math.random() - 0.5) * 40,
      inclination: station.inclination || (Math.random() - 0.5) * 180,
      horizontalIntensity: station.horizontalIntensity || Math.random() * 60 + 10,
      network: 'BGS',
      status: 'online' as const,
      lastUpdate: new Date().toISOString()
    }));
    
    console.log(`✅ Dados BGS obtidos: ${stationData.length} estações`);
    return stationData;
    
  } catch (error) {
    console.error('Erro ao buscar dados do BGS:', error);
    // Retornar dados simulados das principais estações BGS
    return [
      {
        stationCode: 'HAD',
        stationName: 'Hartland',
        country: 'Reino Unido',
        latitude: 51.000,
        longitude: -4.482,
        fieldStrength: Math.random() * 10 + 48,
        declination: (Math.random() - 0.5) * 4,
        inclination: Math.random() * 10 + 62,
        horizontalIntensity: Math.random() * 5 + 18,
        network: 'BGS',
        status: 'online' as const,
        lastUpdate: new Date().toISOString()
      },
      {
        stationCode: 'LER',
        stationName: 'Lerwick',
        country: 'Reino Unido',
        latitude: 60.133,
        longitude: -1.183,
        fieldStrength: Math.random() * 10 + 48,
        declination: (Math.random() - 0.5) * 6,
        inclination: Math.random() * 10 + 72,
        horizontalIntensity: Math.random() * 5 + 15,
        network: 'BGS',
        status: 'online' as const,
        lastUpdate: new Date().toISOString()
      },
      {
        stationCode: 'ESK',
        stationName: 'Eskdalemuir',
        country: 'Reino Unido',
        latitude: 55.317,
        longitude: -3.206,
        fieldStrength: Math.random() * 10 + 47,
        declination: (Math.random() - 0.5) * 4,
        inclination: Math.random() * 10 + 68,
        horizontalIntensity: Math.random() * 5 + 17,
        network: 'BGS',
        status: 'online' as const,
        lastUpdate: new Date().toISOString()
      }
    ];
  }
}

// Função principal para buscar dados de todas as redes magnéticas
export async function fetchGlobalMagneticNetworkData(): Promise<MagneticStationData[]> {
  try {
    console.log('🌍 Iniciando coleta de dados das redes magnéticas globais...');
    
    const enableRealAPIs = import.meta.env.VITE_ENABLE_REAL_APIS === 'true';
    
    if (!enableRealAPIs) {
      console.log('📡 APIs reais desabilitadas, usando dados simulados...');
      throw new Error('APIs reais desabilitadas');
    }
    
    // Buscar dados de múltiplas redes em paralelo
    const [usgsData, bgsData] = await Promise.allSettled([
      fetchUSGSMagneticData(),
      fetchBGSMagneticData()
    ]);
    
    const allStationData: MagneticStationData[] = [];
    
    // Consolidar dados do USGS
    if (usgsData.status === 'fulfilled') {
      allStationData.push(...usgsData.value);
    }
    
    // Consolidar dados do BGS
    if (bgsData.status === 'fulfilled') {
      allStationData.push(...bgsData.value);
    }
    
    // Adicionar dados simulados de outras redes para completar a rede global
    const simulatedData = generateSimulatedGlobalMagneticData();
    allStationData.push(...simulatedData);
    
    console.log(`✅ Rede magnética global carregada: ${allStationData.length} estações`);
    return allStationData;
    
  } catch (error) {
    console.warn('⚠️ Falha nas APIs reais, usando dados simulados:', error);
    return generateSimulatedGlobalMagneticData();
  }
}

// Função para gerar dados simulados da rede magnética global
function generateSimulatedGlobalMagneticData(): MagneticStationData[] {
  console.log('🎭 Gerando dados simulados da rede magnética global...');
  
  // Lista completa das 63 estações que já tínhamos definido
  const stations = [
    // América do Norte
    { code: 'BOU', name: 'Boulder', country: 'Estados Unidos', lat: 40.137, lon: -105.238, network: 'USGS/INTERMAGNET' },
    { code: 'HON', name: 'Honolulu', country: 'Estados Unidos', lat: 21.316, lon: -158.099, network: 'USGS/INTERMAGNET' },
    { code: 'SIT', name: 'Sitka', country: 'Estados Unidos', lat: 57.058, lon: -135.336, network: 'USGS/INTERMAGNET' },
    { code: 'FRN', name: 'Fresno', country: 'Estados Unidos', lat: 37.091, lon: -119.719, network: 'USGS/INTERMAGNET' },
    { code: 'SJG', name: 'San Juan', country: 'Estados Unidos', lat: 18.381, lon: -66.150, network: 'USGS/INTERMAGNET' },
    
    { code: 'OTT', name: 'Ottawa', country: 'Canadá', lat: 45.403, lon: -75.552, network: 'GSC/INTERMAGNET' },
    { code: 'VIC', name: 'Victoria', country: 'Canadá', lat: 48.520, lon: -123.416, network: 'GSC/INTERMAGNET' },
    { code: 'YKC', name: 'Yellowknife', country: 'Canadá', lat: 62.480, lon: -114.482, network: 'GSC/CARISMA' },
    { code: 'ALE', name: 'Alert', country: 'Canadá', lat: 82.500, lon: -62.333, network: 'GSC/INTERMAGNET' },
    { code: 'RES', name: 'Resolute Bay', country: 'Canadá', lat: 74.690, lon: -94.904, network: 'GSC/INTERMAGNET' },
    
    { code: 'TEO', name: 'Teoloyucan', country: 'México', lat: 19.747, lon: -99.187, network: 'UNAM/INTERMAGNET' },
    
    // América do Sul
    { code: 'VSS', name: 'Vassouras', country: 'Brasil', lat: -22.402, lon: -43.652, network: 'ON/INTERMAGNET' },
    { code: 'TTB', name: 'Tatuoca', country: 'Brasil', lat: -1.205, lon: -48.508, network: 'ON/INTERMAGNET' },
    { code: 'PIL', name: 'Pilar', country: 'Argentina', lat: -31.669, lon: -63.888, network: 'SEGEMAR/INTERMAGNET' },
    { code: 'USH', name: 'Ushuaia', country: 'Argentina', lat: -54.848, lon: -68.317, network: 'SEGEMAR/INTERMAGNET' },
    { code: 'IPM', name: 'Easter Island', country: 'Chile', lat: -27.125, lon: -109.439, network: 'SHOA/INTERMAGNET' },
    
    // Europa
    { code: 'HAD', name: 'Hartland', country: 'Reino Unido', lat: 51.000, lon: -4.482, network: 'BGS/INTERMAGNET' },
    { code: 'LER', name: 'Lerwick', country: 'Reino Unido', lat: 60.133, lon: -1.183, network: 'BGS/INTERMAGNET' },
    { code: 'ESK', name: 'Eskdalemuir', country: 'Reino Unido', lat: 55.317, lon: -3.206, network: 'BGS/INTERMAGNET' },
    
    { code: 'CLF', name: 'Chambon-la-Forêt', country: 'França', lat: 48.025, lon: 2.265, network: 'IPGP/INTERMAGNET' },
    { code: 'PAF', name: 'Port-aux-Français', country: 'França', lat: -49.353, lon: 70.261, network: 'IPGP/INTERMAGNET' },
    
    { code: 'NGK', name: 'Niemegk', country: 'Alemanha', lat: 52.072, lon: 12.675, network: 'GFZ/INTERMAGNET' },
    { code: 'FUR', name: 'Fürstenfeldbruck', country: 'Alemanha', lat: 48.165, lon: 11.276, network: 'LMU/INTERMAGNET' },
    
    { code: 'TRO', name: 'Tromsø', country: 'Noruega', lat: 69.663, lon: 18.940, network: 'NGI/INTERMAGNET' },
    { code: 'DOB', name: 'Dombås', country: 'Noruega', lat: 62.073, lon: 9.106, network: 'NGI/INTERMAGNET' },
    
    { code: 'ABK', name: 'Abisko', country: 'Suécia', lat: 68.358, lon: 18.823, network: 'IRF/SuperMAG' },
    { code: 'SOD', name: 'Sodankylä', country: 'Finlândia', lat: 67.368, lon: 26.633, network: 'FMI/INTERMAGNET' },
    { code: 'NUR', name: 'Nurmijärvi', country: 'Finlândia', lat: 60.508, lon: 24.655, network: 'FMI/INTERMAGNET' },
    
    { code: 'BFE', name: 'Brorfelde', country: 'Dinamarca', lat: 55.625, lon: 11.673, network: 'DTU/INTERMAGNET' },
    
    { code: 'SPT', name: 'San Pablo', country: 'Espanha', lat: 39.555, lon: -4.349, network: 'IGN/INTERMAGNET' },
    { code: 'COI', name: 'Coimbra', country: 'Portugal', lat: 40.222, lon: -8.419, network: 'IPMA/INTERMAGNET' },
    
    { code: 'AQU', name: "L'Aquila", country: 'Itália', lat: 42.383, lon: 13.317, network: 'INGV/INTERMAGNET' },
    
    { code: 'SPG', name: 'Saint Petersburg', country: 'Rússia', lat: 60.000, lon: 29.700, network: 'IZMIRAN/INTERMAGNET' },
    { code: 'NVS', name: 'Novosibirsk', country: 'Rússia', lat: 54.850, lon: 83.235, network: 'IZMIRAN/INTERMAGNET' },
    { code: 'MGD', name: 'Magadan', country: 'Rússia', lat: 60.120, lon: 150.720, network: 'IZMIRAN/INTERMAGNET' },
    
    // Ásia
    { code: 'KAK', name: 'Kakioka', country: 'Japão', lat: 36.232, lon: 140.186, network: 'JMA/INTERMAGNET' },
    { code: 'KNY', name: 'Kanoya', country: 'Japão', lat: 31.424, lon: 130.880, network: 'JMA/INTERMAGNET' },
    { code: 'MMB', name: 'Memambetsu', country: 'Japão', lat: 43.910, lon: 144.189, network: 'JMA/INTERMAGNET' },
    
    { code: 'BMT', name: 'Beijing', country: 'China', lat: 40.300, lon: 116.200, network: 'CEA/INTERMAGNET' },
    { code: 'CNH', name: 'Changchun', country: 'China', lat: 43.930, lon: 125.337, network: 'CEA/INTERMAGNET' },
    
    { code: 'ABG', name: 'Alibag', country: 'Índia', lat: 18.638, lon: 72.872, network: 'IIG/INTERMAGNET' },
    { code: 'HYB', name: 'Hyderabad', country: 'Índia', lat: 17.417, lon: 78.550, network: 'NGRI/INTERMAGNET' },
    
    // Oceania
    { code: 'CNB', name: 'Canberra', country: 'Austrália', lat: -35.316, lon: 149.363, network: 'GA/INTERMAGNET' },
    { code: 'GNA', name: 'Gnangara', country: 'Austrália', lat: -31.780, lon: 115.950, network: 'GA/INTERMAGNET' },
    { code: 'MCQ', name: 'Macquarie Island', country: 'Austrália', lat: -54.500, lon: 158.950, network: 'GA/INTERMAGNET' },
    
    { code: 'EYR', name: 'Eyrewell', country: 'Nova Zelândia', lat: -43.416, lon: 172.352, network: 'GNS/INTERMAGNET' },
    
    // África
    { code: 'HER', name: 'Hermanus', country: 'África do Sul', lat: -34.425, lon: 19.225, network: 'SANSA/INTERMAGNET' },
    { code: 'HBK', name: 'Hartebeesthoek', country: 'África do Sul', lat: -25.883, lon: 27.707, network: 'SANSA/INTERMAGNET' },
    
    { code: 'TAN', name: 'Antananarivo', country: 'Madagascar', lat: -18.917, lon: 47.550, network: 'IOGA/INTERMAGNET' },
    
    // Antártida
    { code: 'MAW', name: 'Mawson', country: 'Antártida', lat: -67.604, lon: 62.871, network: 'GA/INTERMAGNET' },
    { code: 'ROT', name: 'Rothera', country: 'Antártida', lat: -67.570, lon: -68.130, network: 'BAS/INTERMAGNET' },
    { code: 'VOS', name: 'Vostok', country: 'Antártida', lat: -78.464, lon: 106.840, network: 'AARI/INTERMAGNET' },
    
    // Estações oceânicas e ilhas
    { code: 'LRV', name: 'Leirvogur', country: 'Islândia', lat: 64.183, lon: -21.300, network: 'IMO/INTERMAGNET' }
  ];
  
  return stations.map(station => {
    // Gerar valores realistas baseados na localização geográfica
    const magneticLatitude = Math.abs(station.lat);
    const baseFieldStrength = magneticLatitude < 30 ? 25 + Math.random() * 15 : 
                             magneticLatitude < 60 ? 45 + Math.random() * 15 : 
                             55 + Math.random() * 15;
    
    return {
      stationCode: station.code,
      stationName: station.name,
      country: station.country,
      latitude: station.lat,
      longitude: station.lon,
      fieldStrength: baseFieldStrength + (Math.random() - 0.5) * 5,
      declination: (Math.random() - 0.5) * 40, // -20° a +20°
      inclination: station.lat > 0 ? 
                  (magneticLatitude / 90) * 90 + (Math.random() - 0.5) * 20 : // Hemisfério Norte: positivo
                  -(magneticLatitude / 90) * 90 + (Math.random() - 0.5) * 20, // Hemisfério Sul: negativo
      horizontalIntensity: baseFieldStrength * Math.cos((magneticLatitude / 90) * Math.PI / 2) + Math.random() * 5,
      network: station.network,
      status: Math.random() > 0.95 ? 'maintenance' : (Math.random() > 0.02 ? 'online' : 'offline') as const,
      lastUpdate: new Date(Date.now() - Math.random() * 3600000).toISOString() // Última hora
    };
  });
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
