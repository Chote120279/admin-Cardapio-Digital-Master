# 🚀 Início Rápido - Como Testar

## ⚡ 3 Comandos Essenciais

### 1️⃣ Testes Interativos
```bash
npm test
```
- Abre navegador
- Mostra resultados em tempo real
- Reexecuta ao salvar arquivos
- **Use durante o desenvolvimento**

### 2️⃣ Testes Rápidos (CI)
```bash
npm run test:headless
```
- Sem interface gráfica
- Executa uma vez
- Resultado no terminal
- **Use para verificação rápida**

### 3️⃣ Testes com Cobertura
```bash
npm run test:coverage
```
- Gera relatório de cobertura
- Mostra % de código testado
- Relatório em: `coverage/admin-cardapio-digital-master/index.html`
- **Use antes de fazer commit**

---

## 📊 Status Atual

✅ **32 testes** implementados
✅ **100% de cobertura** de código
✅ **Todos passando**

---

## 📚 Documentação Completa

Veja [TESTING.md](TESTING.md) para:
- Guia detalhado de testes
- Como escrever novos testes
- Boas práticas
- Solução de problemas

---

## 🎯 O que foi testado?

| Componente | Testes | Status |
|------------|--------|--------|
| OrdersComponent | 11 | ✅ |
| FirebaseService | 6 | ✅ |
| AuthService | 9 | ✅ |
| LoginComponent | 3 | ✅ |
| SettingsComponent | 3 | ✅ |
| AppComponent | 2 | ✅ |

---

## 💡 Dica

Execute os testes sempre que fizer mudanças no código:

```bash
# Durante desenvolvimento
npm test

# Antes de fazer commit
npm run test:coverage
```

**Meta:** Manter sempre 90%+ de cobertura! 🎯
