// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import About from '../views/About.vue'; // Importa o novo componente About
import Contact from '../views/Contact.vue'; // Importa o novo componente Contact

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/category/:category',
    name: 'CategoryProducts',
    component: Home,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/about', // Nova rota para a página Sobre
    name: 'About',
    component: About
  },
  {
    path: '/contact', // Nova rota para a página Contato
    name: 'Contact',
    component: Contact
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;