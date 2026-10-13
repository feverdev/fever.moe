import { createApp } from 'vue'
import App from './App.vue'
import HomeView from './views/HomeView/HomeView.vue'
import EautopianView from './views/EautopianView/EautopianView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RedirectView from './views/RedirectView.vue'
import FastView from './views/FastView/FastView.vue'


const routes = [
    { path: '/', component: HomeView },
    { path: '/eautopian', component: EautopianView },
    { path: '/fasttt', component: FastView },
    { path: '/discord', component: RedirectView },
    { path: '/invite', component: RedirectView },
    { path: '/buy', component: RedirectView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
