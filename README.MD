# 🛍️ **E-Store**  
### Projeto de E-commerce com Vue.js 3 e Tailwind CSS

## 📌 Visão Geral do Projeto

**E-Store** é um projeto de front-end para e-commerce, desenvolvido com:

- **Vue.js 3** (usando Composition API e `<script setup>`)
- **Tailwind CSS** para estilização rápida e responsiva
- **Vue Router** para navegação
- **DummyJSON API** como fonte de dados

Ele simula uma loja online, permitindo aos usuários:

✅ Navegar por produtos  
🔍 Pesquisar e filtrar por categorias  
🛒 Adicionar itens ao carrinho  
✅ Simular a finalização de uma compra  

---

## ⚙️ Funcionalidades Implementadas

### 🛒 **Catálogo de Produtos**
- **Listagem de Produtos**: grade de produtos na página inicial.
- **Busca de Produtos**: campo de busca na Navbar, refletido na URL.
- **Filtro por Categoria**: clique em uma categoria para filtrar produtos (URL refletida).
- **Paginação Local**: navegação entre páginas com "Anterior" / "Próxima", refletida na URL.
- **Ordenação**: por preço (↑↓) ou nome (A-Z / Z-A), com estado na URL.

### 🔍 **Detalhes do Produto**
- Página dedicada com imagem ampliada e informações detalhadas.
- Botão de **Voltar** para retornar à listagem, busca ou filtro anteriores.

### 🛍️ **Carrinho de Compras**
- Adicionar produtos (via ProductCard ou ProductDetail)
- Visualizar carrinho em `/cart`
- Ajustar quantidades e remover itens
- Visualizar total de itens e valor total
- Persistência no `localStorage`
- Simulação de **finalização da compra** com mensagem de sucesso

### 📄 **Páginas Informativas**
- **Sobre Nós**: Missão e informações da loja
- **Contato**: Informações de contato + formulário simulado

### 📱 **Outros Recursos**
- **Layout Responsivo** com Tailwind CSS
- **Navegação Consistente**: Navbar (Home, Carrinho, Busca) + Footer (Sobre, Contato, redes sociais)

### 🔉**VIDEO:**

youtube - https://youtu.be/KkCmMFb-rJc

### 💌 **PRINTS:**
---

![image alt](https://github.com/Luiz-Eder/Trabalho-Tec-Front/blob/main/Screenshot%202025-06-03%20215053.png?raw=true)

![image alt](https://github.com/Luiz-Eder/Trabalho-Tec-Front/blob/main/Screenshot%202025-06-03%20215323.png?raw=true)

![image alt](https://github.com/Luiz-Eder/Trabalho-Tec-Front/blob/main/Screenshot%202025-06-03%20215434.png?raw=true)

![image alt](https://github.com/Luiz-Eder/Trabalho-Tec-Front/blob/main/Screenshot%202025-06-03%20215813.png?raw=true)

![image alt](https://github.com/Luiz-Eder/Trabalho-Tec-Front/blob/main/Screenshot%202025-06-03%20215732.png?raw=true)

![image alt](https://github.com/Luiz-Eder/Trabalho-Tec-Front/blob/main/Screenshot%202025-06-03%20215524.png?raw=true)

---


## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Descrição |
|-----------------|-----------|
| **Vue.js 3** | Framework JavaScript progressivo |
| **Composition API (`<script setup>`)** | Organização e reuso de lógica |
| `ref`, `computed`, `watch`, `onMounted` | Controle reativo e ciclo de vida |
| **Vue Router 4** | Navegação entre páginas |
| **Tailwind CSS** | Estilização utilitária e responsiva |
| **Axios** | Requisições HTTP à API |
| **DummyJSON** | API REST fictícia para produtos |
| **localStorage** | Persistência de dados do carrinho |
| **Pinia (opcional)** | Store centralizada (o carrinho simula uma store com `ref`/`computed`) |

---

## 🧱 Estrutura do Projeto

```
src/
├── assets/
├── components/
│   ├── Footer.vue
│   ├── Navbar.vue
│   └── ProductCard.vue
├── router/
│   └── index.js
├── stores/
│   └── cartStore.js
├── views/
│   ├── About.vue
│   ├── Cart.vue
│   ├── Contact.vue
│   ├── Home.vue
│   └── ProductDetail.vue
├── App.vue
└── main.js
```

---

## ▶️ Como Rodar o Projeto Localmente

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/e-store.git
cd e-store
```

### 2. Instale as dependências:

```bash
npm install

```

### 3. Inicie o servidor de desenvolvimento:

```bash
npm run dev

```

O projeto estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## ✅ Considerações Finais

Este projeto é uma base sólida para e-commerces front-end com:

- **Boas práticas de Vue.js 3**
- **Gerenciamento de estado**
- **Navegação estruturada**
- **Estilização moderna**

🔒 Para uma versão de produção, recomenda-se implementar:
- Autenticação de usuários
- Backend real (Node, Laravel, etc.)
- Integração com gateways de pagamento
