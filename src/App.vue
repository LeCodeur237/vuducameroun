<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useReveal } from './composables/useReveal'

const route = useRoute()
const scrolled = ref(false)
const navOpen = ref(false)
const theme = ref<'dark' | 'light'>('dark')
const cursorX = ref(0)
const cursorY = ref(0)
const ringX = ref(0)
const ringY = ref(0)

let raf = 0
let parallaxRaf = 0
let targetX = 0
let targetY = 0

const parallaxSelector = [
  '.about-hero-bg',
  '.notes-hero-bg',
  '.note-detail-bg',
  '.method-hero-bg',
  '.theatres-hero-bg',
  '.networks-hero-bg',
  '.contact-hero-bg',
  '.legal-hero-bg',
].join(',')

const updateHeroParallax = () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion || window.innerWidth <= 820) {
    document
      .querySelectorAll<HTMLElement>(parallaxSelector)
      .forEach((el) => el.style.removeProperty('--hero-parallax-y'))
    return
  }

  document.querySelectorAll<HTMLElement>(parallaxSelector).forEach((el) => {
    const container = el.parentElement
    const rect = container?.getBoundingClientRect() ?? el.getBoundingClientRect()
    const offset = Math.max(-80, Math.min(80, rect.top * -0.14))
    el.style.setProperty('--hero-parallax-y', `${offset}px`)
  })
}

const requestHeroParallax = () => {
  if (parallaxRaf) return
  parallaxRaf = requestAnimationFrame(() => {
    parallaxRaf = 0
    updateHeroParallax()
  })
}

const onScroll = () => {
  scrolled.value = window.scrollY > 40
  requestHeroParallax()
}

const onMouseMove = (e: MouseEvent) => {
  targetX = e.clientX
  targetY = e.clientY
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const closeNav = () => {
  navOpen.value = false
}

const applyTheme = (value: 'dark' | 'light') => {
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  window.localStorage.setItem('vdc-theme', theme.value)
  applyTheme(theme.value)
}

const isHome = computed(() => route.path === '/')
const themeLabel = computed(() => theme.value === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre')
const logoSrc = computed(() => theme.value === 'light' ? '/logo/logo-black.png' : '/logo/logo.png')

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
  const storedTheme = window.localStorage.getItem('vdc-theme')
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  theme.value = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : prefersLight ? 'light' : 'dark'
  applyTheme(theme.value)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', requestHeroParallax)
  window.addEventListener('mousemove', onMouseMove)
  onScroll()
  requestHeroParallax()
  refreshReveals()
  animateRing()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', requestHeroParallax)
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
  cancelAnimationFrame(parallaxRaf)
})

