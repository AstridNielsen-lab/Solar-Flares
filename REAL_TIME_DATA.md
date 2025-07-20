# 🛰️ Dados em Tempo Real - Integração com APIs Espaciais

## 📋 Visão Geral

O site Solar Flares agora inclui uma seção de **Dados em Tempo Real** que exibe informações atualizadas sobre:

- 🌍 **Campo Magnético Terrestre** (Índice K, intensidade magnética)
- ☀️ **Atividade Solar** (vento solar, densidade protônica, fluxo de raios-X)
- 🚨 **Alertas de Clima Espacial** (tempestades geomagnéticas, eventos solares)

## 🔄 Status Atual

**Modo Demo**: Atualmente o componente está executando com dados simulados que demonstram a funcionalidade.

**Para Produção**: Siga as instruções abaixo para integrar com APIs reais.

## 🌐 APIs Disponíveis

### 1. NOAA Space Weather Prediction Center (SWPC)
**Gratuito e sem necessidade de API key**

- **Índice K Planetário**: `https://services.swpc.noaa.gov/json/planetary_k_index_1m.json`
- **Magnetômetro**: `https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json`
- **Vento Solar**: `https://services.swpc.noaa.gov/json/rtsw/rtsw_plasma_1m.json`
- **Raios-X**: `https://services.swpc.noaa.gov/json/goes/primary/xrays-7-day.json`
- **Alertas**: `https://services.swpc.noaa.gov/json/notifications.json`

### 2. NASA DONKI (Database of Notifications, Knowledge, Information)
**Requer API key gratuita**

- **Registro**: https://api.nasa.gov/
- **Erupções Solares**: `https://api.nasa.gov/DONKI/FLR`
- **Ejeções de Massa Coronal**: `https://api.nasa.gov/DONKI/CME`
- **Notificações**: `https://api.nasa.gov/DONKI/notifications`

### 3. ESA Space Weather Service Network
**APIs públicas da Agência Espacial Europeia**

- **Portal**: https://swe.ssa.esa.int/

## 🔧 Como Habilitar APIs Reais

### Passo 1: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# NASA API Key (opcional, mas recomendado)
VITE_NASA_API_KEY=your_api_key_here

# Configurações de atualização
VITE_UPDATE_INTERVAL=300000  # 5 minutos em millisegundos
VITE_ENABLE_REAL_APIS=true
```

### Passo 2: Atualizar o Componente RealTimeDataSection

Substitua a função `fetchSpaceWeatherData` em `src/components/RealTimeDataSection.tsx`:

```typescript
import { fetchRealTimeSpaceWeatherData } from '../utils/spaceWeatherAPI';

const fetchSpaceWeatherData = async () => {
  try {
    setLoading(true);
    
    if (import.meta.env.VITE_ENABLE_REAL_APIS === 'true') {
      // Usar APIs reais
      const data = await fetchRealTimeSpaceWeatherData();
      setMagneticData(data.magneticData);
      setSolarData(data.solarData);
      setAlerts(data.alerts);
    } else {
      // Manter dados simulados (código atual)
      // ... código existente ...
    }
    
    setLastRefresh(new Date());
    setLoading(false);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    // Fallback para dados simulados em caso de erro
    // ... implementar fallback ...
    setLoading(false);
  }
};
```

### Passo 3: Configurar CORS (se necessário)

Algumas APIs podem ter restrições de CORS. Para desenvolvimento local, você pode:

1. **Usar um proxy no Vite** (arquivo `vite.config.ts`):
```typescript
export default {
  server: {
    proxy: {
      '/api/noaa': {
        target: 'https://services.swpc.noaa.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/noaa/, '')
      }
    }
  }
}
```

2. **Usar uma extensão de CORS** (apenas para desenvolvimento)

3. **Implementar um servidor proxy** (para produção)

### Passo 4: Tratamento de Erros

Implemente fallbacks robustos:

```typescript
const fetchWithFallback = async (fetchFunction: Function, fallbackData: any) => {
  try {
    return await fetchFunction();
  } catch (error) {
    console.warn('API indisponível, usando dados de fallback:', error);
    return fallbackData;
  }
};
```

## 📊 Estrutura dos Dados

### Campo Magnético (NOAA K-Index)
```json
{
  "time_tag": "2024-01-20T10:00:00.000Z",
  "k_index": 3,
  "estimated": false
}
```

### Magnetômetro (NOAA Real-time Solar Wind)
```json
{
  "time_tag": "2024-01-20T10:00:00.000Z",
  "bx_gsm": -2.1,
  "by_gsm": 1.3,
  "bz_gsm": -0.8,
  "bt": 2.6
}
```

### Vento Solar (NOAA Plasma)
```json
{
  "time_tag": "2024-01-20T10:00:00.000Z",
  "density": 8.2,
  "speed": 420.5,
  "temperature": 89000
}
```

## 🚀 Deploy com APIs Reais

### GitHub Pages
As APIs do NOAA funcionam diretamente do GitHub Pages (HTTPS).

### Netlify/Vercel
Configure as variáveis de ambiente no painel de administração.

### Servidor Próprio
Implemente um middleware de proxy para evitar problemas de CORS.

## 🔒 Considerações de Segurança

1. **API Keys**: Nunca expose API keys no frontend. Use variáveis de ambiente prefixadas com `VITE_` apenas para keys públicas.

2. **Rate Limiting**: Implemente throttling para não exceder limites das APIs:
   ```typescript
   const lastRequest = useRef(0);
   const MIN_INTERVAL = 60000; // 1 minuto

   if (Date.now() - lastRequest.current < MIN_INTERVAL) {
     return; // Aguardar
   }
   ```

3. **Caching**: Cache dados localmente para reduzir chamadas:
   ```typescript
   const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
   const cachedData = localStorage.getItem('spaceWeatherData');
   ```

## 📈 Monitoramento

### Métricas Recomendadas
- Taxa de sucesso das APIs
- Latência das requisições
- Frequência de atualizações
- Erros de CORS

### Logs de Desenvolvimento
```typescript
console.info('📡 Dados atualizados:', {
  timestamp: new Date(),
  source: 'NOAA SWPC',
  kIndex: data.kIndex,
  alerts: data.alerts.length
});
```

## 🔮 Funcionalidades Futuras

- **Gráficos Históricos**: Mostrar tendências do índice K
- **Notificações Push**: Alertas de tempestades severas
- **Previsões**: Integração com modelos preditivos
- **Múltiplas Fontes**: Combinar dados de diferentes satélites
- **API GraphQL**: Centralizar queries de dados

## 🆘 Solução de Problemas

### Erro: "Failed to fetch"
- Verificar conexão com internet
- Verificar se a API está online
- Implementar fallback para dados simulados

### Erro: CORS
- Configurar proxy no Vite
- Usar servidor intermediário
- Verificar headers de CORS

### Dados desatualizados
- Verificar se o interval está funcionando
- Limpar cache do navegador
- Verificar se a API está retornando dados recentes

## 📞 Suporte

Para dúvidas sobre a implementação:
- **Email**: juliocamposmachado@gmail.com
- **GitHub Issues**: https://github.com/AstridNielsen-lab/Solar-Flares/issues

## 🔗 Links Úteis

- [NOAA SWPC API Documentation](https://www.swpc.noaa.gov/products/real-time-solar-wind)
- [NASA API Portal](https://api.nasa.gov/)
- [Space Weather Overview](https://www.swpc.noaa.gov/phenomena)
- [GOES Satellite Info](https://www.goes.noaa.gov/)

---
*Atualizado em: Janeiro 2024*
