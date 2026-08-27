<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useReveal } from '../composables/useReveal'

const { observe } = useReveal()
onMounted(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
})

const networks = [
  {
    title: 'Pouvoirs publics & CTD',
    text: "Travailler avec les institutions et les collectivités territoriales autour d'actions complémentaires, lisibles et utiles aux jeunes.",
    roles: ['Orientation locale', 'Facilitation territoriale', 'Cadres de dialogue'],
  },
  {
    title: 'Acteurs économiques',
    text: "Relier entreprises, artisans, incubateurs, formateurs et investisseurs à des parcours d'insertion et de production locale.",
    roles: ['Stages et métiers', 'Mentorat', 'Projets productifs'],
  },
  {
    title: 'Société civile',
    text: 'Coopérer avec les associations, collectifs, communautés et relais sociaux qui connaissent les vulnérabilités du terrain.',
    roles: ['Mobilisation', 'Formation citoyenne', 'Actions communautaires'],
  },
  {
    title: 'Diaspora & espaces internationaux',
    text: 'Faire circuler compétences, ressources, idées et opportunités entre le Cameroun, la CEMAC, l’Afrique internationale et la diaspora.',
    roles: ['Expertise', 'Plaidoyer utile', 'Partenariats techniques'],
  },
]

const protocol = [
  'Identifier un besoin réel',
  'Clarifier le rôle de chaque acteur',
  'Agir sur un périmètre maîtrisé',
  'Documenter les résultats',
]
</script>

<template>
  <main class="networks-page">
    <section class="networks-hero section-pad">
      <div class="networks-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="networks-breadcrumb reveal">
          <RouterLink to="/">Accueil</RouterLink>
          <span>›</span>
          <span class="current">Réseaux</span>
        </div>
        <div class="networks-hero-grid">
          <div>
            <div class="label reveal">Alliances utiles</div>
            <h1 class="networks-title reveal reveal-delay-1">
              Des réseaux pour <em>relier</em> le terrain.
            </h1>
          </div>
          <div class="networks-hero-panel reveal reveal-delay-2">
            <p>
              Les réseaux de Vu du Cameroun ne sont pas des cercles d’influence fermés. Ce sont
              des passerelles de travail entre jeunes, institutions, communautés, acteurs économiques
              et diaspora.
            </p>
            <div class="networks-map">
              <span>Institutions</span>
              <span>Jeunesse</span>
              <span>Terrain</span>
              <span>Diaspora</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad networks-list-section">
      <div class="container">
        <div class="networks-heading reveal">
          <div class="gold-rule"></div>
          <span class="label">Cartographie relationnelle</span>
          <h2>Chaque réseau doit servir une action précise.</h2>
        </div>

        <div class="networks-grid">
          <article v-for="network in networks" :key="network.title" class="network-card reveal">
            <h3>{{ network.title }}</h3>
            <p>{{ network.text }}</p>
            <div class="network-roles">
              <span v-for="role in network.roles" :key="role">{{ role }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad networks-protocol-section section-dark">
      <div class="container">
        <div class="networks-protocol-grid">
          <div class="reveal">
            <span class="label">Protocole de coopération</span>
            <h2>Des partenariats sobres, traçables et orientés résultats.</h2>
            <p>
              Le réseau n’a de valeur que s’il débouche sur une formation, une insertion, une action
              communautaire, une ressource ou une opportunité concrète.
            </p>
          </div>
          <div class="protocol-list reveal reveal-delay-1">
            <div v-for="(item, index) in protocol" :key="item" class="protocol-row">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad networks-cta">
      <div class="container">
        <div class="networks-cta-inner reveal">
          <span class="label">Ouverture</span>
          <h2>Rejoindre un réseau, c’est apporter une capacité utile.</h2>
          <div class="networks-actions">
            <a href="mailto:partenariat@vuducameroun.org" class="btn-primary">Proposer un partenariat</a>
            <RouterLink to="/theatres" class="btn-ghost">Voir les théâtres</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.networks-page {
  background: var(--black);
  color: var(--white);
}

.networks-hero {
  background: var(--black);
  border-bottom: 1px solid var(--grey-dark);
  overflow: hidden;
  padding-top: 10rem;
  position: relative;
}

.networks-hero-bg {
  background:
    linear-gradient(120deg, rgba(31, 182, 109, 0.11), transparent 34%),
    linear-gradient(245deg, rgba(217, 58, 53, 0.08), transparent 36%),
    repeating-linear-gradient(90deg, var(--white-faint) 0 1px, transparent 1px 90px);
  inset: 0;
  opacity: 0.45;
  position: absolute;
}

.networks-breadcrumb {
  align-items: center;
  color: var(--grey-light);
  display: flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.68rem;
  gap: 0.7rem;
  letter-spacing: 0.16em;
  margin-bottom: 4rem;
  position: relative;
  text-transform: uppercase;
  z-index: 1;
}

.networks-breadcrumb a,
.networks-breadcrumb .current {
  color: var(--gold);
}

.networks-hero-grid,
.networks-protocol-grid {
  display: grid;
  gap: 5rem;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  position: relative;
  z-index: 1;
}

.networks-title {
  font-size: clamp(3rem, 6.5vw, 6.6rem);
  font-weight: 300;
  line-height: 0.98;
  margin: 1rem 0 0;
  max-width: 10ch;
}

.networks-title em {
  color: var(--gold);
  font-style: italic;
}

.networks-hero-panel {
  align-self: end;
  background:
    linear-gradient(135deg, rgba(31, 182, 109, 0.08), rgba(201, 168, 76, 0.07), rgba(217, 58, 53, 0.06)),
    var(--black-3);
  border: 1px solid var(--gold-line);
  padding: 2rem;
}

.networks-hero-panel p,
.network-card p,
.networks-protocol-grid p {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.85;
  margin: 0;
}

.networks-map,
.network-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.7rem;
}

