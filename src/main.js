import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


axios.defaults.baseURL = 'https://dummyjson.com'

const app = createApp(App)

app.use(router)

app.mount('#app')

const fetchProducts = async () => {
  try {
    if (category.value) {
      const response = await axios.get(`/products/category/${category.value}`)
      products.value = response.data.products
    } else if (search.value) {
      const response = await axios.get(`/products/search?q=${search.value}`)
      products.value = response.data.products
    } else {
      const response = await axios.get('/products')
      products.value = response.data.products
    }
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}
