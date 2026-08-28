<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useReveal } from '../composables/useReveal'

const { observe } = useReveal()
onMounted(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
})

const cycle = [
  {
    num: '01',
    title: 'Écouter',
    text: "Partir des silences, des signaux faibles et des besoins exprimés par les jeunes, les familles, les communautés et les territoires.",
    outputs: ['Entretiens de terrain', 'Cartographie des besoins', 'Lecture des vulnérabilités'],
  },
  {
    num: '02',
    title: 'Éclairer',
    text: 'Transformer les constats en compréhension partagée: causes, risques, leviers, acteurs utiles et priorités réalistes.',
    outputs: ['Notes citoyennes', 'Diagnostics courts', 'Scénarios d’action'],
  },
  {
    num: '03',
    title: 'Former',
    text: "Donner aux jeunes les repères civiques, numériques, économiques et éthiques nécessaires pour agir sans manipulation.",
    outputs: ['Modules pratiques', 'Clubs citoyens', 'Mentorat et transmission'],
  },
  {
    num: '04',
    title: 'Agir',
    text: "Passer de la parole au chantier: actions communautaires, insertion, campagnes de paix, projets productifs et alliances utiles.",
    outputs: ['Missions locales', 'Projets pilotes', 'Partenariats opérationnels'],
  },
  {
    num: '05',
    title: 'Documenter',
    text: 'Rendre compte des apprentissages, des limites et des résultats pour améliorer la prochaine action.',
    outputs: ['Bilans publics', 'Indicateurs simples', 'Capitalisation'],
  },
]

const rules = [
  {
    title: 'Primauté du terrain',
    text: "Aucune action ne doit être conçue loin des réalités qu'elle prétend transformer.",
  },
  {
    title: 'Clarté apolitique',
    text: 'La méthode sert la citoyenneté, la paix et le développement; elle ne sert pas une conquête partisane.',
  },
  {
    title: 'Utilité mesurable',
    text: 'Chaque initiative doit produire un apprentissage, un service, une compétence ou une passerelle concrète.',
  },
  {
    title: 'Transmission',
    text: "Un chantier réussi doit pouvoir être compris, repris et amélioré par d'autres jeunes.",
  },
]

const indicators = ['Participation', 'Compétences transmises', 'Actions réalisées', 'Partenaires mobilisés', 'Suites concrètes']
</script>

<template>
  <main class="method-page">
    <section class="method-hero section-pad">
      <div class="method-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="method-hero-grid">
          <h1 class="method-title reveal reveal-delay-1">
            Écouter les silences, puis <em>construire</em> le réel.
          </h1>
          <div class="method-hero-panel reveal reveal-delay-2">
            <p>
              La méthode de Vu du Cameroun organise le passage de l’intuition à l’action. Elle
              refuse l’agitation sans résultat: chaque théâtre d’action doit être compris, priorisé,
              outillé, exécuté et documenté.
            </p>
          </div>
          <div class="page-hero-actions reveal reveal-delay-3">
            <a href="#method-cycle" class="btn-primary">Explorer</a>
            <RouterLink to="/notes" class="btn-ghost">Lire les notes</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section id="method-cycle" class="section-pad method-cycle-section">
      <div class="container">
        <div class="method-heading reveal">
          <div class="gold-rule"></div>
          <span class="label">Cycle opérationnel</span>
          <h2>Une discipline de travail en cinq temps.</h2>
        </div>

        <div class="method-cycle">
          <article v-for="item in cycle" :key="item.num" class="method-step reveal">
            <div class="method-step-num">{{ item.num }}</div>
            <div class="method-step-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <div class="method-output-list">
                <span v-for="output in item.outputs" :key="output">{{ output }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad method-rules-section section-dark">
      <div class="container">
        <div class="method-rules-grid">
          <div class="method-rules-left reveal">
            <span class="label">Règles de conduite</span>
            <h2>Rester moderne sans perdre l’ancrage.</h2>
            <p>
              Le nouveau contexte socio-politique africain international exige des mouvements
              citoyens capables d’être lisibles, pacifiques, utiles et suffisamment organisés pour
              durer.
            </p>
          </div>
          <div class="method-rules">
            <article v-for="rule in rules" :key="rule.title" class="method-rule reveal">
              <h3>{{ rule.title }}</h3>
              <p>{{ rule.text }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad method-measure-section">
      <div class="container">
        <div class="method-measure reveal">
          <div>
            <span class="label">Mesure d'impact</span>
            <h2>On ne confond pas visibilité et efficacité.</h2>
          </div>
          <div class="method-indicators">
            <span v-for="indicator in indicators" :key="indicator">{{ indicator }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad method-cta">
      <div class="container">
        <div class="method-cta-inner reveal">
          <span class="label">Mise en pratique</span>
          <h2>La méthode existe pour servir les théâtres d’action.</h2>
          <div class="method-actions">
            <RouterLink to="/theatres" class="btn-primary">Voir les théâtres</RouterLink>
            <RouterLink to="/contact" class="btn-ghost">Proposer une action</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.method-page {
  background: var(--black);
  color: var(--white);
}

.method-hero {
  background: var(--black);
  border-bottom: 1px solid var(--grey-dark);
  color: #f5f2ec;
  align-items: center;
  display: flex;
  height: 500px;
  max-height: 500px;
  min-height: 500px;
  overflow: hidden;
  padding: 3.5rem 0;
  position: relative;
}

.method-hero-bg {
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.58), rgba(8, 8, 8, 0.84)),
    linear-gradient(90deg, rgba(8, 8, 8, 0.4), rgba(201, 168, 76, 0.16), rgba(8, 8, 8, 0.4)),
    url('/images/crise-migration-image-pj.png') top center / cover no-repeat;
  background-attachment: fixed;
  inset: 0;
  position: absolute;
}

.method-breadcrumb {
  align-items: center;
  color: rgba(245, 242, 236, 0.76);
  display: flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.68rem;
  gap: 0.7rem;
  letter-spacing: 0.16em;
  border-bottom: 1px solid var(--gold-line);
  margin-bottom: 1.75rem;
  padding-bottom: 1rem;
  position: relative;
  text-transform: uppercase;
  z-index: 1;
}

.method-breadcrumb a,
.method-breadcrumb .current {
  color: var(--gold);
}

.method-hero-grid,
.method-rules-grid {
  display: grid;
  gap: 5rem;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  position: relative;
  z-index: 1;
}

.method-hero-grid {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  max-width: 1120px;
  text-align: center;
}

.method-title {
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 300;
  line-height: 0.98;
  margin: 1rem 0 0;
  max-width: 1040px;
}

.method-title em,
.method-heading h2 em {
  color: var(--gold);
  font-style: italic;
}

.method-hero-panel {
  align-self: center;
  background: transparent;
  border: none;
  max-width: 760px;
  padding: 0;
}

.method-hero-panel p,
.method-step-body p,
.method-rules-left p,
.method-rule p {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.85;
  margin: 0;
}

.method-hero-panel p {
  color: rgba(245, 242, 236, 0.82);
}

.method-hero-line {
  border-top: 1px solid rgba(201, 168, 76, 0.34);
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  margin: 1.4rem auto 0;
  max-width: 640px;
  padding-top: 1.2rem;
}

.method-hero-line span,
.method-output-list span,
.method-indicators span {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.method-cycle-section {
  background: var(--black-2);
}

.method-heading {
  margin-bottom: 4rem;
  max-width: 760px;
}

.method-heading .label {
  display: inline-flex;
  margin-top: 1.2rem;
}

.method-heading h2,
.method-rules-left h2,
.method-measure h2,
.method-cta-inner h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 4vw, 4.4rem);
  font-weight: 300;
  line-height: 1.08;
  margin: 1rem 0 0;
}

