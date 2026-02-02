# admin-Cardapio-Digital-Master

Sistema de administração para Cardápio Digital de Restaurante desenvolvido em Angular.

## 📋 Sobre o Projeto

Este projeto é um painel administrativo para gerenciar pedidos de um restaurante, permitindo visualizar, filtrar e atualizar o status dos pedidos em tempo real.

## 🚀 Como Começar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (vem com o Node.js)
- Angular CLI

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Chote120279/admin-Cardapio-Digital-Master.git
cd admin-Cardapio-Digital-Master
```

2. Instale as dependências:
```bash
npm install
```

### Executar a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200/`

### Build de Produção

Para criar uma build de produção:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`.

## 🧪 Como Testar

### Executar Testes

Este projeto possui três formas de executar os testes:

#### 1. Testes Interativos (com navegador)
```bash
npm test
```
Este comando abre o navegador Chrome e executa os testes em modo watch (observação), reexecutando automaticamente quando você modifica os arquivos.

#### 2. Testes em Modo Headless (CI/CD)
```bash
npm run test:headless
```
Executa os testes uma única vez em modo headless (sem interface gráfica), ideal para integração contínua.

#### 3. Testes com Cobertura de Código
```bash
npm run test:coverage
```
Executa os testes e gera um relatório de cobertura de código. O relatório será gerado na pasta `coverage/`.

### Visualizar Relatório de Cobertura

Após executar `npm run test:coverage`, abra o arquivo:
```
coverage/admin-cardapio-digital-master/index.html
```

Este relatório mostra:
- Porcentagem de código testado
- Linhas não cobertas pelos testes
- Funções e branches testados

## 📁 Estrutura de Testes

Os testes estão organizados da seguinte forma:

```
src/
├── app/
│   ├── app.component.spec.ts          # Testes do componente principal
│   ├── guards/
│   │   └── auth-guard.service.spec.ts # Testes do guard de autenticação
│   ├── services/
│   │   └── firebase.service.spec.ts   # Testes do serviço Firebase
│   └── views/
│       ├── admin/
│       │   ├── orders/
│       │   │   └── orders.component.spec.ts    # Testes do componente de pedidos
│       │   └── settings/
│       │       └── settings.component.spec.ts  # Testes do componente de configurações
│       └── auth/
│           └── login/
│               └── login.component.spec.ts     # Testes do componente de login
```

## 🧩 Componentes Testados

### OrdersComponent
- ✅ Criação do componente
- ✅ Inicialização com pedidos de exemplo
- ✅ Filtros de status (todos, pendente, preparando, pronto)
- ✅ Atualização de status dos pedidos
- ✅ Cálculo correto dos totais
- ✅ Cores e textos de status

### FirebaseService
- ✅ Criação do serviço
- ✅ Método getData
- ✅ Método atualizarConfig
- ✅ Manipulação de diferentes tipos de configuração

### AuthService
- ✅ Criação do serviço
- ✅ Guard de autenticação (canActivate)
- ✅ Verificação de login (logado)
- ✅ Redirecionamento para login quando não autenticado

### LoginComponent
- ✅ Criação do componente
- ✅ Método de login
- ✅ Navegação após login bem-sucedido

### SettingsComponent
- ✅ Criação do componente
- ✅ Salvamento de configurações

## 🛠️ Tecnologias Utilizadas

- **Angular** 19.2.18 - Framework principal
- **TypeScript** 5.7.2 - Linguagem de programação
- **Karma** - Test runner
- **Jasmine** - Framework de testes
- **RxJS** - Programação reativa

## 📊 Funcionalidades

- 📦 Gerenciamento de pedidos
- 🔍 Filtros por status (Pendente, Preparando, Pronto, Entregue)
- 🔄 Atualização de status em tempo real
- 📱 Interface responsiva
- 🎨 Design moderno com emojis

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. **Execute os testes** (`npm test`)
4. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
5. Push para a branch (`git push origin feature/NovaFuncionalidade`)
6. Abra um Pull Request

## 📝 Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar aplicação em desenvolvimento
npm start

# Build de produção
npm run build

# Executar testes
npm test

# Executar testes em modo headless
npm run test:headless

# Executar testes com cobertura
npm run test:coverage

# Linter (quando configurado)
npm run lint
```

## 📄 Licença

Este projeto é privado e pertence a Chote120279.

## 👤 Autor

**Chote120279**

- GitHub: [@Chote120279](https://github.com/Chote120279)
