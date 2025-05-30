import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Configuração base da URL da API
axios.defaults.baseURL = 'https://dummyjson.com'

const app = createApp(App)

app.use(router)

app.mount('#app')