.method-cycle {
  border: 1px solid var(--grey-dark);
}

.method-step {
  background: var(--black-3);
  border-bottom: 1px solid var(--grey-dark);
  display: grid;
  gap: 2rem;
  grid-template-columns: 110px 1fr;
  padding: 2.5rem;
}

.method-step:last-child {
  border-bottom: none;
}

.method-step-num {
  color: var(--gold);
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  line-height: 1;
}

.method-step h3,
.method-rule h3 {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

.method-output-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.4rem;
}

.method-output-list span,
.method-indicators span {
  background: rgba(201, 168, 76, 0.05);
  border: 1px solid var(--gold-line);
  padding: 0.5rem 0.8rem;
}

.method-rules-left .label {
  display: inline-flex;
  margin-bottom: 1rem;
}

.method-rules-left p {
  margin-top: 1.4rem;
  max-width: 560px;
}

.method-rules {
  border: 1px solid var(--grey-dark);
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.method-rule {
  background:
    linear-gradient(180deg, rgba(245, 242, 236, 0.018), transparent 45%),
    var(--black-3);
  border-bottom: 1px solid var(--grey-dark);
  border-right: 1px solid var(--grey-dark);
  padding: 2rem;
}

.method-rule:nth-child(2n) {
  border-right: none;
}

.method-rule:nth-last-child(-n + 2) {
  border-bottom: none;
}

.method-measure-section {
  background: var(--black);
}

.method-measure {
  align-items: center;
  border: 1px solid var(--gold-line);
  display: grid;
  gap: 3rem;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  padding: 3rem;
}

.method-indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.method-cta {
  background: var(--black-2);
}

.method-cta-inner {
  margin: 0 auto;
  max-width: 820px;
  text-align: center;
}

.method-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 1080px) {
  .method-hero-grid,
  .method-measure,
  .method-rules-grid {
    grid-template-columns: 1fr;
  }

  .method-title {
    max-width: 100%;
  }
}

@media (max-width: 760px) {
  .method-hero {
    padding-top: 8rem;
  }

  .method-hero-line,
  .method-rules {
    grid-template-columns: 1fr;
  }

  .method-rule,
  .method-rule:nth-child(2n),
  .method-rule:nth-last-child(-n + 2) {
    border-bottom: 1px solid var(--grey-dark);
    border-right: none;
  }

  .method-rule:last-child {
    border-bottom: none;
  }

  .method-step {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem;
  }

  .method-measure {
    padding: 2rem 1.5rem;
  }

  .method-actions .btn-ghost,
  .method-actions .btn-primary {
    width: 100%;
  }
}
</style>
