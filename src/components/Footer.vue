<template>
  <footer class="bg-black text-white py-8 mt-12">
    <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
      <div class="mb-6 md:mb-0">
        <router-link to="/" class="flex items-center justify-center md:justify-start space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="text-2xl font-bold">ECOMMERCE</span>
        </router-link>
        <p class="text-sm text-gray-400 mt-2">© 2025 E-Store. Todos os direitos reservados.</p>
      </div>

      <div class="mb-6 md:mb-0">
        <h3 class="text-xl font-semibold mb-3">Links Úteis</h3>
        <ul class="space-y-2">
          <li><router-link to="/about" class="text-gray-300 hover:text-white transition-colors">Sobre Nós</router-link></li>
          <li><router-link to="/contact" class="text-gray-300 hover:text-white transition-colors">Contato</router-link></li>
          <li><router-link to="/" class="text-gray-300 hover:text-white transition-colors">Voltar à Loja</router-link></li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3">Siga-nos</h3>
        <div class="flex justify-center md:justify-start space-x-4">
          <a href="https://instagram.com/seuusuario" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-white transition-colors">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12.0007 2.00223C8.41164 2.00223 7.97155 2.01684 6.57723 2.07223C5.17646 2.12646 4.39867 2.3739 3.78445 2.61058C2.52973 3.09039 1.51731 4.10309 1.03798 5.35858C0.800921 5.9729 0.553974 6.75083 0.500223 8.15042C0.44483 9.54474 0.430223 9.98492 0.430223 12.0007C0.430223 14.0165 0.44483 14.4567 0.500223 15.8509C0.553974 17.2505 0.800921 18.0284 1.03798 18.6427C1.51731 19.8982 2.52973 20.9109 3.78445 21.3907C4.39867 21.6273 5.17646 21.8748 6.57723 21.929C7.97155 21.9844 8.41164 21.9989 12.0007 21.9989C15.5898 21.9989 16.0299 21.9844 17.4242 21.929C18.8238 21.8748 19.6017 21.6273 20.216 21.3907C21.4715 20.9109 22.4839 19.8982 22.9632 18.6427C23.2003 18.0284 23.4472 17.2505 23.5009 15.8509C23.5563 14.4567 23.5709 14.0165 23.5709 12.0007C23.5709 9.98492 23.5563 9.54474 23.5009 8.15042C23.4472 6.75083 23.2003 5.9729 22.9632 5.35858C22.4839 4.10309 21.4715 3.09039 20.216 2.61058C19.6017 2.3739 18.8238 2.12646 17.4242 2.07223C16.0299 2.01684 15.5898 2.00223 12.0007 2.00223ZM12.0007 6.41738C14.0729 6.41738 15.8335 8.17796 15.8335 10.2502C15.8335 12.3224 14.0729 14.083 12.0007 14.083C9.92844 14.083 8.16786 12.3224 8.16786 10.2502C8.16786 8.17796 9.92844 6.41738 12.0007 6.41738ZM12.0007 4.54223C7.30058 4.54223 3.66538 8.17758 3.66538 12.0007C3.66538 15.8239 7.30058 19.4591 12.0007 19.4591C16.7008 19.4591 20.336 15.8239 20.336 12.0007C20.336 8.17758 16.7008 4.54223 12.0007 4.54223ZM18.3541 4.70778C17.7028 4.70778 17.1741 5.23648 17.1741 5.88778C17.1741 6.53907 17.7028 7.06778 18.3541 7.06778C19.0054 7.06778 19.5341 6.53907 19.5341 5.88778C19.5341 5.23648 19.0054 4.70778 18.3541 4.70778Z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="https://github.com/seuusuario" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-white transition-colors">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.499.09.682-.217.682-.483 0-.237-.008-.866-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.909-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.91.82.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.931 0-1.088.387-1.979 1.029-2.671-.103-.252-.446-1.265.098-2.647 0 0 .84-.266 2.75 1.025A9.28 9.28 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.291 2.747-1.025 2.747-1.025.546 1.382.202 2.395.099 2.647.643.692 1.029 1.583 1.029 2.671 0 3.829-2.339 4.673-4.566 4.92.359.309.678.917.678 1.846 0 1.338-.012 2.419-.012 2.747 0 .268.181.592.687.483C21.133 20.197 24 16.442 24 12.017 24 6.484 19.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
          </div>
      </div>
    </div>
  </footer>
</template>