watch(() => route.path, () => {
  closeNav()
  refreshReveals()
  nextTick(requestHeroParallax)
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

    <header class="site-nav" :class="{ scrolled, 'is-home': isHome }">
      <RouterLink to="/" class="nav-logo" aria-label="Vu du Cameroun">
        <div class="logo-icon">
          <img :src="logoSrc" alt="Vu du Cameroun" class="logo-image" />
        </div>
        <div class="logo-text">
          <span class="logo-name">Vu du Cameroun</span>
          <span class="logo-sub">Éclairer. Former. Agir.</span>
        </div>
      </RouterLink>

      <nav class="nav-links" aria-label="Navigation principale">
        <RouterLink to="/instance" @click="closeNav">Instance</RouterLink>
        <RouterLink to="/theatres" @click="closeNav">Théâtres</RouterLink>
        <RouterLink to="/methode" @click="closeNav">Méthode</RouterLink>
        <RouterLink to="/notes" @click="closeNav">Notes</RouterLink>
        <RouterLink to="/reseaux" @click="closeNav">Réseaux</RouterLink>
      </nav>

      <div class="nav-actions">
        <div class="nav-lang" aria-label="Choix de langue">
          <button class="active lang-btn">FR</button>
          <span class="lang-sep">/</span>
          <button class="lang-btn">EN</button>
        </div>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="themeLabel"
          :title="themeLabel"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.8A8.6 8.6 0 0 1 11.2 3a7 7 0 1 0 9.8 9.8z"></path>
          </svg>
        </button>
        <RouterLink to="/contact" class="nav-cta" @click="closeNav">Rejoindre</RouterLink>
        <button
          class="nav-toggle"
          type="button"
          :aria-expanded="navOpen"
          aria-controls="mobile-nav"
          aria-label="Ouvrir le menu"
          @click="navOpen = !navOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav id="mobile-nav" class="mobile-nav" :class="{ open: navOpen }" aria-label="Navigation mobile">
        <RouterLink to="/instance" @click="closeNav">Instance</RouterLink>
        <RouterLink to="/theatres" @click="closeNav">Théâtres</RouterLink>
        <RouterLink to="/methode" @click="closeNav">Méthode</RouterLink>
        <RouterLink to="/notes" @click="closeNav">Notes</RouterLink>
        <RouterLink to="/reseaux" @click="closeNav">Réseaux</RouterLink>
        <button class="mobile-theme-toggle" type="button" @click="toggleTheme">
          <span>{{ theme === 'dark' ? 'Mode clair' : 'Mode sombre' }}</span>
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.8A8.6 8.6 0 0 1 11.2 3a7 7 0 1 0 9.8 9.8z"></path>
          </svg>
        </button>
        <RouterLink to="/contact" class="mobile-nav-cta" @click="closeNav">Rejoindre</RouterLink>
      </nav>
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
                <img :src="logoSrc" alt="Vu du Cameroun" class="logo-image" />
              </div>
              <div class="logo-text">
                <span class="logo-name">Vu du Cameroun</span>
                <span class="logo-sub">Éclairer. Former. Agir.</span>
              </div>
            </div>
            <p class="footer-tagline">
              Éclairer l'invisible.<br />Construire le réel.
            </p>
            <div class="footer-social">
              <a href="mailto:contact@vuducameroun.org" class="social-link" aria-label="Contact général">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="m3 7 9 6 9-6"></path>
                </svg>
              </a>
              <a href="mailto:partenariat@vuducameroun.org" class="social-link" aria-label="Partenariats">
                <svg viewBox="0 0 24 24">
                  <path d="M8 12h8"></path>
                  <path d="M12 8v8"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                </svg>
              </a>
              <RouterLink to="/contact" class="social-link" aria-label="Adhérer">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9.5" cy="7" r="4"></circle>
                  <path d="M19 8v6"></path>
                  <path d="M22 11h-6"></path>
                </svg>
              </RouterLink>
              <a href="mailto:presse@vuducameroun.org" class="social-link" aria-label="Presse">
                <svg viewBox="0 0 24 24">
                  <path d="M4 19.5V5a2 2 0 0 1 2-2h11v18H6a2 2 0 0 1-2-1.5z"></path>
                  <path d="M8 7h5"></path>
                  <path d="M8 11h6"></path>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><RouterLink to="/instance">Instance</RouterLink></li>
              <li><RouterLink to="/theatres">Théâtres</RouterLink></li>
              <li><RouterLink to="/methode">Méthode</RouterLink></li>
              <li><RouterLink to="/notes">Notes</RouterLink></li>
              <li><RouterLink to="/reseaux">Réseaux</RouterLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Ressources</h5>
            <ul>
              <li><RouterLink to="/notes">Notes citoyennes</RouterLink></li>
              <li><RouterLink to="/theatres">Théâtres jeunesse</RouterLink></li>
              <li><RouterLink to="/reseaux">Réseaux partenaires</RouterLink></li>
              <li><RouterLink to="/contact">Adhérer</RouterLink></li>
              <li><a href="mailto:presse@vuducameroun.org">Presse</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Contact</h5>
            <div class="footer-contact-item"><span>Siège</span><span>Yaoundé, Cameroun</span></div>
            <div class="footer-contact-item"><span>Dynamique</span><span>contact@vuducameroun.org</span></div>
            <div class="footer-contact-item"><span>Partenariats</span><span>partenariat@vuducameroun.org</span></div>
            <div class="footer-contact-item"><span>Presse</span><span>presse@vuducameroun.org</span></div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>2026 Vu du Cameroun. <span>Mouvement citoyen apolitique.</span></p>
          <div class="footer-legal">
            <RouterLink to="/mentions-legales">Mentions légales</RouterLink>
            <RouterLink to="/politique-confidentialite">Politique de confidentialité</RouterLink>
            <RouterLink to="/conditions-utilisation">Conditions d'utilisation</RouterLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
