<script setup lang="ts">
import { onMounted } from 'vue'
import { useReveal } from '../composables/useReveal'

const { observe } = useReveal()
onMounted(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
})

const manifestoNav = [
  { id: '#genese', label: 'Genèse' },
  { id: '#vision', label: 'Vision' },
  { id: '#mission', label: 'Mission' },
  { id: '#positionnement', label: 'Positionnement' },
]

const blocks = [
  {
    id: 'genese',
    num: '01',
    tag: 'Genèse',
    title: "Une réponse à l'urgence de <em>penser</em> le Cameroun depuis l'intérieur.",
    paragraphs: [
      "Vu du Cameroun est née d'un constat: le pays dispose d'un potentiel stratégique considérable, mais ce potentiel reste insuffisamment articulé, visible et défendu.",
      "Face à un monde en mutation rapide, il devenait impératif de créer un espace de réflexion autonome, endogène, tourné vers l'excellence et l'action.",
    ],
    quote: { text: "Il ne suffit pas d'être. Il faut se donner les moyens d'être perçu, écouté, choisi.", cite: 'Fondateurs de Vu du Cameroun' },
  },
  {
    id: 'vision',
    num: '02',
    tag: 'Vision',
    title: 'Un Cameroun <em>souverain</em>, influent et maître de son récit.',
    paragraphs: [
      "Nous voyons un Cameroun qui ne subit plus l'agenda des autres, mais qui contribue à le définir.",
      "Notre vision est celle d'une nation qui apprend à se penser elle-même avec rigueur, à se positionner avec audace et à s'engager depuis une posture de force.",
    ],
  },
  {
    id: 'mission',
    num: '03',
    tag: 'Mission',
    title: 'Produire, connecter et <em>catalyser</em>.',
    paragraphs: [
      "<strong>Produire:</strong> des analyses stratégiques et des recommandations politiques fondées sur des données rigoureuses.",
      "<strong>Connecter:</strong> les décideurs aux idées, les institutions aux expertises, le Cameroun à ses partenaires stratégiques mondiaux.",
      "<strong>Catalyser:</strong> des initiatives concrètes, des réformes et des partenariats durables qui transforment l'analyse en action.",
    ],
  },
  {
    id: 'positionnement',
    num: '04',
    tag: 'Positionnement',
    title: "À l'intersection du think tank et du réseau d'<em>influence</em>.",
    paragraphs: [
      "Vu du Cameroun occupe un espace stratégique singulier: une entité hybride qui conjugue la rigueur analytique et la puissance opérationnelle.",
      "Nous sommes également une passerelle entre le Cameroun et le monde francophone, entre l'Afrique centrale et les institutions financières internationales.",
    ],
  },
]