.networks-map span,
.network-roles span {
  background: rgba(201, 168, 76, 0.05);
  border: 1px solid var(--gold-line);
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  padding: 0.5rem 0.8rem;
  text-transform: uppercase;
}

.networks-list-section {
  background: var(--black-2);
}

.networks-heading {
  margin-bottom: 4rem;
  max-width: 760px;
}

.networks-heading .label {
  display: inline-flex;
  margin-top: 1.2rem;
}

.networks-heading h2,
.networks-protocol-grid h2,
.networks-cta-inner h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 4vw, 4.4rem);
  font-weight: 300;
  line-height: 1.08;
  margin: 1rem 0 1.4rem;
}

.networks-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.network-card {
  background:
    linear-gradient(180deg, rgba(245, 242, 236, 0.018), transparent 45%),
    var(--black-3);
  border: 1px solid var(--grey-dark);
  overflow: hidden;
  padding: 2.5rem;
  position: relative;
}

.network-card::before {
  background: linear-gradient(90deg, var(--green), var(--gold), var(--red));
  content: '';
  height: 2px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.network-card h3 {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

.networks-protocol-section {
  border-block: 1px solid var(--grey-dark);
}

.protocol-list {
  border: 1px solid var(--grey-dark);
}

.protocol-row {
  align-items: center;
  background: var(--black-3);
  border-bottom: 1px solid var(--grey-dark);
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 64px 1fr;
  padding: 1.6rem;
}

.protocol-row:last-child {
  border-bottom: none;
}

.protocol-row span {
  color: var(--gold);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  line-height: 1;
}

.networks-cta {
  background: var(--black);
}

.networks-cta-inner {
  margin: 0 auto;
  max-width: 820px;
  text-align: center;
}

.networks-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 1080px) {
  .networks-hero-grid,
  .networks-protocol-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .networks-hero {
    padding-top: 8rem;
  }

  .networks-grid,
  .protocol-row {
    grid-template-columns: 1fr;
  }

  .network-card {
    padding: 2rem 1.5rem;
  }

  .networks-actions .btn-ghost,
  .networks-actions .btn-primary {
    width: 100%;
  }
}
</style>
