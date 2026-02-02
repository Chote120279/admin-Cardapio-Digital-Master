# 🧪 Guia de Testes - Admin Cardápio Digital

## 📖 Índice

1. [Introdução](#introdução)
2. [Configuração](#configuração)
3. [Executando Testes](#executando-testes)
4. [Estrutura de Testes](#estrutura-de-testes)
5. [Escrevendo Novos Testes](#escrevendo-novos-testes)
6. [Boas Práticas](#boas-práticas)
7. [Solução de Problemas](#solução-de-problemas)

## 🎯 Introdução

Este guia explica como usar e escrever testes para o projeto Admin Cardápio Digital. O projeto utiliza **Jasmine** como framework de testes e **Karma** como test runner.

### O que são testes?

Testes automatizados verificam se o código funciona como esperado. Eles ajudam a:
- ✅ Garantir que o código funciona corretamente
- ✅ Prevenir bugs ao adicionar novas funcionalidades
- ✅ Documentar o comportamento esperado do código
- ✅ Facilitar a manutenção do projeto

## ⚙️ Configuração

### Arquivos de Configuração

O projeto possui os seguintes arquivos de configuração de testes:

- **karma.conf.js** - Configuração do Karma (test runner)
- **src/test.ts** - Arquivo de inicialização dos testes
- **tsconfig.spec.json** - Configuração TypeScript para testes

Estes arquivos já estão configurados e prontos para uso!

## 🚀 Executando Testes

### Comando 1: Testes Interativos

```bash
npm test
```

**Quando usar:** Durante o desenvolvimento, quando você quer ver os testes rodando em tempo real.

**O que faz:**
- Abre o navegador Chrome
- Executa todos os testes
- Fica observando mudanças nos arquivos
- Reexecuta automaticamente quando você salva um arquivo

**Saída esperada:**
```
✔ Browser application bundle generation complete.
Karma v6.4.4 server started at http://localhost:9876/
...
Chrome 144.0.0.0: Executed 32 of 32 SUCCESS (0.2 secs / 0.18 secs)
```

### Comando 2: Testes Headless (sem interface)

```bash
npm run test:headless
```

**Quando usar:** Para verificar rapidamente se todos os testes passam, ou em ambientes de CI/CD.

**O que faz:**
- Executa os testes em modo headless (sem abrir navegador)
- Executa uma única vez
- Mostra o resultado no terminal

**Saída esperada:**
```
Chrome Headless 144.0.0.0: Executed 32 of 32 SUCCESS (0.2 secs / 0.18 secs)
TOTAL: 32 SUCCESS
```

### Comando 3: Testes com Cobertura

```bash
npm run test:coverage
```

**Quando usar:** Para verificar qual porcentagem do código está coberta por testes.

**O que faz:**
- Executa todos os testes
- Gera relatório de cobertura
- Salva o relatório na pasta `coverage/`

**Saída esperada:**
```
=============================== Coverage summary ===============================
Statements   : 100% ( 41/41 )
Branches     : 100% ( 2/2 )
Functions    : 100% ( 20/20 )
Lines        : 100% ( 36/36 )
================================================================================
```

**Visualizar relatório detalhado:**
Abra o arquivo `coverage/admin-cardapio-digital-master/index.html` no navegador.

## 📂 Estrutura de Testes

### Organização dos Arquivos

```
src/app/
├── app.component.spec.ts               # Testes do AppComponent
├── guards/
│   └── auth-guard.service.spec.ts      # Testes do AuthService
├── services/
│   └── firebase.service.spec.ts        # Testes do FirebaseService
└── views/
    ├── admin/
    │   ├── orders/
    │   │   └── orders.component.spec.ts    # Testes do OrdersComponent
    │   └── settings/
    │       └── settings.component.spec.ts  # Testes do SettingsComponent
    └── auth/
        └── login/
            └── login.component.spec.ts     # Testes do LoginComponent
```

### Convenção de Nomes

- Arquivo de teste: `nome-do-arquivo.spec.ts`
- Fica ao lado do arquivo original
- Exemplo: `orders.component.ts` → `orders.component.spec.ts`

## ✍️ Escrevendo Novos Testes

### Estrutura Básica de um Teste

```typescript
import { TestBed } from '@angular/core/testing';
import { MeuComponente } from './meu-componente';

describe('MeuComponente', () => {
  let component: MeuComponente;
  let fixture: ComponentFixture<MeuComponente>;

  // Executado antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuComponente]
    }).compileComponents();

    fixture = TestBed.createComponent(MeuComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Um teste simples
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // Teste de funcionalidade
  it('deve calcular a soma corretamente', () => {
    const resultado = component.somar(2, 3);
    expect(resultado).toBe(5);
  });
});
```

### Exemplo: Testando um Componente

```typescript
describe('OrdersComponent', () => {
  it('deve filtrar pedidos por status', () => {
    component.filtroAtual = 'pendente';
    const pedidosFiltrados = component.getPedidosFiltrados();
    
    // Verifica que todos os pedidos retornados são pendentes
    pedidosFiltrados.forEach(pedido => {
      expect(pedido.status).toBe('pendente');
    });
  });
});
```

### Exemplo: Testando um Serviço

```typescript
describe('FirebaseService', () => {
  it('deve atualizar configuração', async () => {
    const config = { chave: 'valor' };
    
    // Testa que a Promise é resolvida
    await expectAsync(service.atualizarConfig(config)).toBeResolved();
  });
});
```

### Exemplo: Testando com Mocks

```typescript
describe('LoginComponent', () => {
  it('deve navegar após login', async () => {
    // Cria um spy para o router
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    // Chama o método
    await component.login();
    
    // Verifica que o navigate foi chamado
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
```

## 🎓 Matchers do Jasmine

Os matchers mais usados:

```typescript
// Igualdade
expect(valor).toBe(esperado);              // ===
expect(valor).toEqual(esperado);           // comparação profunda

// Verdadeiro/Falso
expect(valor).toBeTruthy();                // valor é verdadeiro
expect(valor).toBeFalsy();                 // valor é falso
expect(valor).toBeTrue();                  // valor === true
expect(valor).toBeFalse();                 // valor === false

// Números
expect(valor).toBeGreaterThan(10);         // > 10
expect(valor).toBeLessThan(10);            // < 10
expect(valor).toBeCloseTo(10.5, 1);        // aproximado

// Arrays/Strings
expect(array).toContain(item);             // array contém item
expect(string).toMatch(/regex/);           // string corresponde

// Null/Undefined
expect(valor).toBeNull();
expect(valor).toBeUndefined();
expect(valor).toBeDefined();

// Funções
expect(fn).toHaveBeenCalled();             // função foi chamada
expect(fn).toHaveBeenCalledWith(args);     // chamada com argumentos
```

## 💡 Boas Práticas

### ✅ Faça

1. **Teste uma coisa por vez**
   ```typescript
   it('deve incrementar contador', () => {
     component.incrementar();
     expect(component.contador).toBe(1);
   });
   ```

2. **Use descrições claras**
   ```typescript
   it('deve filtrar pedidos pendentes corretamente', () => {
     // ...
   });
   ```

3. **Organize com beforeEach**
   ```typescript
   beforeEach(() => {
     // Configuração comum para todos os testes
   });
   ```

4. **Teste casos de sucesso e erro**
   ```typescript
   it('deve aceitar email válido', () => { /* ... */ });
   it('deve rejeitar email inválido', () => { /* ... */ });
   ```

### ❌ Evite

1. **Testes dependentes**
   ```typescript
   // ❌ Mal: teste depende de outro
   it('teste 1', () => { component.valor = 5; });
   it('teste 2', () => { expect(component.valor).toBe(5); }); // Pode falhar
   ```

2. **Testar implementação ao invés de comportamento**
   ```typescript
   // ❌ Mal: testa detalhes internos
   it('deve chamar método privado', () => { /* ... */ });
   
   // ✅ Bom: testa o resultado
   it('deve retornar resultado correto', () => { /* ... */ });
   ```

3. **Testes muito longos**
   ```typescript
   // ❌ Mal: faz muitas coisas
   it('deve fazer tudo', () => {
     // 50 linhas de código...
   });
   
   // ✅ Bom: divide em testes menores
   it('deve fazer A', () => { /* ... */ });
   it('deve fazer B', () => { /* ... */ });
   ```

## 🔧 Solução de Problemas

### Problema: "Cannot find module"

**Erro:**
```
Error: Cannot find module '@angular/core/testing'
```

**Solução:**
```bash
npm install
```

### Problema: Testes não encontrados

**Erro:**
```
No specs found
```

**Solução:**
- Verifique se o arquivo termina com `.spec.ts`
- Verifique se está na pasta `src/`

### Problema: Chrome não inicia

**Erro:**
```
Chrome failed to start
```

**Solução:**
Use o modo headless:
```bash
npm run test:headless
```

### Problema: Testes lentos

**Solução:**
Execute apenas os testes que você está trabalhando:

1. Use `fdescribe` ou `fit` para focar em testes específicos:
   ```typescript
   fdescribe('MeuComponente', () => { // Só este describe roda
     fit('deve testar algo', () => { // Só este it roda
       // ...
     });
   });
   ```

2. **Lembre-se de remover o `f` antes de fazer commit!**

### Problema: Teste falha aleatoriamente

**Causa:** Provavelmente há código assíncrono mal tratado.

**Solução:**
Use `async/await` ou `done()`:
```typescript
it('deve fazer chamada async', async () => {
  const resultado = await service.getData();
  expect(resultado).toBeDefined();
});
```

## 📊 Entendendo a Cobertura

### O que significa 100% de cobertura?

Quando você vê:
```
Statements   : 100% ( 41/41 )
Branches     : 100% ( 2/2 )
Functions    : 100% ( 20/20 )
Lines        : 100% ( 36/36 )
```

Significa:
- **Statements**: Todas as instruções foram executadas
- **Branches**: Todos os caminhos (if/else) foram testados
- **Functions**: Todas as funções foram chamadas
- **Lines**: Todas as linhas foram executadas

### Meta recomendada

- **Mínimo:** 80% de cobertura
- **Ideal:** 90%+
- **Excelente:** 100% (como temos agora!)

## 📚 Recursos Adicionais

- [Documentação Jasmine](https://jasmine.github.io/)
- [Documentação Karma](https://karma-runner.github.io/)
- [Guia de Testes Angular](https://angular.io/guide/testing)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## 🤝 Contribuindo com Testes

Ao adicionar nova funcionalidade:

1. ✍️ Escreva o teste primeiro (TDD)
2. ✅ Implemente a funcionalidade
3. 🧪 Execute os testes: `npm run test:headless`
4. 📊 Verifique a cobertura: `npm run test:coverage`
5. 🎯 Meta: manter 90%+ de cobertura

---

**Dúvidas?** Abra uma issue no GitHub ou consulte a documentação oficial do Angular.
