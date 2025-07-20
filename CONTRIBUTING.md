# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o projeto **Explosões Solares**! Este documento fornece diretrizes para ajudar você a contribuir de forma eficaz.

## 🎯 Como Contribuir

### 🐛 Reportando Bugs

Se você encontrou um bug, por favor:

1. Verifique se o bug já foi reportado nos [Issues](https://github.com/AstridNielsen-lab/Solar-Flares/issues)
2. Se não foi reportado, crie um novo issue com:
   - Título claro e descritivo
   - Descrição detalhada do problema
   - Passos para reproduzir o bug
   - Comportamento esperado vs. comportamento atual
   - Screenshots (se aplicável)
   - Informações do ambiente (navegador, OS, etc.)

### ✨ Sugerindo Melhorias

Para sugerir uma nova funcionalidade ou melhoria:

1. Verifique se a sugestão já não existe nos [Issues](https://github.com/AstridNielsen-lab/Solar-Flares/issues)
2. Crie um novo issue com:
   - Título claro indicando que é uma sugestão
   - Descrição detalhada da funcionalidade proposta
   - Justificativa de por que seria útil
   - Mockups ou exemplos (se aplicável)

### 🔧 Contribuindo com Código

1. **Fork** o repositório
2. **Clone** seu fork localmente:
   ```bash
   git clone https://github.com/SEU_USERNAME/Solar-Flares.git
   cd Solar-Flares
   ```

3. **Configure** o repositório upstream:
   ```bash
   git remote add upstream https://github.com/AstridNielsen-lab/Solar-Flares.git
   ```

4. **Crie** uma branch para sua funcionalidade:
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   ```

5. **Instale** as dependências:
   ```bash
   npm install
   ```

6. **Faça** suas alterações seguindo as diretrizes de código

7. **Teste** suas alterações:
   ```bash
   npm run dev
   npm run lint
   npm run build
   ```

8. **Commit** suas alterações:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade X"
   ```

9. **Push** para sua branch:
   ```bash
   git push origin feature/nome-da-funcionalidade
   ```

10. **Abra** um Pull Request

## 📋 Diretrizes de Código

### 🎨 Estilo de Código

- Use **TypeScript** para tipagem estática
- Siga as configurações do **ESLint** incluídas no projeto
- Use **Prettier** para formatação (configuração incluída)
- Mantenha componentes pequenos e focados em uma responsabilidade
- Use nomes descritivos para variáveis e funções

### 🏗️ Estrutura de Componentes

```tsx
// ✅ Bom exemplo
interface ComponentProps {
  title: string;
  description?: string;
}

const Component: React.FC<ComponentProps> = ({ title, description }) => {
  return (
    <div className="component-container">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Component;
```

### 🎨 Classes CSS/Tailwind

- Use classes do **TailwindCSS** sempre que possível
- Mantenha consistência com o design system existente
- Use classes personalizadas apenas quando necessário

### 📝 Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` alterações na documentação
- `style:` mudanças de formatação/estilo
- `refactor:` refatoração de código
- `test:` adição ou correção de testes
- `chore:` mudanças em ferramentas, configurações, etc.

Exemplos:
```bash
git commit -m "feat: adiciona simulação 3D de explosões solares"
git commit -m "fix: corrige responsividade do header em mobile"
git commit -m "docs: atualiza README com novas instruções"
```

## 🧪 Testes

- Execute `npm run lint` antes de fazer commit
- Teste a aplicação em diferentes tamanhos de tela
- Verifique se o build de produção funciona: `npm run build`
- Teste em diferentes navegadores quando possível

## 📖 Documentação

- Mantenha o README.md atualizado
- Documente componentes complexos
- Adicione comentários em código complexo
- Atualize o CHANGELOG.md (se existir)

## 🔍 Review Process

Todos os Pull Requests passarão por review antes de serem merged:

1. **Automated checks** - ESLint, build, etc.
2. **Code review** - Um mantenedor revisará seu código
3. **Testing** - Verificação manual se necessário
4. **Merge** - Após aprovação

### ✅ Checklist para Pull Request

- [ ] Código segue as diretrizes de estilo
- [ ] Commits seguem o padrão Conventional Commits
- [ ] Funcionalidade foi testada localmente
- [ ] Documentação foi atualizada (se necessário)
- [ ] Não há warnings no console
- [ ] Build de produção funciona

## 🚫 O que NÃO fazer

- ❌ Não faça commits diretamente na branch `master`
- ❌ Não ignore os warnings do ESLint
- ❌ Não adicione dependências desnecessárias
- ❌ Não faça alterações não relacionadas no mesmo PR
- ❌ Não remova funcionalidades existentes sem discussão

## 💬 Comunicação

- Use **português** ou **inglês** nas comunicações
- Seja respeitoso e construtivo
- Use as **Discussions** para perguntas gerais
- Use **Issues** para bugs específicos e sugestões

## 📚 Recursos Úteis

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide)

## 🙏 Agradecimentos

Toda contribuição é valiosa! Seja ela:

- 🐛 Reportar um bug
- 💡 Sugerir uma melhoria
- 💻 Contribuir com código
- 📖 Melhorar a documentação
- 🎨 Contribuir com design
- 🧪 Ajudar com testes

Muito obrigado por ajudar a tornar este projeto melhor! 🌟

---

**Dúvidas?** Abra uma [Discussion](https://github.com/AstridNielsen-lab/Solar-Flares/discussions) ou entre em contato: contato@likelooksolutions.com
