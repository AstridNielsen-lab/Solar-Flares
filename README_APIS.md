# Configuração de APIs - Solar Flares

## Monitoramento Ambiental com APIs Reais

O projeto Solar Flares agora utiliza APIs públicas reais para obter dados ambientais em tempo real. Esta seção explica como configurar e usar essas APIs.

## APIs Integradas

### 1. OpenWeatherMap API (Principal)
- **Dados fornecidos**: Poluição do ar e condições meteorológicas
- **Endpoints utilizados**:
  - Air Pollution API: `https://api.openweathermap.org/data/2.5/air_pollution`
  - Current Weather API: `https://api.openweathermap.org/data/2.5/weather`
- **Cobertura**: Global, com foco nas cidades brasileiras principais
- **Gratuita**: Sim (até 60 calls/minuto, 1.000.000 calls/mês)

### 2. Fontes de Fallback
- **INMET**: Instituto Nacional de Meteorologia (dados de referência)
- **CETESB**: Companhia Ambiental do Estado de São Paulo
- **World AQI**: Dados globais de qualidade do ar
- **Dados históricos**: Médias climatológicas e de poluição baseadas em relatórios oficiais

## Configuração

### 1. Obter Chave de API (OpenWeatherMap)

1. Acesse: https://openweathermap.org/api
2. Crie uma conta gratuita
3. Vá para "API Keys" no seu dashboard
4. Copie sua chave de API

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e adicione sua chave:
   ```env
   VITE_OPENWEATHER_API_KEY=sua_chave_aqui
   ```

### 3. Testar a Configuração

1. Execute o projeto:
   ```bash
   npm run dev
   ```

2. Verifique a seção "Monitoramento Ambiental"
3. Se a API estiver funcionando, você verá dados reais
4. Se não estiver configurada, o sistema usará dados de fallback

## Dados Disponíveis

### Dados Meteorológicos
- Temperatura (°C)
- Umidade relativa (%)
- Pressão atmosférica (hPa)
- Velocidade do vento (km/h)
- Condição do tempo (descrição)

### Dados de Qualidade do Ar
- **AQI**: Índice de Qualidade do Ar (Air Quality Index)
- **PM2.5**: Material particulado fino (μg/m³)
- **PM10**: Material particulado inalável (μg/m³)
- **O₃**: Ozônio (μg/m³)
- **NO₂**: Dióxido de nitrogênio (μg/m³)
- **SO₂**: Dióxido de enxofre (μg/m³)
- **CO**: Monóxido de carbono (μg/m³)

## Cidades Monitoradas

- **São Paulo, SP**
- **Rio de Janeiro, RJ**
- **Belo Horizonte, MG**
- **Brasília, DF**
- **Porto Alegre, RS**

## Sistema de Fallback Inteligente

O sistema implementa um mecanismo robusto de fallback:

1. **Prioridade 1**: Dados da OpenWeatherMap API (tempo real)
2. **Prioridade 2**: Dados estimados baseados em médias regionais
3. **Prioridade 3**: Dados de referência baseados em fontes oficiais (CETESB, INMET)
4. **Prioridade 4**: Dados históricos e médias climatológicas

## Interpretação dos Índices AQI

| AQI | Qualidade | Cor | Descrição |
|-----|-----------|-----|-----------|
| 0-50 | Boa | Verde | Ar limpo, sem riscos |
| 51-100 | Moderada | Amarelo | Aceitável para a maioria |
| 101-150 | Prejudicial para grupos sensíveis | Laranja | Pessoas sensíveis podem ter sintomas |
| 151-200 | Prejudicial | Vermelho | Todos podem ter sintomas |
| 201-300 | Muito prejudicial | Roxo | Alerta de saúde |
| 301+ | Perigosa | Marrom | Emergência de saúde |

## Desenvolvimento

Para adicionar novas APIs ou modificar as existentes:

1. Edite `src/components/PollutionTemperatureSection.tsx`
2. Adicione novas variáveis de ambiente no `.env.example`
3. Implemente novos endpoints na função `fetchPollutionAndTemperatureData`
4. Atualize os dados de fallback se necessário

## Limitações e Considerações

- **Rate Limiting**: A API gratuita tem limites de requisições
- **Disponibilidade**: Sempre há dados de fallback disponíveis
- **Precisão**: Os dados são tão precisos quanto as fontes públicas utilizadas
- **Cobertura**: Focado em grandes centros urbanos brasileiros

## Troubleshooting

### API não funciona
1. Verifique se a chave está corretamente configurada no `.env`
2. Confirme se a chave não expirou no OpenWeatherMap
3. Verifique se não ultrapassou os limites de requisição

### Dados não aparecem
1. Abra o console do navegador para ver erros
2. Verifique a conexão com a internet
3. O sistema deve sempre mostrar dados de fallback mesmo sem API

## Contribuição

Para contribuir com melhorias nas APIs:

1. Fork do repositório
2. Crie uma branch para sua feature
3. Implemente melhorias ou novas integrações
4. Teste com dados reais e fallbacks
5. Submeta um Pull Request

---

**Nota**: Este sistema foi projetado para ser resiliente e sempre fornecer dados ambientais, mesmo quando as APIs externas não estão disponíveis.
