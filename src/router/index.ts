import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Instance from '../views/Instance.vue'
import ConditionsUtilisation from '../views/ConditionsUtilisation.vue'
import MentionsLegales from '../views/MentionsLegales.vue'
import Methode from '../views/Methode.vue'
import NoteDetail from '../views/NoteDetail.vue'
import Notes from '../views/Notes.vue'
import PolitiqueConfidentialite from '../views/PolitiqueConfidentialite.vue'
import Reseaux from '../views/Reseaux.vue'
import Theatres from '../views/Theatres.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/instance', name: 'instance', component: Instance },
    { path: '/methode', name: 'methode', component: Methode },
    { path: '/notes', name: 'notes', component: Notes },
    { path: '/notes/:slug', name: 'note-detail', component: NoteDetail },
    { path: '/reseaux', name: 'reseaux', component: Reseaux },
    { path: '/theatres', name: 'theatres', component: Theatres },
    { path: '/mentions-legales', name: 'mentions-legales', component: MentionsLegales },
    { path: '/politique-confidentialite', name: 'politique-confidentialite', component: PolitiqueConfidentialite },
    { path: '/conditions-utilisation', name: 'conditions-utilisation', component: ConditionsUtilisation },
    { path: '/mouvement', redirect: '/instance' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
