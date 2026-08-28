<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { mergeManagedNotes, publicNotes, type PublicNote } from '../data/notes'

const { observe } = useReveal()
onMounted(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
  window.addEventListener('storage', refreshPublications)
  window.addEventListener('vdc-managed-notes-updated', refreshPublications)
})

onUnmounted(() => {
  window.removeEventListener('storage', refreshPublications)
  window.removeEventListener('vdc-managed-notes-updated', refreshPublications)
})

const tickerItems = [
  'Dynamique Génération Citoyenne',
  'Jeunesse Citoyenne',
  'Paix & Unité Nationale',
  'Vigilance Numérique',
  'Made in Cameroon',
  'Insertion Socio-professionnelle',
  'Action Communautaire',
  'Éthique Républicaine',
  'Afrique Internationale en Mouvement',
]

const domains = [
  {
    num: '01',
    title: 'Éveil civique',
    text: "Nous formons une jeunesse consciente de ses devoirs républicains, attachée à la paix, à l'unité nationale et à la communion des peuples.",
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><rect x="9" y="12" width="6" height="10" rx="1"></rect>',
  },
  {
    num: '02',
    title: 'Insertion économique',
    text: "Nous libérons le potentiel économique des jeunes par l'entrepreneuriat, le Made in Cameroon, les formations utiles et les passerelles vers l'emploi.",
    icon: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
  },
  {
    num: '03',
    title: 'Leadership de terrain',
    text: "Nous préparons des cadres compétents, patriotes, responsables et intègres, capables d'agir dans leurs communautés avant de parler au nom d'elles.",
    icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
  },
  {
    num: '04',
    title: 'Coopération utile',
    text: "Nous travaillons avec l'État, les CTD, les institutions, la diaspora et les partenaires au développement autour d'initiatives concrètes.",
    icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path>',
  },
]

const aboutCards = [
  {
    title: 'Vision',
    text: "Constituer une force de proposition et d'action citoyenne capable de dynamiser les transformations sociales positives de la jeunesse.",
    icon: '<path d="M2 12L12 2l10 10M5 9.5V20h14V9.5"></path><path d="M9 20v-8h6v8"></path>',
  },
  {
    title: 'Mission',
    text: "Éduquer, former, connecter et mobiliser les jeunes pour préserver la paix, défendre l'intérêt général et contribuer au développement durable.",
    icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path>',
  },
  {
    title: 'Positionnement',
    text: "Une plateforme citoyenne, apolitique et formatrice, complémentaire aux efforts publics et tournée vers l'impact mesurable.",
    icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
  },
  {
    title: 'Communauté',
    text: "Un mouvement de jeunes, de bénévoles, d'experts, d'entrepreneurs et d'aînés engagés autour d'une même exigence de service.",
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  },
]

const steps = [
  { num: '01', title: 'Éclairer', text: "Lire les signaux faibles, écouter les silences sociaux et transformer les réalités invisibles en priorités d'action." },
  { num: '02', title: 'Former', text: "Armer les jeunes contre l'apathie civique, la désinformation, les discours de haine et les vulnérabilités contemporaines." },
  { num: '03', title: 'Agir', text: "Déployer des projets communautaires, humanitaires, techniques et économiques là où les besoins sont concrets." },
  { num: '04', title: 'Construire', text: "Faire de l'engagement citoyen une discipline durable: responsabilité, mérite, bénévolat, création de valeur et cohésion nationale." },
]

const intlStats = [
  { num: '03', label: 'Piliers' },
  { num: '2023', label: 'Depuis' },
  { num: '04', label: 'Échelles d’action' },
  { num: 'National', label: 'International' },
]

const managedPublications = ref<PublicNote[]>(mergeManagedNotes(publicNotes))
const publications = computed(() =>
  managedPublications.value.slice(0, 3).map((note, index) => ({
    ...note,
    featured: index === 0,
  }))
)

const refreshPublications = () => {
  managedPublications.value = mergeManagedNotes(publicNotes)
}

