# Admin Cardápio Digital Master

Sistema administrativo completo para gerenciamento de cardápio digital de restaurantes. Desenvolvido com Angular 17 e Firebase.

![Angular](https://img.shields.io/badge/Angular-17.0-red)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Firebase](#configuração-do-firebase)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [Serviços](#serviços)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O Admin Cardápio Digital Master é uma aplicação web moderna para gerenciamento de cardápios digitais, permitindo que restaurantes gerenciem seus produtos, categorias, preços e disponibilidade em tempo real.

### Screenshots

*Em breve: capturas de tela da aplicação*

## ✨ Funcionalidades

### ✅ Implementadas

- **Autenticação**
  - Login seguro com Firebase Authentication
  - Proteção de rotas com guards
  - Sistema de logout

- **Gerenciamento de Produtos**
  - Listagem de produtos com filtros
  - Cadastro de novos produtos
  - Edição de produtos existentes
  - Exclusão de produtos
  - Ativar/desativar disponibilidade
  - Upload de imagens
  - Busca por nome
  - Filtro por categoria

- **Categorias**
  - Entradas
  - Pratos Principais
  - Bebidas
  - Sobremesas

- **Interface Moderna**
  - Design responsivo
  - Componentes reutilizáveis
  - Feedback visual (alertas, modals, loading)
  - Animações suaves

- **Validações**
  - Validação de formulários em tempo real
  - Validadores customizados
  - Mensagens de erro claras

### 🚧 Em Desenvolvimento

- Relatórios e estatísticas
- Gerenciamento de usuários
- Sistema de pedidos
- Integração com pagamento

## 🛠 Tecnologias Utilizadas

### Frontend
- **Angular 17** - Framework principal
- **TypeScript 5.2** - Linguagem de programação
- **RxJS 7.8** - Programação reativa
- **CSS3** - Estilização

### Backend & Serviços
- **Firebase Authentication** - Autenticação de usuários
- **Cloud Firestore** - Banco de dados NoSQL
- **Firebase Storage** - Armazenamento de imagens
- **Firebase Hosting** - Hospedagem (opcional)

### Ferramentas de Desenvolvimento
- **Angular CLI** - Ferramenta de linha de comando
- **npm** - Gerenciador de pacotes

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
- [Angular CLI](https://angular.io/cli) (instalado globalmente)
- Conta no [Firebase](https://firebase.google.com/)

```bash
# Verificar versões instaladas
node --version
npm --version
ng version
```

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Chote120279/admin-Cardapio-Digital-Master.git
cd admin-Cardapio-Digital-Master
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Edite o arquivo `src/environments/environment.ts` com suas credenciais do Firebase:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
  }
};
```

### 4. Execute o projeto

```bash
# Modo desenvolvimento
npm start

# ou
ng serve
```

Acesse `http://localhost:4200` no seu navegador.

## 🔥 Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Siga as instruções para criar um novo projeto

### 2. Configurar Authentication

1. No console do Firebase, vá em **Authentication**
2. Clique em "Começar"
3. Habilite o método "E-mail/senha"

### 3. Configurar Firestore Database

1. Vá em **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (ou configure as regras de segurança)

### 4. Configurar Storage

1. Vá em **Storage**
2. Clique em "Começar"
3. Configure as regras de segurança

### 5. Obter Credenciais

1. Vá em **Configurações do Projeto** (ícone de engrenagem)
2. Role até "Seus apps"
3. Clique no ícone web `</>`
4. Copie as credenciais e cole em `environment.ts`

### 6. Regras de Segurança Recomendadas

#### Firestore Rules
Copie e cole no Firebase Console > Firestore Database > Regras:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /produtos/{produtoId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    match /categorias/{categoriaId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    match /config/{configId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Storage Rules
Copie e cole no Firebase Console > Storage > Regras:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /produtos/{imageId} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.contentType.matches('image/(jpeg|jpg|png|gif|webp)')
                   && !request.resource.contentType.matches('image/svg.*')
                   && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

**Nota de Segurança:** As regras de Storage bloqueiam arquivos SVG para prevenir ataques XSS. Apenas JPG, PNG, GIF e WebP são permitidos.

### 7. Deploy das Regras

## 📱 Como Usar

### Login
1. Acesse a aplicação
2. Use suas credenciais do Firebase
3. Clique em "Entrar"

### Gerenciar Produtos

#### Listar Produtos
- Acesse o menu "Gerenciar Produtos"
- Veja todos os produtos cadastrados
- Use o campo de busca para filtrar por nome
- Use o seletor de categoria para filtrar

#### Adicionar Produto
1. Clique em "+ Novo Produto"
2. Preencha os campos:
   - Nome (mínimo 3 caracteres)
   - Descrição
   - Preço
   - Categoria
   - Imagem
3. Marque se está disponível
4. Clique em "Salvar Produto"

#### Editar Produto
1. Na listagem, clique em "Editar"
2. Modifique os campos desejados
3. Clique em "Salvar Produto"

#### Excluir Produto
1. Na listagem, clique em "Excluir"
2. Confirme a exclusão

#### Ativar/Desativar Produto
- Na listagem, clique em "Ativar" ou "Desativar"

## 📁 Estrutura do Projeto

```
admin-Cardapio-Digital-Master/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── alert/
│   │   │   ├── card-profile/
│   │   │   ├── card-settings/
│   │   │   ├── loading/
│   │   │   └── modal-confirmacao/
│   │   ├── guards/              # Guards de rota
│   │   │   └── auth-guard.service.ts
│   │   ├── pipes/               # Pipes customizados
│   │   │   ├── moeda.pipe.ts
│   │   │   └── truncate.pipe.ts
│   │   ├── services/            # Serviços
│   │   │   ├── auth.service.ts
│   │   │   ├── categoria.service.ts
│   │   │   ├── firebase.service.ts
│   │   │   └── produto.service.ts
│   │   ├── validators/          # Validadores customizados
│   │   │   ├── nome-unico.validator.ts
│   │   │   ├── preco.validator.ts
│   │   │   └── url-imagem.validator.ts
│   │   ├── views/               # Páginas/Views
│   │   │   ├── admin/
│   │   │   │   ├── produto-form/
│   │   │   │   ├── produtos/
│   │   │   │   └── settings/
│   │   │   └── auth/
│   │   │       └── login/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── environments/            # Configurações de ambiente
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css              # Estilos globais
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🧩 Componentes

### Componentes de UI

- **AlertComponent** - Exibe alertas de sucesso, erro, warning ou info
- **LoadingComponent** - Spinner de carregamento
- **ModalConfirmacaoComponent** - Modal para confirmações
- **CardProfileComponent** - Card de perfil
- **CardSettingsComponent** - Card de configurações

### Componentes de Páginas

- **LoginComponent** - Página de login
- **SettingsComponent** - Painel administrativo principal
- **ProdutosComponent** - Listagem de produtos
- **ProdutoFormComponent** - Formulário de produto (criar/editar)

## 🔧 Serviços

### AuthService
Gerencia autenticação de usuários.

**Métodos:**
- `login(email, password)` - Fazer login
- `logout()` - Fazer logout
- `logado()` - Verificar se está logado
- `getCurrentUser()` - Obter usuário atual

### FirebaseService
Interage com Firebase Firestore e Storage.

**Métodos:**
- `atualizarConfig(config)` - Atualizar configuração
- `obterConfig()` - Obter configuração
- `uploadImagem(file, path)` - Fazer upload de imagem
- `deletarImagem(url)` - Deletar imagem

### ProdutoService
Gerencia CRUD de produtos.

**Métodos:**
- `listarProdutos()` - Listar todos
- `obterProduto(id)` - Obter um produto
- `criarProduto(produto)` - Criar produto
- `atualizarProduto(id, produto)` - Atualizar produto
- `deletarProduto(id)` - Deletar produto
- `toggleDisponibilidade(id, disponivel)` - Ativar/desativar

### CategoriaService
Gerencia CRUD de categorias.

## 🎨 Pipes

- **MoedaPipe** - Formata valores em R$ (ex: 15.5 → R$ 15,50)
- **TruncatePipe** - Trunca textos longos (ex: "Texto muito longo..." → "Texto mui...")

## ✅ Validadores

- **precoValidator** - Valida valores monetários
- **urlImagemValidator** - Valida URLs de imagens
- **nomeUnicoValidator** - Valida nomes únicos (async)

## 🔒 Segurança

Este projeto implementa várias medidas de segurança:

- ✅ **Autenticação Firebase** - Login seguro
- ✅ **Guards de Rota** - Proteção de rotas administrativas  
- ✅ **Validação de Upload** - Apenas JPG, PNG, GIF e WebP (SVG bloqueado)
- ✅ **Content Security Policy** - Proteção contra XSS
- ✅ **Firebase Security Rules** - Controle de acesso ao banco e storage
- ✅ **Limite de Tamanho** - Máximo 5MB por imagem

### ⚠️ Vulnerabilidades Conhecidas

O Angular 17.3.12 possui vulnerabilidades conhecidas de XSS relacionadas a SVG. Veja o arquivo [SECURITY.md](SECURITY.md) para detalhes completos e mitigações implementadas.

**Mitigações Aplicadas:**
- Bloqueio de arquivos SVG no upload
- Content Security Policy headers
- Regras de segurança do Firebase Storage
- Validação de tipo de arquivo

**Recomendação:** Para produção, considere atualizar para Angular 19.2.18+ que contém as correções de segurança.

## 🏗 Build para Produção

```bash
# Build otimizado
npm run build

# Os arquivos estarão em dist/
```

## 🚀 Deploy

### Firebase Hosting

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login no Firebase
firebase login

# Inicializar projeto
firebase init hosting

# Deploy
firebase deploy
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Renato Junior**

- GitHub: [@Chote120279](https://github.com/Chote120279)
- Email: chote.chote1979@gmail.com

## 🙏 Agradecimentos

- Angular Team pela excelente framework
- Firebase pela infraestrutura
- Comunidade open source

---

⭐️ Se este projeto te ajudou, considere dar uma estrela!

**Desenvolvido com ❤️ para facilitar o gerenciamento de cardápios digitais**
