<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useReveal } from './composables/useReveal'

const route = useRoute()
const scrolled = ref(false)
const cursorX = ref(0)
const cursorY = ref(0)
const ringX = ref(0)
const ringY = ref(0)

let raf = 0
let targetX = 0
let targetY = 0

const onScroll = () => {
  scrolled.value = window.scrollY > 40
}

const onMouseMove = (e: MouseEvent) => {
  targetX = e.clientX
  targetY = e.clientY
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const animateRing = () => {
  ringX.value += (targetX - ringX.value) * 0.18
  ringY.value += (targetY - ringY.value) * 0.18
  raf = requestAnimationFrame(animateRing)
}

const { observe } = useReveal()

const refreshReveals = () => {
  nextTick(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouseMove)
  onScroll()
  refreshReveals()
  animateRing()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
})

watch(() => route.path, () => {
  refreshReveals()
})
</script>

<template>
  <div class="site-shell">
    <div
      class="cursor"
      aria-hidden="true"
      :style="{ transform: `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)` }"
    ></div>
    <div
      class="cursor-ring"
      aria-hidden="true"
      :style="{ transform: `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)` }"
    ></div>

    <header class="site-nav" :class="{ scrolled }">
      <RouterLink to="/" class="nav-logo" aria-label="Vu du Cameroun">
        <div class="logo-icon">
          <img src="/logo/logo.png" alt="Vu du Cameroun" class="logo-image" />
        </div>
        <div class="logo-text">
          <span class="logo-name">Vu du Cameroun</span>
          <span class="logo-sub">Eclairer l'invisible. Maitriser le réel.</span>
        </div>
      </RouterLink>

      <nav class="nav-links" aria-label="Navigation principale">
        <RouterLink to="/instance">Instance</RouterLink>
        <a href="/#domains">Théâtres</a>
        <a href="/#approach">Doctrine</a>
        <a href="/#publications">Notes</a>
        <a href="/#partners">Réseaux</a>
      </nav>

      <div class="nav-actions">
        <div class="nav-lang" aria-label="Choix de langue">
          <button class="active lang-btn">FR</button>
          <span class="lang-sep">/</span>
          <button class="lang-btn">EN</button>
        </div>
        <a href="#cta-final" class="nav-cta">Collaborer</a>
      </div>
    </header>

    <main>
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <div class="nav-logo footer-logo-mark">
              <div class="logo-icon">
                <img src="/logo/logo.png" alt="Vu du Cameroun" class="logo-image" />
              </div>
              <div class="logo-text">
                <span class="logo-name">Vu du Cameroun</span>
                <span class="logo-sub">Eclairer l'invisible. Maitriser le réel.</span>
              </div>
            </div>
            <p class="footer-tagline">
              Eclairer l'invisible.<br />Maitriser le réel.
            </p>
            <div class="footer-social">
              <a href="#" class="social-link" aria-label="Twitter/X">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                  ></path>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  ></path>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
                  ></path>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><RouterLink to="/instance">Instance</RouterLink></li>
              <li><a href="/#domains">Théâtres</a></li>
              <li><a href="/#approach">Doctrine</a></li>
              <li><a href="/#publications">Notes</a></li>
              <li><a href="/#partners">Réseaux</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Ressources</h5>
            <ul>
              <li><a href="#">Analyses stratégiques</a></li>
              <li><a href="#">Prises de position</a></li>
              <li><a href="#">Notes</a></li>
              <li><a href="#">Adhérer</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Contact</h5>
            <div class="footer-contact-item"><span>Siège</span><span>Yaoundé, Cameroun</span></div>
            <div class="footer-contact-item"><span>Général</span><span>contact@vuducameroun.org</span></div>
            <div class="footer-contact-item"><span>Partenariats</span><span>partenariat@vuducameroun.org</span></div>
            <div class="footer-contact-item"><span>Presse</span><span>presse@vuducameroun.org</span></div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>2026 Vu du Cameroun. <span>Tous droits réservés.</span></p>
          <div class="footer-legal">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
