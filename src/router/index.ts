import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Instance from '../views/Instance.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/instance', name: 'instance', component: Instance },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