const partnerCats = [
  { title: 'Pouvoirs publics & CTD', text: "Une action complémentaire aux efforts de l'État, des collectivités territoriales décentralisées et des dispositifs publics de développement.", icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' },
  { title: 'Acteurs économiques', text: "Des partenaires techniques, financiers, industriels et entrepreneuriaux pour créer de la valeur au profit des jeunes.", icon: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>' },
  { title: 'Société civile & diaspora', text: "Des associations, experts, communautés locales et réseaux internationaux mobilisés pour la cohésion, la formation et l'action terrain.", icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>' },
]

const partnerLogos = ['État', 'CTD', 'CEMAC', 'Union Africaine', 'Diaspora', 'Collectifs jeunes']
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-bg"></div>
    <div class="hero-grid"></div>
    <div class="container">
      <div class="hero-inner">
        <div class="hero-content">
          <div class="hero-eyebrow">
            <div class="hero-eyebrow-line"></div>
            <span class="label">Dynamique Génération Citoyenne</span>
          </div>
          <h1 class="hero-title">
            La jeunesse<br />
            <em>citoyenne</em><br />
            en action.
          </h1>
          <p class="hero-subtitle">
            Vu du Cameroun est une association à portée nationale et internationale, active depuis
            2023, qui porte une dynamique jeune, apolitique et républicaine pour former,
            mobiliser et insérer une génération utile à la paix, à l'unité nationale et au
            développement du Cameroun.
          </p>
          <div class="hero-actions">
            <RouterLink to="/contact" class="btn-primary">Entrer dans la dynamique</RouterLink>
            <a href="#domains" class="btn-ghost">Découvrir nos axes</a>
          </div>
          <div class="hero-slogan">
            <p>"Éclairer l'invisible, écouter les silences, vitaliser l'inertie, ériger l'avenir."</p>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-globe-wrap">
            <div class="globe-svg-container">
              <img
                src="/images/carte.png"
                alt="Carte de l'Afrique et du Cameroun"
                class="hero-brand-image"
                loading="eager"
                decoding="async"
              />
              <div class="globe-overlay"></div>
            </div>
          </div>
          <div class="hero-stat-row">
            <div class="hero-stat"><span class="hero-stat-num">03</span><span class="hero-stat-label">Piliers</span></div>
            <div class="hero-stat"><span class="hero-stat-num">2023</span><span class="hero-stat-label">Depuis</span></div>
            <div class="hero-stat"><span class="hero-stat-num">04</span><span class="hero-stat-label">Théâtres</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-hint">
      <span>Découvrir</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <div class="ticker-bar" aria-hidden="true">
    <div class="ticker-inner">
      <template v-for="n in 2" :key="n">
        <div v-for="(item, i) in tickerItems" :key="`${n}-${i}`" class="ticker-item">
          {{ item }} <span class="ticker-dot"></span>
        </div>
      </template>
    </div>
  </div>

  <section id="about" class="section-pad section-dark">
    <div class="container">
      <div class="about-grid">
        <div class="about-left">
          <div class="about-num" aria-hidden="true">01</div>
          <div class="about-content">
            <div class="label reveal">Le mouvement</div>
            <div class="gold-rule" style="margin: 1rem 0 1.5rem"></div>
            <h2 class="section-title reveal reveal-delay-1">
              Une <em>dynamique</em> citoyenne au cœur du Cameroun.
            </h2>
            <p class="about-text reveal reveal-delay-2">
              La Dynamique Génération Citoyenne refuse l'apathie civique. Elle articule
              formation intégrale, action communautaire, vigilance numérique et insertion
              socio-professionnelle des jeunes.
            </p>
            <p class="about-text reveal reveal-delay-3">
              Nous agissons dans l'esprit des mouvements citoyens africains contemporains:
              structurés, pacifiques, enracinés, connectés au réel et complémentaires aux efforts
              publics pour le développement.
            </p>
          </div>
        </div>
        <div class="about-cards reveal reveal-delay-2">
          <article v-for="(card, i) in aboutCards" :key="i" class="about-card">
            <div class="about-card-icon" v-html="`<svg viewBox='0 0 24 24'>${card.icon}</svg>`"></div>
            <h4>{{ card.title }}</h4>
            <p>{{ card.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section id="domains" class="section-pad">
    <div class="container">
      <div class="domains-header">
        <div class="label reveal">Nos théâtres d'action</div>
        <h2 class="section-title reveal reveal-delay-1">
          Là où la <em>conscience</em> devient <em>action</em>.
        </h2>
      </div>
      <div class="domains-grid reveal">
        <article v-for="(d, i) in domains" :key="i" class="domain-card">
          <div class="domain-num">{{ d.num }}</div>
          <div class="domain-icon" v-html="`<svg viewBox='0 0 24 24'>${d.icon}</svg>`"></div>
          <h3>{{ d.title }}</h3>
          <p>{{ d.text }}</p>
          <RouterLink to="/contact" class="domain-link">
            Agir
            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>

  <section id="approach" class="section-pad section-approach">
    <div class="approach-bg"></div>
    <div class="container">
      <div class="approach-grid">
        <div class="approach-left">
          <div class="label reveal">Notre méthode citoyenne</div>
          <div class="gold-rule" style="margin: 1rem 0 1.5rem"></div>
          <h2 class="section-title reveal reveal-delay-1">De l'éveil à l'<em>impact</em>.</h2>
          <p class="reveal reveal-delay-2 approach-text">
            Notre méthode transforme l'énergie de la jeunesse en discipline collective: comprendre
            les vulnérabilités, former des responsables, agir sur le terrain et construire une
            valeur économique et sociale durable.
          </p>
        </div>
        <div class="approach-steps reveal reveal-delay-2">
          <article v-for="(s, i) in steps" :key="i" class="approach-step">
            <div class="step-num">{{ s.num }}</div>
            <div class="step-content">
              <h4>{{ s.title }}</h4>
              <p>{{ s.text }}</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section id="international" class="section-pad">
    <div class="container">
      <div class="intl-header">
        <div class="label reveal">Portée nationale et internationale</div>
        <h2 class="section-title reveal reveal-delay-1">
          Une <em>passerelle</em> entre terrain, diaspora et institutions.
        </h2>
        <p class="reveal reveal-delay-2" style="padding: 0 18rem">
          Association à portée nationale et internationale, Vu du Cameroun existe depuis 2023.
          Ancrés au Cameroun, ouverts aux espaces CEMAC, Union Africaine et diaspora, nous
          faisons circuler les compétences, les idées et les partenariats utiles à la jeunesse.
        </p>
      </div>
      <div class="map-container reveal">
        <div class="map-svg-wrap">
          <img
            src="/images/world.svg"
            alt="Carte stratégique mondiale"
            class="world-map world-map-image"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="intl-stats">
          <div v-for="(s, i) in intlStats" :key="i" class="intl-stat">
            <span class="intl-stat-num">{{ s.num }}</span>
            <span class="intl-stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="publications" class="section-pad section-dark">
    <div class="container">
      <div class="pub-header">
        <div>
          <div class="label reveal">Notes & publications</div>
          <div class="gold-rule" style="margin: 1rem 0 1.5rem"></div>
          <h2 class="section-title reveal reveal-delay-1">
            L'engagement au service de l'<em>intérêt général</em>.
          </h2>
        </div>
        <a href="/notes" class="pub-all-link reveal">
          <span>Voir les chantiers</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
        </a>
      </div>
      <div class="pub-grid reveal">
        <article
          v-for="(p, i) in publications"
          :key="i"
          class="pub-card"
          :class="{ featured: p.featured }"
        >
          <div class="pub-image">
            <img :src="p.image" :alt="p.title" loading="lazy" decoding="async" />
          </div>
          <div class="pub-tag">{{ p.tag }}</div>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
          <div class="pub-meta">
            <span class="pub-date">{{ p.date }}</span>
            <a :href="`/notes/${p.slug}`" class="pub-read">
              <span>Explorer</span>
              <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="partners" class="section-pad">
    <div class="container">
      <div class="partners-header">
        <div class="partners-kicker reveal">
          <span class="partners-kicker-dot" aria-hidden="true"></span>
          <div class="label">Réseaux utiles</div>
          <span class="partners-kicker-ring" aria-hidden="true"></span>
        </div>
        <h2 class="section-title partners-title reveal reveal-delay-1">
          <span>Un front d'<em>alliances</em></span><span>citoyennes.</span>
        </h2>
        <p class="partners-intro reveal reveal-delay-2">
          Nous fédérons institutions, collectivités, acteurs économiques, société civile et
          diaspora autour d'une même priorité: donner aux jeunes des cadres d'action crédibles.
        </p>
      </div>
      <div class="partners-categories reveal">
        <article v-for="(c, i) in partnerCats" :key="i" class="partner-cat">
          <div class="partner-cat-icon" v-html="`<svg viewBox='0 0 24 24'>${c.icon}</svg>`"></div>
          <h4>{{ c.title }}</h4>
          <p>{{ c.text }}</p>
        </article>
      </div>
      <div class="partner-logos reveal">
        <div v-for="(logo, i) in partnerLogos" :key="i" class="partner-logo">
          <span>{{ logo }}</span>
        </div>
      </div>
    </div>
  </section>

  <section id="cta-final" class="section-pad section-cta">
    <div class="cta-bg-text" aria-hidden="true">VDC</div>
    <div class="container">
      <div class="cta-inner">
        <div class="label reveal">Rejoignez la dynamique</div>
        <div class="gold-rule" style="margin: 1.5rem auto; display: block"></div>
        <h2 class="section-title reveal reveal-delay-1">
          Construisons le réel<br />avec la <em>jeunesse</em>.
        </h2>
        <p class="reveal reveal-delay-2">
          Vous êtes jeune leader, bénévole, formateur, entrepreneur, responsable communautaire,
          institution ou partenaire. Rejoignez une dynamique d'éthique, de service et d'impact.
        </p>
        <div class="cta-actions reveal reveal-delay-3">
          <RouterLink to="/contact" class="btn-primary">Nous rejoindre</RouterLink>
          <RouterLink to="/contact" class="btn-ghost">Porter un projet</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero,
.site-shell {
  min-height: 100vh;
}

.hero {
  align-items: center;
  background: var(--black);
  display: flex;
  overflow: hidden;
  position: relative;
}

.hero-bg {
  background:
    linear-gradient(115deg, rgba(201, 168, 76, 0.11), transparent 32%),
    linear-gradient(245deg, rgba(138, 110, 50, 0.08), transparent 34%),
    linear-gradient(180deg, rgba(201, 168, 76, 0.08), transparent 72%);
}

.hero-bg,
.hero-grid {
  inset: 0;
  position: absolute;
}

.hero-grid {
  background-image:
    linear-gradient(var(--white-faint) 1px, transparent 1px),
    linear-gradient(90deg, var(--white-faint) 1px, transparent 1px),
    linear-gradient(135deg, transparent 0 48%, rgba(201, 168, 76, 0.08) 48% 49%, transparent 49%),
    linear-gradient(45deg, transparent 0 51%, rgba(138, 110, 50, 0.07) 51% 52%, transparent 52%);
  background-size: 80px 80px;
  opacity: 0.08;
}

.hero-inner {
  align-items: center;
  display: grid;
  gap: 5rem;
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 0.85fr);
  position: relative;
  width: 100%;
  z-index: 2;
}

.hero-content {
  padding: 8rem 0 6rem;
}

.hero-eyebrow {
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.hero-eyebrow-line {
  background: linear-gradient(90deg, var(--green), var(--gold), var(--red));
  height: 1px;
  width: 44px;
}

.hero-title {
  font-size: clamp(3rem, 5.2vw, 6.2rem);
  font-weight: 300;
  letter-spacing: 0;
  line-height: 0.98;
  margin: 0 0 2rem;
}

.hero-title em {
  color: var(--gold);
  font-style: italic;
}

.about-text,
.approach-text,
.cta-inner p,
.hero-subtitle,
.intl-header p,
.partner-cat p,
.pub-card p {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.85;
}

.hero-subtitle {
  margin-bottom: 3rem;
  max-width: 620px;
}

.cta-actions,
.hero-actions {
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  justify-content: center;
}

.hero-slogan {
  border-top: 1px solid var(--gold-line);
  margin-top: 4rem;
  padding-top: 2rem;
}

.hero-slogan p {
  color: var(--gold-dim);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  margin: 0;
}

.hero-visual {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
}

.hero-globe-wrap {
  height: 580px;
  perspective: 1200px;
  position: relative;
  width: 580px;
}

.hero-globe-wrap::before,
.hero-globe-wrap::after {
  animation: rotateBorder 12s linear infinite;
  border: 1px solid var(--gold-line);
  border-radius: 50%;
  content: '';
  inset: 0;
  position: absolute;
}

.hero-globe-wrap::after {
  animation-direction: reverse;
  border-color: #c9a84c1a;
  inset: -20px;
}

@keyframes rotateBorder {
  to {
    transform: rotate(1turn);
  }
}

.globe-svg-container {
  align-items: center;
  background: radial-gradient(circle at 35% 35%, #1a1a1a, #080808);
  border: 1px solid var(--gold-line);
  border-radius: 50%;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  position: relative;
  transform-style: preserve-3d;
  width: 100%;
}

.hero-brand-image {
  display: block;
  filter: saturate(0.9) brightness(0.98);
  height: 98%;
  object-fit: contain;
  object-position: center center;
  width: 98%;
}

.globe-overlay {
  background: radial-gradient(circle at 30% 30%, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
  border-radius: 50%;
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.hero-stat-row {
  background:
    linear-gradient(90deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.06), rgba(138, 110, 50, 0.07)),
    var(--black-3);
  border: 1px solid var(--gold-line);
  bottom: -2.75rem;
  display: flex;
  gap: 3rem;
  left: 50%;
  padding: 1.5rem 2.5rem;
  position: absolute;
  transform: translate(-50%);
  width: max-content;
}

.hero-stat {
  text-align: center;
}

.hero-stat-num {
  color: var(--gold);
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
}

.hero-stat-label {
  color: var(--grey-light);
  font-family: 'Syne', sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.scroll-hint {
  align-items: center;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  left: 50%;
  position: absolute;
  transform: translate(-50%);
  z-index: 10;
}

.scroll-hint span {
  color: var(--grey-mid);
  font-family: 'Syne', sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.scroll-line {
  animation: scrollDrop 1.8s ease-in-out infinite;
  background: linear-gradient(to bottom, var(--gold), transparent);
  height: 40px;
  width: 1px;
}

@keyframes scrollDrop {
  0% {
    transform: scaleY(0);
    transform-origin: top;
  }
  50% {
    transform: scaleY(1);
    transform-origin: top;
  }
  51% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
  to {
    transform: scaleY(0);
    transform-origin: bottom;
  }
}

.ticker-bar {
  background: linear-gradient(90deg, var(--green), var(--gold), var(--red));
  overflow: hidden;
  padding: 0.65rem 0;
}

.ticker-inner {
  animation: ticker 40s linear infinite;
  display: flex;
  white-space: nowrap;
}

.ticker-item {
  align-items: center;
  color: var(--black);
  display: flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  gap: 2rem;
  letter-spacing: 0.25em;
  padding: 0 3rem;
  text-transform: uppercase;
}

.ticker-dot {
  background: currentColor;
  border-radius: 50%;
  flex-shrink: 0;
  height: 4px;
  width: 4px;
}

@keyframes ticker {
  0% {
    transform: translate(0);
  }
  to {
    transform: translate(-50%);
  }
}

.about-grid,
.approach-grid {
  align-items: center;
  display: grid;
  gap: 8rem;
}

.about-grid {
  grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.15fr);
}

.about-left {
  position: relative;
}

.about-num {
  color: #c9a84c0d;
  font-family: 'Cormorant Garamond', serif;
  font-size: 18rem;
  font-weight: 300;
  left: -3rem;
  line-height: 1;
  pointer-events: none;
  position: absolute;
  top: -4rem;
}

.section-title {
  font-size: clamp(2.35rem, 3.4vw, 4.1rem);
  font-weight: 300;
  letter-spacing: 0;
  line-height: 1.1;
}

.section-title em {
  color: var(--gold);
  font-style: italic;
}

.about-cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}

.about-card,
.domain-card,
.partner-cat,
.pub-card {
  background:
    linear-gradient(180deg, rgba(245, 242, 236, 0.018), transparent 42%),
    var(--black-3);
  border: 1px solid var(--grey-dark);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
}

.about-card {
  padding: 2rem;
}

.about-card::before {
  background: linear-gradient(180deg, var(--green), var(--gold), var(--red));
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s;
  width: 2px;
}

.about-card:hover::before {
  transform: scaleY(1);
}

.domain-card::before,
.partner-cat::before,
.pub-card::before {
  background: linear-gradient(90deg, var(--green), var(--gold), var(--red));
  content: '';
  height: 2px;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.3s;
}

.domain-card:hover::before,
.partner-cat:hover::before,
.pub-card:hover::before {
  opacity: 1;
}

.about-card-icon {
  height: 32px;
  margin-bottom: 1rem;
  width: 32px;
}

.about-card-icon svg,
.domain-icon svg,
.domain-link svg,
.partner-cat-icon svg,
.pub-all-link svg,
.pub-read svg,
.step-arrow svg {
  fill: none;
  height: 100%;
  stroke: var(--gold);
  stroke-width: 1.5;
  width: 100%;
}

.about-card h4,
.domain-card h3,
.partner-cat h4 {
  color: var(--white);
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.about-card p,
.approach-step p,
.domain-card p,
.partner-cat p {
  color: var(--white-dim);
  line-height: 1.75;
  margin: 0;
}

.domains-header,
.intl-header,
.partners-header {
  margin-bottom: 5rem;
  text-align: center;
}

.domains-header .section-title,
.intl-header .section-title,
.partners-header .section-title {
  margin: 1rem auto 0;
  max-width: 700px;
}

.partners-header .section-title {
  max-width: 620px;
}

.partners-kicker {
  margin: 0 auto;
  position: relative;
  width: fit-content;
}

.partners-kicker .label {
  position: relative;
  z-index: 1;
}

.partners-kicker-dot {
  background: var(--gold);
  border-radius: 50%;
  height: 14px;
  left: -0.9rem;
  position: absolute;
  top: 0.55rem;
  width: 14px;
}

.partners-kicker-ring {
  border: 1px solid rgba(201, 168, 76, 0.28);
  border-radius: 50%;
  height: 56px;
  position: absolute;
  right: -1.2rem;
  top: -0.1rem;
  width: 56px;
}

.partners-title {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: none;
}

.partners-title span {
  display: block;
}

.partners-title span:first-child {
  white-space: nowrap;
}

.partners-intro {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.35;
  margin: 1.4rem auto 0;
  max-width: 1180px;
  padding: 0 20rem;
  text-align: center;
}

.domains-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.domain-card {
  padding: 2.6rem 2rem;
  transition: background 0.4s;
}

.domain-card:hover {
  background:
    linear-gradient(180deg, rgba(201, 168, 76, 0.04), rgba(201, 168, 76, 0.025), rgba(138, 110, 50, 0.035)),
    var(--black-2);
}

.domain-num {
  color: #c9a84c26;
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  line-height: 1;
  margin-bottom: 2rem;
}

.domain-icon {
  height: 28px;
  margin-bottom: 1.5rem;
  width: 28px;
}

.domain-link {
  align-items: center;
  color: var(--gold);
  display: inline-flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  gap: 0.5rem;
  letter-spacing: 0.2em;
  margin-top: 2rem;
  text-transform: uppercase;
}

.domain-link svg {
  height: 12px;
  transition: transform 0.3s;
  width: 12px;
}

.domain-card:hover .domain-link svg,
.pub-read:hover svg {
  transform: translate(4px);
}

.section-approach {
  background:
    linear-gradient(110deg, rgba(201, 168, 76, 0.055), transparent 35%),
    linear-gradient(250deg, rgba(138, 110, 50, 0.045), transparent 34%),
    var(--black-3);
  overflow: hidden;
  position: relative;
}

.approach-bg {
  background:
    repeating-linear-gradient(90deg, rgba(201, 168, 76, 0.08) 0 1px, transparent 1px 26px),
    repeating-linear-gradient(0deg, rgba(245, 242, 236, 0.035) 0 1px, transparent 1px 26px);
  border: 1px solid rgba(201, 168, 76, 0.06);
  border-radius: 0;
  height: 600px;
  inset: 50% auto auto 50%;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 600px;
}

.approach-grid {
  align-items: start;
  gap: 6rem;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 2;
}

.approach-steps {
  padding-top: 3.75rem;
}

.approach-step {
  border-bottom: 1px solid rgba(201, 168, 76, 0.16);
  display: flex;
  gap: 2rem;
  padding: 2.5rem 0;
  position: relative;
}

.approach-step:first-child {
  padding-top: 0;
}

.approach-step:last-child {
  border-bottom: none;
}

.step-num {
  color: var(--gold-dim);
  flex-shrink: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  padding-top: 0.25rem;
}

.pub-tag,
.step-content h4 {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.step-arrow {
  height: 18px;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s;
  width: 18px;
}

.approach-step:hover .step-arrow {
  opacity: 1;
}

.step-arrow svg {
  height: 18px;
  stroke-width: 2;
  width: 18px;
}

.map-container {
  background:
    linear-gradient(90deg, rgba(201, 168, 76, 0.04), transparent 40%, rgba(138, 110, 50, 0.04)),
    var(--black-3);
  border: 1px solid var(--gold-line);
  overflow: hidden;
}

.map-svg-wrap {
  background: #0f0f0f;
}

.world-map {
  background: #0f0f0f;
  display: block;
  width: 100%;
}

.world-map-image {
  display: block;
  height: auto;
  width: 100%;
}

.intl-stats {
  border-top: 1px solid var(--grey-dark);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.intl-stat {
  background: var(--black-3);
  border-right: 1px solid var(--grey-dark);
  padding: 2.5rem;
  text-align: center;
}

.intl-stat:last-child {
  border-right: none;
}

.intl-stat-num {
  color: var(--gold);
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  margin-bottom: 0.25rem;
}

.intl-stat-label {
  color: var(--grey-light);
  font-family: 'Syne', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.pub-header {
  align-items: flex-end;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 4rem;
}

.pub-header .section-title {
  max-width: 760px;
  padding: 0;
}

.pub-all-link {
  align-items: center;
  color: var(--gold);
  display: inline-flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  gap: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.pub-all-link svg,
.pub-read svg {
  height: 14px;
  stroke: currentColor;
  width: 14px;
}

.pub-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pub-card {
  padding: 1.25rem;
}

.pub-image {
  background:
    linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.08), rgba(138, 110, 50, 0.07)),
    var(--black-2);
  border: 1px solid var(--gold-line);
  aspect-ratio: 16 / 10;
  height: auto;
  margin: 0 0 1.5rem;
  overflow: hidden;
}

.pub-image img {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0.78;
  transition: opacity 0.3s ease, transform 0.4s ease;
  width: 100%;
}

.pub-card:hover .pub-image img {
  opacity: 0.95;
  transform: scale(1.04);
}

.pub-card.featured {
  background:
    linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.1), rgba(138, 110, 50, 0.07)),
    #0f0f0fcc;
}

.pub-card h3 {
  font-size: 1.35rem;
  line-height: 1.35;
  margin-bottom: 1rem;
}

.pub-meta {
  align-items: center;
  border-top: 1px solid var(--grey-dark);
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.25rem;
}

.pub-date {
  color: var(--grey-light);
}

.pub-date,
.pub-read {
  font-family: 'Syne', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.pub-read {
  align-items: center;
  color: var(--gold);
  display: inline-flex;
  font-weight: 700;
  gap: 0.5rem;
}

.partners-categories {
  border: 1px solid var(--grey-dark);
  display: grid;
  gap: 0;
  grid-template-columns: repeat(3, 1fr);
}

.partner-cat {
  padding: 2.4rem;
}

.partner-cat-icon {
  height: 28px;
  margin-bottom: 1.5rem;
  width: 28px;
}

.partner-logos {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 1.5rem;
}

.partner-logo {
  background:
    linear-gradient(180deg, rgba(201, 168, 76, 0.035), transparent),
    var(--black-3);
  border: 1px solid var(--grey-dark);
  padding: 1.25rem 1rem;
  text-align: center;
}

.partner-logo span {
  color: var(--grey-light);
  font-family: 'Syne', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.section-cta {
  background:
    linear-gradient(120deg, rgba(201, 168, 76, 0.06), transparent 36%),
    linear-gradient(240deg, rgba(138, 110, 50, 0.05), transparent 34%);
  overflow: hidden;
  position: relative;
  text-align: center;
}

.cta-bg-text {
  color: #c9a84c0a;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(12rem, 30vw, 24rem);
  inset: 50% auto auto 50%;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -50%);
}

.cta-inner {
  margin: 0 auto;
  max-width: 760px;
  text-align: center;
}

.cta-inner .section-title {
  margin-bottom: 1.5rem;
}

.cta-inner p {
  margin: 0 auto 2rem;
  max-width: 720px;
}

@media (max-width: 1080px) {
  .intl-header p,
  .partners-intro,
  .pub-header .section-title {
    padding: 0 !important;
  }

}
</style>
