import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ui from '@nuxt/ui/vue-plugin'
import { vMath } from './lib'
import App from './App.vue'
import Home from './components/Home.vue'
import Dataset from './components/Dataset.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/:path(.*)', component: Dataset, props: true },
  ],
})

const app = createApp(App).use(router).use(ui).directive('math', vMath)
router.isReady().then(() => app.mount('#app')) // so the sidebar can expand to the current dataset

