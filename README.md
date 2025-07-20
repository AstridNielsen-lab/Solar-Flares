<div align="center">
  <h1>🌟 Explosões Solares - Solar Flares</h1>
  
  ```
  🌌      ✨💫        🌍
     ☀️ ⟶⟶⟶🔥🔥🔥⟶⟶⟶ 📡
         ✨💫💫      🌌
  ```
  
  <p><em>Explore os fenômenos mais poderosos do sistema solar através de visualizações interativas e dados em tempo real</em></p>
  
  ![Solar Flares Visualization](https://img.shields.io/badge/Solar%20Flares-Interactive%20Science-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNGRkE1MDAiLz4KPHBhdGggZD0iTTIyIDEySDJNMTIgMlYyMiIgc3Ryb2tlPSIjRkY0NTAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+)
  
  [![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live_Demo-blue?style=for-the-badge&logo=github)](https://astridnielsen-lab.github.io/Solar-Flares/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.178.0-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
</div>

## 📖 Sobre o Projeto

**Explosões Solares** é um site educacional interativo que explora os fenômenos mais poderosos do nosso sistema solar. Desenvolvido com tecnologias modernas, oferece uma experiência imersiva para entender a física das explosões solares, seus impactos na Terra e as implicações tecnológicas para nossa sociedade.

### 🎯 Objetivo

Democratizar o conhecimento científico sobre explosões solares, tornando conceitos complexos de astrofísica acessíveis a estudantes, educadores e entusiastas da astronomia através de visualizações interativas e conteúdo educativo de alta qualidade.

## ✨ Funcionalidades

- 🔬 **Seção Física**: Explicação detalhada dos mecanismos físicos das explosões solares
- 🎮 **Simulações Interativas**: Visualizações 3D utilizando Three.js para demonstrar fenômenos solares
- 🌍 **Impactos Terrestres**: Como as explosões solares afetam nossa tecnologia e vida cotidiana
- 📚 **Contexto Histórico**: Eventos históricos importantes relacionados a tempestades solares
- 🛰️ **Dados em Tempo Real**: Monitoramento ao vivo com APIs da NASA e NOAA
- 🔮 **Perspectivas Futuras**: Pesquisas atuais e desenvolvimentos na área
- 📱 **Design Responsivo**: Otimizado para todos os dispositivos
- 🌙 **Interface Moderna**: Design com gradientes espaciais e animações suaves
- ⚡ **Performance Otimizada**: Carregamento rápido e interações fluidas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca para construção da interface
- **TypeScript 5.5.3** - Superset do JavaScript com tipagem estática
- **Vite 5.4.2** - Build tool moderna e rápida
- **TailwindCSS 3.4.1** - Framework CSS utility-first
- **Three.js 0.178.0** - Biblioteca para gráficos 3D no navegador
- **Lucide React 0.344.0** - Ícones SVG modernos

### Desenvolvimento
- **ESLint** - Linter para manter qualidade do código
- **PostCSS** - Processador de CSS
- **Autoprefixer** - Adiciona prefixes CSS automaticamente

### SEO & Performance
- **Meta tags otimizadas** para redes sociais (Open Graph, Twitter Cards)
- **Dados estruturados JSON-LD** para melhor indexação
- **Sitemap XML** e **robots.txt** incluídos
- **Imagens otimizadas** em formato SVG

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/AstridNielsen-lab/Solar-Flares.git
cd Solar-Flares
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter ESLint

## 📁 Estrutura do Projeto

```
Solar-Flares/
├── public/                      # Arquivos estáticos
│   ├── favicon.svg             # Favicon do site
│   ├── solar-flares-og.svg     # Imagem para redes sociais
│   ├── sitemap.xml             # Sitemap para SEO
│   ├── robots.txt              # Arquivo robots para crawlers
│   └── structured-data.json    # Dados estruturados
├── src/                        # Código fonte
│   ├── components/             # Componentes React
│   │   ├── Header.tsx          # Cabeçalho e navegação
│   │   ├── Hero.tsx            # Seção hero principal
│   │   ├── PhysicsSection.tsx  # Seção sobre física
│   │   ├── SimulationsSection.tsx # Simulações interativas
│   │   ├── EffectsSection.tsx  # Efeitos terrestres
│   │   ├── HistorySection.tsx  # História das explosões solares
│   │   ├── FutureSection.tsx   # Perspectivas futuras
│   │   ├── SplashScreen.tsx    # Tela de carregamento
│   │   └── Footer.tsx          # Rodapé
│   ├── content/                # Conteúdo em markdown
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx               # Ponto de entrada
│   ├── index.css              # Estilos globais
│   └── vite-env.d.ts          # Definições TypeScript
├── index.html                  # Template HTML principal
├── package.json               # Dependências e scripts
├── tailwind.config.js         # Configuração do TailwindCSS
├── tsconfig.json              # Configuração do TypeScript
├── vite.config.ts             # Configuração do Vite
└── README.md                  # Este arquivo
```

## 🎨 Design e UX

O projeto utiliza um design system moderno com:

- **Paleta de Cores**: Tons escuros espaciais com acentos em laranja/vermelho representando explosões solares
- **Tipografia**: Fontes modernas e legíveis
- **Animações**: Transições suaves e efeitos visuais imersivos
- **Acessibilidade**: Cores contrastantes e navegação intuitiva
- **Responsividade**: Layout adaptativo para todos os tamanhos de tela

## 🔍 SEO e Marketing

O site está otimizado para:

- **Search Engine Optimization (SEO)**: Meta tags, dados estruturados, sitemap
- **Redes Sociais**: Open Graph e Twitter Cards para compartilhamento
- **Performance**: Imagens otimizadas e carregamento rápido
- **Acessibilidade**: Seguindo boas práticas de a11y

## 🌐 Deploy

O projeto está configurado para deploy automático no **GitHub Pages**:

- **URL de Produção**: [https://astridnielsen-lab.github.io/Solar-Flares/](https://astridnielsen-lab.github.io/Solar-Flares/)
- **Deploy Automático**: A cada push na branch `master`

### Deploy Manual

Para fazer deploy manual:

```bash
npm run build
# Os arquivos de produção estarão na pasta 'dist/'
```

## 👥 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Mantenha o código limpo e bem documentado
- Siga as convenções de nomenclatura existentes
- Teste suas alterações antes de submeter
- Atualize a documentação quando necessário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Julio Campos Machado**
- Empresa: Like Look Solutions
- GitHub: [@AstridNielsen-lab](https://github.com/AstridNielsen-lab)
- LinkedIn: [Julio Campos Machado](https://linkedin.com/in/juliocamposmachado)

## 📧 Contato

Para dúvidas, sugestões ou colaborações:

- Email: juliocamposmachado@gmail.com
- Website: [Like Look Solutions](https://likelooksolutions.com)

## 🙏 Agradecimentos

- NASA e ESA pelas imagens e dados científicos
- Comunidade científica por tornar o conhecimento acessível
- Desenvolvedores das bibliotecas open source utilizadas
- Comunidade React e TypeScript

---

<div align="center">
  <p>Feito com ❤️ e ☀️ por <strong>Like Look Solutions</strong></p>
  <p>
    <a href="https://solar-flares.vercel.app">🌐 Ver Site</a> •
    <a href="https://github.com/AstridNielsen-lab/Solar-Flares/issues">🐛 Reportar Bug</a> •
    <a href="https://github.com/AstridNielsen-lab/Solar-Flares/discussions">💬 Discussões</a>
  </p>
</div>
