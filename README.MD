E-Store: Projeto de E-commerce com Vue.js 3 e Tailwind CSS
Visão Geral do Projeto
Este é um projeto de e-commerce front-end desenvolvido com Vue.js 3 (usando Composition API e <script setup>), Tailwind CSS para estilização rápida e responsiva, e Vue Router para navegação. Ele simula uma loja online, permitindo aos usuários navegar por produtos, pesquisar, filtrar por categoria, adicionar itens ao carrinho e "finalizar" uma compra. Os dados dos produtos são consumidos de uma API de produtos fictícia (DummyJSON).

Funcionalidades Implementadas
O projeto inclui as seguintes funcionalidades principais:

Listagem de Produtos: Exibe uma grade de produtos na página inicial.
Busca de Produtos: Funcionalidade de busca integrada na Navbar, permitindo pesquisar produtos por nome. A busca é refletida na URL.
Filtro por Categoria: Ao clicar em uma categoria (ex: na página de detalhes do produto), a Home exibe apenas produtos daquela categoria. O filtro é refletido na URL.
Paginação Local: Gerencia a exibição de produtos em páginas, com navegação entre "Anterior" e "Próxima". A paginação é feita localmente após a busca inicial da API, permitindo paginação sobre todos os produtos filtrados/buscados. A página atual é refletida na URL.
Ordenação de Produtos: Opção para ordenar produtos por preço (menor para maior, maior para menor) ou por nome (A-Z, Z-A). A ordenação também é refletida na URL.
Detalhes do Produto: Ao clicar em um produto, o usuário é levado a uma página dedicada com mais informações e uma imagem maior.
Botão "Voltar": Na página de detalhes do produto, um botão permite ao usuário retornar facilmente à página anterior (listagem de produtos, resultados da busca, etc.).
Carrinho de Compras:
Adicionar produtos ao carrinho (de ProductCard e ProductDetail).
Visualizar itens no carrinho em uma página dedicada (/cart).
Ajustar a quantidade de itens no carrinho.
Remover itens do carrinho.
Exibir o total de itens e o preço total do carrinho.
Os dados do carrinho são persistidos no localStorage.
Finalizar Compra (Simulado): Ao clicar em "Finalizar Compra" no carrinho, uma mensagem de sucesso é exibida e o carrinho é esvaziado, simulando uma transação.
Páginas Informativas:
Sobre Nós: Uma página simples descrevendo a loja e sua missão.
Contato: Uma página com informações de contato e um formulário de contato simulado.
Layout Responsivo: Utiliza Tailwind CSS para garantir que o layout se adapte bem a diferentes tamanhos de tela (desktop, tablet, mobile).
Navegação Consistente: Navbar com links principais (Home, Carrinho) e barra de busca condicional. Footer com links secundários (Sobre, Contato) e ícones de redes sociais.
Tecnologias Utilizadas
Vue.js 3: Framework progressivo para construção de interfaces de usuário.
Composition API (<script setup>): Para organização e reutilização de lógica de componente.
ref e computed: Para gerenciamento de estado reativo.
watch e onMounted: Para efeitos colaterais e ciclo de vida.
Vue Router 4: Para navegação entre diferentes views da aplicação.
Pinia: (Implícito no cartStore.js como um store simples baseado em refs e computeds, poderia ser migrado para Pinia completo para grandes aplicações).
Tailwind CSS: Framework CSS utilitário para estilização rápida e personalizável.
Axios: Cliente HTTP baseado em Promises para fazer requisições à API.
DummyJSON: API REST fictícia utilizada para consumir os dados dos produtos.
localStorage: Para persistir os itens do carrinho entre as sessões.
Estrutura do Projeto
src/
├── assets/
├── components/
│   ├── Footer.vue          # Rodapé da aplicação
│   ├── Navbar.vue          # Barra de navegação principal
│   └── ProductCard.vue     # Componente para exibir um único produto
├── router/
│   └── index.js            # Configuração das rotas da aplicação
├── stores/
│   └── cartStore.js        # Lógica do carrinho de compras (simulando um store)
├── views/
│   ├── About.vue           # Página "Sobre Nós"
│   ├── Cart.vue            # Página do carrinho de compras
│   ├── Contact.vue         # Página de contato
│   ├── Home.vue            # Página principal com listagem de produtos, busca, filtro e ordenação
│   └── ProductDetail.vue   # Página de detalhes de um produto
└── App.vue                 # Componente raiz da aplicação
└── main.js                 # Ponto de entrada da aplicação
Como Rodar o Projeto Localmente
Para configurar e rodar este projeto em sua máquina local, siga os passos abaixo:

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO]
cd [pasta-do-projeto]
Instale as dependências:

Bash

npm install
# ou
yarn install
Inicie o servidor de desenvolvimento:

Bash

npm run dev
# ou
yarn dev
O projeto estará disponível em http://localhost:5173 (ou outra porta indicada no seu terminal).

Considerações Finais
Este projeto serve como uma base sólida para um e-commerce front-end, demonstrando boas práticas com Vue.js 3, gerenciamento de estado, roteamento e estilização. Para um projeto em produção, funcionalidades como autenticação, um backend real para processamento de pedidos e um sistema de pagamento seriam necessárias.

