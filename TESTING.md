# Guia de Testes - Admin Cardápio Digital

## Como Testar Esta Aplicação

Este documento explica como executar testes nesta aplicação Angular.

## Pré-requisitos

Antes de começar a testar, certifique-se de que as dependências estão instaladas:

```bash
npm install
```

## Estrutura de Testes

Esta aplicação usa o **Karma** como test runner e **Jasmine** como framework de testes.

### Arquivos de Configuração

- `karma.conf.js` - Configuração do Karma
- `tsconfig.spec.json` - Configuração do TypeScript para testes
- `src/test.ts` - Arquivo de inicialização dos testes
- `*.spec.ts` - Arquivos de teste (um para cada componente/serviço)

## Como Executar os Testes

### Executar Todos os Testes

Para executar todos os testes uma vez:

```bash
npm test
```

ou

```bash
ng test
```

### Executar Testes em Modo Watch

Para executar os testes e observar mudanças nos arquivos:

```bash
ng test --watch
```

### Executar Testes uma Única Vez (CI/CD)

Para executar os testes uma vez sem observar mudanças (útil para integração contínua):

```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Executar com Cobertura de Código

Para gerar um relatório de cobertura de código:

```bash
ng test --code-coverage --watch=false
```

O relatório será gerado em `coverage/admin-cardapio-digital-master/index.html`

## Estrutura de um Teste

Um teste básico em Jasmine tem a seguinte estrutura:

```typescript
import { TestBed } from '@angular/core/testing';
import { MeuComponente } from './meu-componente.component';

describe('MeuComponente', () => {
  let component: MeuComponente;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuComponente ]
    });
    const fixture = TestBed.createComponent(MeuComponente);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter um título', () => {
    expect(component.titulo).toBe('Meu Título');
  });
});
```

## Escrevendo Novos Testes

### Para Componentes

1. Crie um arquivo `nome-componente.component.spec.ts` ao lado do componente
2. Configure o TestBed com as dependências necessárias
3. Escreva testes para validar o comportamento do componente

### Para Serviços

1. Crie um arquivo `nome-servico.service.spec.ts` ao lado do serviço
2. Injete o serviço usando `TestBed.inject()`
3. Escreva testes para validar os métodos do serviço

### Para Pipes e Directivas

Similar aos componentes, mas com configurações específicas para cada tipo.

## Boas Práticas

1. **Nomeie os testes claramente** - Use descrições que expliquem o que está sendo testado
2. **Teste comportamento, não implementação** - Foque no que o código faz, não em como faz
3. **Mantenha os testes simples** - Cada teste deve validar uma única coisa
4. **Use beforeEach para configuração** - Evite duplicação de código
5. **Limpe após os testes** - Use afterEach quando necessário
6. **Mockear dependências externas** - Não faça chamadas reais para APIs ou Firebase nos testes

## Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm test` | Executa os testes |
| `ng test --watch=false` | Executa os testes uma vez |
| `ng test --code-coverage` | Executa com cobertura de código |
| `ng test --browsers=Chrome` | Executa no Chrome (não headless) |
| `ng test --include='**/*.service.spec.ts'` | Executa apenas testes de serviços |

## Solução de Problemas

### Erro: "Chrome not found"

Se você estiver executando em um ambiente sem interface gráfica (CI/CD), use:

```bash
ng test --browsers=ChromeHeadless
```

### Erro: "Cannot find module"

Certifique-se de que todas as dependências estão instaladas:

```bash
npm install
```

### Testes Lentos

Para executar apenas um subconjunto de testes durante o desenvolvimento, use `fit` ou `fdescribe`:

```typescript
fit('deve testar apenas isso', () => {
  // teste
});
```

**Importante**: Remova o `f` antes de fazer commit!

## Exemplos de Testes

Veja os seguintes arquivos para exemplos:

- `src/app/app.component.spec.ts` - Teste de componente
- `src/app/services/firebase.service.spec.ts` - Teste de serviço

## Recursos Adicionais

- [Documentação do Jasmine](https://jasmine.github.io/)
- [Documentação do Karma](https://karma-runner.github.io/)
- [Guia de Testes do Angular](https://angular.io/guide/testing)

## Contribuindo com Testes

Quando adicionar novos componentes, serviços ou funcionalidades:

1. Sempre crie os arquivos `.spec.ts` correspondentes
2. Certifique-se de que os testes passam antes de fazer commit
3. Mantenha a cobertura de código acima de 70%
4. Teste casos de sucesso E casos de erro

---

**Dúvidas?** Abra uma issue no repositório ou consulte a documentação do Angular.
