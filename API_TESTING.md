# 🧪 Testando as APIs da NASA DONKI

## 🔑 Configuração Atual

Sua chave da NASA API já foi configurada no arquivo `.env`:
```
VITE_NASA_API_KEY=ALFaZOzvg8FBff0qKOwbJS7tbRtYhk2N3uxolfs9
VITE_ENABLE_REAL_APIS=true
```

## 🚀 Como Testar

### 1. Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

### 2. Verificar o Console do Navegador

Abra o DevTools (F12) e vá para a aba Console. Você verá logs como:

```
🔬 Modo debug ativo - Configurações: {enableRealAPIs: true, hasNASAKey: true}
🛰️ Buscando dados reais das APIs espaciais...
🚀 Buscando dados reais das APIs espaciais...
🛰️ Buscando eventos da NASA dos últimos 7 dias (2025-07-13 a 2025-07-20)...
✅ Dados da NASA obtidos: {solarFlares: 2, cme: 1, geomagneticStorms: 0, ...}
✅ Dados reais carregados com sucesso!
```

## 🌐 APIs Implementadas

### ✅ APIs Funcionando (NOAA)
- **Índice K Planetário**: ✅ Funcionando
- **Magnetômetro**: ✅ Funcionando
- **Vento Solar**: ✅ Funcionando
- **Raios-X**: ✅ Funcionando
- **Alertas NOAA**: ✅ Funcionando

### 🚀 APIs da NASA (Com sua chave)
- **Explosões Solares (FLR)**: ✅ Configurado
- **Ejeções de Massa Coronal (CME)**: ✅ Configurado
- **Tempestades Geomagnéticas (GST)**: ✅ Configurado
- **Partículas Energéticas Solares (SEP)**: ✅ Configurado
- **Fluxos de Alta Velocidade (HSS)**: ✅ Configurado
- **Cinturão de Radiação (RBE)**: ✅ Configurado
- **Notificações**: ✅ Configurado

## 🔗 URLs de Teste Manual

Você pode testar as APIs diretamente no navegador:

### NOAA (Sem API Key)
```
https://services.swpc.noaa.gov/json/planetary_k_index_1m.json
https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json
https://services.swpc.noaa.gov/json/rtsw/rtsw_plasma_1m.json
```

### NASA (Com sua API Key)
```
https://api.nasa.gov/DONKI/FLR?startDate=2025-07-13&endDate=2025-07-20&api_key=ALFaZOzvg8FBff0qKOwbJS7tbRtYhk2N3uxolfs9

https://api.nasa.gov/DONKI/CME?startDate=2025-07-13&endDate=2025-07-20&api_key=ALFaZOzvg8FBff0qKOwbJS7tbRtYhk2N3uxolfs9

https://api.nasa.gov/DONKI/HSS?startDate=2025-07-13&endDate=2025-07-20&api_key=ALFaZOzvg8FBff0qKOwbJS7tbRtYhk2N3uxolfs9
```

## 📊 Exemplo de Dados Retornados

### Explosão Solar (FLR)
```json
{
  "flrID": "2025-07-19T08:56:00-FLR-001",
  "instruments": [{"displayName": "GOES-P: EXIS 1.0-8.0"}],
  "beginTime": "2025-07-19T08:56Z",
  "peakTime": "2025-07-19T09:07Z",
  "endTime": "2025-07-19T09:13Z",
  "classType": "C3.3",
  "sourceLocation": "S08W84",
  "activeRegionNum": 14135
}
```

### Ejeção de Massa Coronal (CME)
```json
{
  "activityID": "2025-07-19T10:24:00-CME-001",
  "catalog": "M2M_CATALOG",
  "startTime": "2025-07-19T10:24Z",
  "sourceLocation": "S08W84",
  "activeRegionNum": 14135,
  "note": "Seed for WSA-ENLIL+Cone run."
}
```

## 🐛 Solução de Problemas

### ❌ Erro: "Failed to fetch"
**Possível causa**: CORS ou problema de rede
**Solução**: 
1. Verificar conexão com internet
2. Tentar em outro navegador
3. O componente automaticamente faz fallback para dados simulados

### ❌ API Key inválida
**Sintoma**: Erro 403 nos logs
**Solução**: 
1. Verificar se a chave no arquivo `.env` está correta
2. Gerar nova chave em https://api.nasa.gov/

### ❌ Dados não atualizando
**Solução**:
1. Clicar no botão "Atualizar Dados"
2. Verificar se `VITE_ENABLE_REAL_APIS=true` no `.env`
3. Reiniciar o servidor de desenvolvimento

## 📈 Monitoramento

### Logs Importantes
- `🚀 Buscando dados reais` = Início da busca
- `✅ Dados da NASA obtidos` = Sucesso
- `⚠️ Falha ao buscar APIs` = Fallback ativado
- `❌ Erro ao buscar dados` = Erro geral

### Status no Site
- **Verde**: APIs funcionando normalmente
- **Amarelo**: Algumas APIs indisponíveis (usando fallback)
- **Vermelho**: Falha total (usando dados simulados)

## 🔄 Frequência de Atualização

- **Automática**: A cada 5 minutos
- **Manual**: Botão "Atualizar Dados"
- **Reload**: Ao recarregar a página

## 📱 Funcionalidades Extras

### Dados Históricos (Futuro)
```typescript
// Buscar dados dos últimos 30 dias
const endDate = new Date().toISOString().split('T')[0];
const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
```

### Filtros por Tipo (Futuro)
```typescript
// Buscar apenas explosões classe M ou X
fetchNASASolarFlares(apiKey, startDate, endDate + '&class=M,X');
```

### Alertas Personalizados (Futuro)
```typescript
// Configurar alertas para índice K > 6
if (kIndex > 6) {
  showNotification('Tempestade Geomagnética Detectada!');
}
```

## 🌟 Próximos Passos

1. **✅ Implementado**: APIs básicas do NOAA e NASA
2. **🔄 Em Desenvolvimento**: Processamento avançado dos dados da NASA
3. **📊 Planejado**: Gráficos históricos
4. **🔔 Planejado**: Sistema de notificações
5. **🌍 Planejado**: APIs da ESA

---
*Atualizado em: 20 de Julho de 2025*

## 🎯 Status Atual: ✅ FUNCIONANDO
- NOAA APIs: ✅ Ativas
- NASA APIs: ✅ Configuradas com sua chave
- Fallback: ✅ Implementado
- Build: ✅ Funcionando