const values = [
  { title: 'Intégrité analytique', text: "Nos analyses sont rigoureuses, indépendantes et fondées sur des données vérifiables.", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>' },
  { title: 'Souveraineté de pensée', text: "Nous pensons le Cameroun depuis le Cameroun avec des cadres d'analyse endogènes.", icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path>' },
  { title: 'Excellence sans compromis', text: "L'excellence est une exigence intérieure que nous nous imposons dans tout ce que nous produisons.", icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>' },
  { title: 'Action stratégique', text: "Chaque initiative est conçue pour produire des effets mesurables.", icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>' },
  { title: 'Intelligence collective', text: "Nous cultivons le dialogue et la confrontation d'expertises plurielles.", icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>' },
  { title: 'Ancrage et ouverture', text: "Enracinés dans la réalité camerounaise, ouverts sur le monde.", icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>' },
]

const pillars = [
  { num: '01', title: 'Indépendance institutionnelle', text: "Nous n'appartenons à aucun parti, à aucun gouvernement, à aucun groupe financier." },
  { num: '02', title: 'Expertise pluridisciplinaire', text: "Économistes, juristes, géopolitologues et diplomates composent notre réseau." },
  { num: '03', title: 'Présence internationale', text: 'Des correspondants et partenaires dans 27 pays sur cinq continents.' },
  { num: '04', title: 'Impact mesurable', text: "Chaque programme est évalué à l'aune de son impact réel." },
]

const tags = ['Think Tank', "Réseau d'influence", 'Diplomatie parallèle', 'Policy Research', 'Leadership Formation', 'Partenariats stratégiques']

const figures = [
  { num: '27+', strong: 'Pays partenaires', span: '5 continents' },
  { num: '150+', strong: 'Experts mobilisés', span: 'Réseau actif' },
  { num: '48', strong: 'Publications', span: 'Analyses & rapports' },
  { num: '12', strong: 'Initiatives lancées', span: 'Depuis 2020' },
]

const team = [
  { initials: 'JB', name: 'Jean-Baptiste Mbarga', role: 'Président fondateur', text: "Économiste et stratège, ancien conseiller auprès d'institutions multilatérales." },
  { initials: 'AM', name: 'Amina Moussa-Ngo', role: 'Directrice générale', text: 'Spécialiste des relations internationales et de la diplomatie économique.' },
  { initials: 'PK', name: 'Paul Kamdem', role: 'Dir. Recherche & Analyses', text: 'Docteur en sciences politiques, spécialiste de la gouvernance en Afrique centrale.' },
  { initials: 'SE', name: 'Sophie Engamba', role: 'Dir. Partenariats internationaux', text: 'Experte en investissements stratégiques et en partenariats public-privé.' },
]

const engagements = [
  { title: 'Membres du réseau', text: "Intégrez un cercle d'excellence et accédez à nos analyses et espaces de dialogue.", icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>' },
  { title: 'Partenaires institutionnels', text: "Co-construisez des initiatives stratégiques et un accès privilégié à notre réseau.", icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>' },
  { title: 'Investisseurs stratégiques', text: "Orientez vos investissements avec la profondeur d'analyse d'experts.", icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>' },
  { title: 'Talents & jeunes leaders', text: 'Nous structurons une nouvelle génération de décideurs.', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>' },
]
</script>

<template>
  <main class="about-page">
    <section id="about" class="about-hero section-pad">
      <div class="about-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="about-hero-breadcrumb reveal">
          <RouterLink to="/">Accueil</RouterLink>
          <span>›</span>
          <span class="current">À propos</span>
        </div>
        <div class="about-hero-layout">
          <div>
            <div class="label reveal">À propos</div>
            <h1 class="about-hero-title reveal reveal-delay-1">
              Une institution stratégique<br />
              <em>pour penser</em> le Cameroun.
            </h1>
          </div>
          <div>
            <p class="about-hero-desc reveal reveal-delay-2">
              Vu du Cameroun réunit la rigueur d'un think tank africain, la puissance d'un
              réseau d'influence et la capacité d'action d'une passerelle vers les partenaires
              internationaux.
            </p>
            <div class="about-hero-stats reveal reveal-delay-3">
              <div><span>Think tank</span><strong>Africain</strong></div>
              <div><span>Réseau</span><strong>Stratégique</strong></div>
              <div><span>Passerelle</span><strong>Internationale</strong></div>
              <div><span>Ancrage</span><strong>Cameroun</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="manifeste" class="section-pad section-dark">
      <div class="container">
        <div class="about-manifesto-layout">
          <aside class="about-manifesto-sidebar reveal">
            <span class="label">Notre manifeste</span>
            <nav class="about-manifesto-nav" aria-label="Sections À propos">
              <a v-for="(item, i) in manifestoNav" :key="i" :href="item.id">{{ item.label }}</a>
            </nav>
          </aside>
          <div class="about-manifesto-content">
            <article
              v-for="(block, i) in blocks"
              :key="i"
              :id="block.id"
              class="about-block reveal"
            >
              <div class="about-block-header">
                <span>{{ block.num }}</span>
                <div></div>
                <em>{{ block.tag }}</em>
              </div>
              <h2 v-html="block.title"></h2>
              <p v-for="(p, j) in block.paragraphs" :key="j" v-html="p"></p>
              <blockquote v-if="block.quote">
                <p>{{ block.quote.text }}</p>
                <cite>{{ block.quote.cite }}</cite>
              </blockquote>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="valeurs" class="section-pad">
      <div class="container">
        <div class="about-heading reveal">
          <div class="gold-rule"></div>
          <span class="label">Nos valeurs fondatrices</span>
          <h2>Ce qui nous <em>définit</em> et nous distingue.</h2>
        </div>
        <div class="about-values-grid reveal reveal-delay-1">
          <article v-for="(v, i) in values" :key="i" class="about-value-card">
            <div class="about-value-icon" v-html="`<svg viewBox='0 0 24 24'>${v.icon}</svg>`"></div>
            <h3>{{ v.title }}</h3>
            <p>{{ v.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="adn" class="section-pad section-dark">
      <div class="container">
        <div class="about-adn-grid reveal">
          <div class="about-adn-left">
            <div class="about-adn-glow" aria-hidden="true"></div>
            <span class="label">Notre ADN stratégique</span>
            <h2>Ce qui rend notre <em>approche</em> unique.</h2>
            <p>
              Notre architecture opérationnelle combine la rigueur académique, l'intelligence
              du terrain, la puissance du réseau et la capacité d'action directe.
            </p>
            <p>
              Cette combinaison fait de nous un partenaire stratégique de premier ordre pour
              les institutions, les gouvernements et les investisseurs.
            </p>
            <div class="about-tags">
              <span v-for="(tag, i) in tags" :key="i">{{ tag }}</span>
            </div>
          </div>
          <div class="about-adn-right">
            <article v-for="(p, i) in pillars" :key="i" class="about-pillar">
              <div class="about-pillar-num">{{ p.num }}</div>
              <div class="about-pillar-body">
                <h4>{{ p.title }}</h4>
                <p>{{ p.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="chiffres" class="section-pad">
      <div class="container">
        <div class="about-heading reveal">
          <div class="gold-rule"></div>
          <span class="label">Chiffres clés</span>
          <h2>Nos repères d'<em>impact</em>.</h2>
        </div>
        <div class="about-figures-grid reveal reveal-delay-1">
          <article v-for="(f, i) in figures" :key="i" class="about-figure">
            <span class="about-figure-num">{{ f.num }}</span>
            <strong>{{ f.strong }}</strong>
            <span>{{ f.span }}</span>
          </article>
        </div>
      </div>
    </section>

    <section id="equipe" class="section-pad section-dark">
      <div class="container">
        <div class="about-heading reveal">
          <div class="gold-rule"></div>
          <span class="label">Notre équipe dirigeante</span>
          <h2>Les architectes d'une <em>vision</em>.</h2>
          <p>
            Un collectif d'élites engagées, unies par la conviction que le Cameroun mérite une
            institution à la hauteur de son potentiel.
          </p>
        </div>
        <div class="about-team-grid reveal reveal-delay-1">
          <article v-for="(m, i) in team" :key="i" class="about-team-card">
            <div class="about-avatar">
              <span>{{ m.initials }}</span>
              <div class="about-avatar-ring"></div>
            </div>
            <h3>{{ m.name }}</h3>
            <p class="about-role">{{ m.role }}</p>
            <p>{{ m.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="engagement" class="section-pad">
      <div class="container">
        <div class="about-engagement-grid reveal">
          <div class="about-engagement-left">
            <span class="label">Rejoindre le cercle</span>
            <h2>Construisons <em>ensemble</em>.</h2>
            <p>
              Vous êtes décideur, intellectuel, entrepreneur, diplomate ou investisseur. Votre
              place est ici.
            </p>
            <div class="about-engagement-actions">
              <a href="mailto:contact@vuducameroun.org" class="btn-primary">Nous rejoindre</a>
              <a href="mailto:partenariat@vuducameroun.org" class="btn-ghost">Proposer un partenariat</a>
            </div>
          </div>
          <div class="about-engagement-right">
            <article v-for="(e, i) in engagements" :key="i" class="about-engagement-item">
              <div class="about-engagement-icon" v-html="`<svg viewBox='0 0 24 24'>${e.icon}</svg>`"></div>
              <div class="about-engagement-body">
                <h4>{{ e.title }}</h4>
                <p>{{ e.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  background: var(--black);
}

.about-hero {
  align-items: flex-end;
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}

.about-hero-bg {
  background: radial-gradient(circle at 72% 40%, rgba(201, 168, 76, 0.08), transparent 45%),
    radial-gradient(circle at 18% 18%, rgba(201, 168, 76, 0.05), transparent 36%);
  inset: 0;
  position: absolute;
}

.about-hero-breadcrumb {
  align-items: center;
  display: flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.6rem;
  gap: 0.65rem;
  letter-spacing: 0.18em;
  margin-bottom: 3rem;
  position: relative;
  text-transform: uppercase;
  z-index: 1;
}

.about-hero-breadcrumb a,
.about-hero-breadcrumb span {
  color: var(--grey-mid);
  text-decoration: none;
}

.about-hero-breadcrumb .current {
  color: var(--gold);
}

.about-hero-layout {
  align-items: end;
  display: grid;
  gap: 4rem;
  grid-template-columns: 1.15fr 0.85fr;
  padding-bottom: 5rem;
  position: relative;
  z-index: 1;
}

.about-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3.4rem, 7vw, 7.8rem);
  font-weight: 300;
  letter-spacing: -0.025em;
  line-height: 0.98;
  margin: 1rem 0 0;
}

.about-adn-left em,
.about-engagement-left em,
.about-heading em,
.about-hero-title em {
  color: var(--gold);
  font-style: italic;
}

.about-hero-desc {
  color: var(--white-dim);
  font-size: 1.05rem;
  line-height: 1.85;
  margin: 0 0 2rem;
}

.about-hero-stats {
  border: 1px solid var(--grey-dark);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.about-hero-stats > div {
  border-bottom: 1px solid var(--grey-dark);
  border-right: 1px solid var(--grey-dark);
  padding: 1.4rem 1.6rem;
}

.about-hero-stats > div:last-child,
.about-hero-stats > div:nth-child(2n) {
  border-right: none;
}

.about-hero-stats > div:nth-last-child(-n + 2) {
  border-bottom: none;
}

.about-hero-stats span {
  color: var(--grey-light);
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.about-hero-stats strong {
  color: var(--gold);
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 400;
  margin-top: 0.35rem;
}

.about-adn-grid,
.about-engagement-grid,
.about-manifesto-layout {
  display: grid;
  gap: 5rem;
  grid-template-columns: 260px 1fr;
}

.about-manifesto-sidebar {
  align-self: start;
  background: linear-gradient(180deg, #c9a84c08, #141414a6);
  border: 1px solid var(--grey-dark);
  box-shadow: 0 24px 60px #0000003d;
  padding: 2rem 1.75rem;
  position: sticky;
  top: 7rem;
}

.about-manifesto-nav {
  display: flex;
  flex-direction: column;
  margin-top: 1.35rem;
}

.about-manifesto-nav a {
  border-bottom: 1px solid var(--grey-dark);
  color: var(--grey-mid);
  font-family: 'Syne', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  padding: 1rem 0;
  text-decoration: none;
  text-transform: uppercase;
}

.about-manifesto-nav a:hover {
  color: var(--gold);
}

.about-manifesto-nav a:first-child {
  padding-top: 0.2rem;
}

.about-manifesto-content {
  min-width: 0;
}

.about-block {
  margin-bottom: 5rem;
}

.about-block:last-child {
  margin-bottom: 0;
}

.about-block-header {
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-bottom: 2.2rem;
}

.about-block-header span {
  color: var(--gold-dim);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
}

.about-block-header div {
  background: var(--grey-dark);
  flex: 1;
  height: 1px;
}

.about-block-header em {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.64rem;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.about-block h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 3.5vw, 3.4rem);
  font-weight: 300;
  line-height: 1.12;
  margin: 0 0 1.5rem;
}

.about-adn-left p,
.about-block p,
.about-engagement-left p,
.about-heading p {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.9;
}

.about-block blockquote {
  border-left: 2px solid var(--gold);
  margin: 2rem 0;
  padding: 1.3rem 0 1.3rem 1.8rem;
}

.about-block blockquote p {
  color: var(--white);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.55rem;
  font-style: italic;
  margin: 0;
}

.about-block blockquote cite {
  color: var(--gold-dim);
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-style: normal;
  letter-spacing: 0.18em;
  margin-top: 0.7rem;
  text-transform: uppercase;
}

.about-heading {
  margin-bottom: 3rem;
  max-width: 760px;
}

.about-heading h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 4vw, 4rem);
  font-weight: 300;
  line-height: 1.1;
  margin: 0.9rem 0 0;
}

.about-values-grid {
  border: 1px solid var(--grey-dark);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.about-value-card {
  border-bottom: 1px solid var(--grey-dark);
  border-right: 1px solid var(--grey-dark);
  padding: 2.75rem 2.25rem;
}

.about-value-card:last-child,
.about-value-card:nth-child(3n) {
  border-right: none;
}

.about-value-card:nth-last-child(-n + 3) {
  border-bottom: none;
}

.about-value-icon {
  align-items: center;
  border: 1px solid var(--gold-line);
  display: flex;
  height: 44px;
  justify-content: center;
  margin-bottom: 1.75rem;
  width: 44px;
}

.about-engagement-icon svg,
.about-value-icon svg {
  fill: none;
  height: 20px;
  stroke: var(--gold);
  stroke-width: 1.5;
  width: 20px;
}

.about-engagement-body h4,
.about-pillar-body h4,
.about-team-card h3,
.about-value-card h3 {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0 0 0.8rem;
  text-transform: uppercase;
}

.about-value-card p {
  color: var(--grey-light);
  font-size: 0.94rem;
  line-height: 1.8;
  margin: 0;
}

.about-adn-left {
  background: linear-gradient(180deg, rgba(201, 168, 76, 0.03), transparent 40%);
  border: 1px solid var(--grey-dark);
  border-right: none;
  overflow: hidden;
  padding: 4.5rem;
  position: relative;
}

.about-adn-left h2,
.about-engagement-left h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 3.4vw, 3.4rem);
  font-weight: 300;
  line-height: 1.15;
  margin: 1.2rem 0 1.6rem;
}

.about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2.2rem;
}

.about-tags span {
  border: 1px solid var(--gold-line);
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  padding: 0.35rem 0.85rem;
  text-transform: uppercase;
}

.about-adn-right {
  border: 1px solid var(--grey-dark);
  border-left: none;
}

.about-adn-grid {
  background: var(--black-2);
  border: 1px solid var(--grey-dark);
  gap: 0;
  grid-template-columns: 1fr 1fr;
}

.about-adn-glow {
  background: radial-gradient(circle, rgba(201, 168, 76, 0.08), transparent 70%);
  border-radius: 50%;
  bottom: -100px;
  height: 420px;
  left: -80px;
  pointer-events: none;
  position: absolute;
  width: 420px;
}

.about-pillar {
  border-bottom: 1px solid var(--grey-dark);
  display: flex;
  gap: 1.75rem;
  padding: 2.3rem 3rem;
}

.about-pillar:last-child {
  border-bottom: none;
}

.about-pillar-num {
  color: #c9a84c40;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.1rem;
  line-height: 1;
  min-width: 2.5rem;
}

.about-engagement-body p,
.about-pillar-body p,
.about-team-card p {
  color: var(--grey-light);
  font-size: 0.9rem;
  line-height: 1.75;
  margin: 0;
}

.about-figures-grid {
  border: 1px solid var(--grey-dark);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.about-figure {
  border-right: 1px solid var(--grey-dark);
  padding: 3rem 2rem;
  text-align: center;
}

.about-figure:last-child {
  border-right: none;
}

.about-figure-num {
  color: var(--gold);
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 5vw, 5rem);
  line-height: 1;
  margin-bottom: 0.35rem;
}

.about-figure span,
.about-figure strong {
  display: block;
  font-family: 'Syne', sans-serif;
  text-transform: uppercase;
}

.about-figure strong {
  color: var(--grey-light);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
}

.about-figure span {
  color: var(--grey-mid);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  margin-top: 0.35rem;
}

.about-team-grid {
  border: 1px solid var(--grey-dark);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.about-team-card {
  border-right: 1px solid var(--grey-dark);
  padding: 2.5rem;
}

.about-team-card:last-child {
  border-right: none;
}

.about-avatar {
  align-items: center;
  border: 1px solid var(--grey-dark);
  border-radius: 50%;
  display: flex;
  height: 70px;
  justify-content: center;
  margin-bottom: 1.4rem;
  position: relative;
  width: 70px;
}

.about-avatar span {
  color: var(--gold);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
}

.about-avatar-ring {
  border: 1px solid transparent;
  border-radius: 50%;
  inset: -4px;
  position: absolute;
}

.about-role {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.about-engagement-left {
  align-items: center;
  background: radial-gradient(circle at 20% 20%, rgba(201, 168, 76, 0.12), transparent 40%),
    linear-gradient(180deg, #c9a84c14, #141414c7);
  border: 1px solid var(--grey-dark);
  border-right: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 5rem 4.5rem;
  position: relative;
  text-align: center;
}

.about-engagement-left::before {
  border: 1px solid rgba(201, 168, 76, 0.08);
  content: '';
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.about-engagement-left .label {
  display: inline-flex;
  margin-bottom: 1rem;
}

.about-engagement-left h2 {
  margin-inline: auto;
  max-width: 9.5ch;
}

.about-engagement-left p {
  margin-inline: auto;
  max-width: 28ch;
}

.about-engagement-actions {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2.25rem;
  width: 100%;
}

.about-engagement-actions .btn-ghost,
.about-engagement-actions .btn-primary {
  white-space: nowrap;
  width: min(100%, 360px);
}

.about-engagement-right {
  border: 1px solid var(--grey-dark);
  border-left: none;
}

.about-engagement-item {
  background: #00000014;
  border-bottom: 1px solid var(--grey-dark);
  display: flex;
  gap: 1.4rem;
  padding: 2.2rem 3rem;
}

.about-engagement-grid {
  background: var(--black-2);
  border: 1px solid var(--grey-dark);
  gap: 0;
  grid-template-columns: minmax(360px, 0.42fr) minmax(0, 0.58fr);
}

.about-engagement-item:last-child {
  border-bottom: none;
}

.about-engagement-icon {
  align-items: center;
  border: 1px solid var(--gold-line);
  display: flex;
  flex: 0 0 auto;
  height: 36px;
  justify-content: center;
  width: 36px;
}

@media (max-width: 1100px) {
  .about-adn-grid,
  .about-engagement-grid,
  .about-hero-layout,
  .about-manifesto-layout {
    gap: 2.5rem;
    grid-template-columns: 1fr;
  }

  .about-manifesto-sidebar {
    position: static;
  }

  .about-figures-grid,
  .about-team-grid,
  .about-values-grid {
    grid-template-columns: 1fr 1fr;
  }

  .about-figure:nth-child(2n),
  .about-team-card:nth-child(2n),
  .about-value-card:nth-child(2n) {
    border-right: none;
  }

  .about-figure:nth-last-child(-n + 2),
  .about-team-card:nth-last-child(-n + 2),
  .about-value-card:nth-last-child(-n + 2) {
    border-bottom: none;
  }

  .about-adn-left,
  .about-engagement-left {
    border-right: 1px solid var(--grey-dark);
  }

  .about-adn-right,
  .about-engagement-right {
    border-left: 1px solid var(--grey-dark);
  }

  .about-adn-grid {
    grid-template-columns: 1fr;
  }

  .about-adn-left {
    border-bottom: 1px solid var(--grey-dark);
    border-right: 1px solid var(--grey-dark);
  }

  .about-adn-right {
    border-left: 1px solid var(--grey-dark);
  }

  .about-engagement-grid {
    grid-template-columns: 1fr;
  }

  .about-engagement-left {
    border-bottom: 1px solid var(--grey-dark);
    border-right: 1px solid var(--grey-dark);
  }

  .about-engagement-right {
    border-left: 1px solid var(--grey-dark);
  }
}

@media (max-width: 720px) {
  .about-adn-grid,
  .about-engagement-grid,
  .about-figures-grid,
  .about-hero-layout,
  .about-manifesto-layout,
  .about-team-grid,
  .about-values-grid {
    grid-template-columns: 1fr;
  }

  .about-hero-title {
    font-size: clamp(2.7rem, 13vw, 4.5rem);
  }

  .about-hero-stats {
    grid-template-columns: 1fr;
  }

  .about-figure,
  .about-hero-stats > div,
  .about-team-card,
  .about-value-card {
    border-right: none;
  }

  .about-engagement-item,
  .about-pillar {
    padding: 2rem 1.5rem;
  }

  .about-adn-left,
  .about-engagement-left {
    padding: 3rem 1.5rem;
  }

  .about-adn-grid {
    border-width: 1px;
  }

  .about-engagement-left h2 {
    max-width: 8.5ch;
  }

  .about-engagement-left p {
    max-width: 100%;
  }
}
</style>
