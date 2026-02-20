import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n';

// Importar os arquivos de tradução
import en from './locales/en.json';
import pt from './locales/pt.json';

// Configurar o Vue I18n
const i18n = createI18n({
  locale: 'pt', // Idioma padrão
  fallbackLocale: 'en', // Idioma alternativo se uma chave não for encontrada no idioma atual
  messages: {
    en,
    pt
  }
});


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
