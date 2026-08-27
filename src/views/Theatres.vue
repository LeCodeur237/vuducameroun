<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useReveal } from '../composables/useReveal'

const { observe } = useReveal()
onMounted(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
})

const theatres = [
  {
    id: 'eveil-civique',
    num: '01',
    title: 'Éveil civique',
    lead: "Former des citoyens capables de comprendre leurs devoirs, défendre la paix et servir l'intérêt général.",
    stakes: ['Apathie civique', 'Discours de haine', 'Faible culture institutionnelle'],
    actions: ['Clubs citoyens jeunes', 'Causeries éducatives', 'Campagnes paix et unité'],
    impact: 'Une jeunesse informée, responsable et capable de participer sans violence à la vie publique.',
  },
  {
    id: 'insertion-economique',
    num: '02',
    title: 'Insertion économique',
    lead: "Transformer l'énergie des jeunes en autonomie productive, en entrepreneuriat utile et en création de valeur locale.",
    stakes: ['Chômage des jeunes', 'Informel subi', 'Faible accès aux passerelles professionnelles'],
    actions: ['Ateliers métiers', 'Incubation de microprojets', 'Promotion du Made in Cameroon'],
    impact: "Des jeunes mieux outillés pour produire, entreprendre, s'insérer et contribuer aux économies locales.",
  },
  {
    id: 'leadership-terrain',
    num: '03',
    title: 'Leadership de terrain',
    lead: 'Préparer des relais communautaires crédibles, formés par le service avant la parole publique.',
    stakes: ['Déconnexion des élites locales', 'Manque de relais fiables', 'Faible culture de redevabilité'],
    actions: ['Missions communautaires', 'Formation au leadership éthique', 'Suivi des initiatives locales'],
    impact: 'Des cadres jeunes enracinés dans leurs communautés, capables de mobiliser sans manipulation.',
  },
  {
    id: 'cooperation-utile',
    num: '04',
    title: 'Coopération utile',
    lead: "Relier institutions, CTD, diaspora, société civile et acteurs économiques autour de projets mesurables.",
    stakes: ['Actions dispersées', 'Partenariats peu suivis', 'Manque de coordination territoriale'],
    actions: ['Cadres de dialogue', 'Cartographie des besoins', 'Programmes conjoints avec partenaires'],
    impact: 'Des réseaux de travail concrets, au service de la jeunesse et du développement local.',
  },
]

const principles = [
  'Apolitique dans la posture, civique dans l’action.',
  'Pacifique dans la méthode, exigeant dans les résultats.',
  'Ancré dans les réalités camerounaises, ouvert aux réseaux africains internationaux.',
  'Mesurable, documenté et utile aux communautés.',
]
</script>

<template>
  <main class="theatres-page">
    <section class="theatres-hero section-pad">
      <div class="theatres-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="theatres-breadcrumb reveal">
          <RouterLink to="/">Accueil</RouterLink>
          <span>›</span>
          <span class="current">Théâtres</span>
        </div>
        <div class="theatres-hero-grid">
          <div>
            <div class="label reveal">Champs d'action</div>
            <h1 class="theatres-title reveal reveal-delay-1">
              Là où la conscience devient <em>action</em>.
            </h1>
          </div>
          <div class="theatres-hero-panel reveal reveal-delay-2">
            <p>
              Les théâtres d'action structurent l'intervention de Vu du Cameroun: lire les
              vulnérabilités, former les jeunes, agir au plus près du terrain et construire des
              passerelles utiles avec les institutions, les communautés et les réseaux de la diaspora.
            </p>
            <div class="theatres-hero-stats">
              <span>04 théâtres</span>
              <span>Terrain</span>
              <span>Impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad theatres-list-section">
      <div class="container">
        <div class="theatres-intro reveal">
          <div class="gold-rule"></div>
          <span class="label">Lecture opérationnelle</span>
          <h2>Chaque théâtre répond à une tension réelle du contexte africain international.</h2>
        </div>

        <div class="theatres-grid">
          <article
            v-for="theatre in theatres"
            :id="theatre.id"
            :key="theatre.id"
            class="theatre-card reveal"
          >
            <div class="theatre-card-head">
              <span>{{ theatre.num }}</span>
              <h3>{{ theatre.title }}</h3>
            </div>
            <p class="theatre-lead">{{ theatre.lead }}</p>

            <div class="theatre-columns">
              <div>
                <h4>Enjeux</h4>
                <ul>
                  <li v-for="item in theatre.stakes" :key="item">{{ item }}</li>
                </ul>
              </div>
              <div>
                <h4>Réponses</h4>
                <ul>
                  <li v-for="item in theatre.actions" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>

            <div class="theatre-impact">
              <span>Impact attendu</span>
              <p>{{ theatre.impact }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad theatres-method-section section-dark">
      <div class="container">
        <div class="theatres-method-grid">
          <div class="theatres-method-left reveal">
            <span class="label">Méthode d'intervention</span>
            <h2>Une logique simple: écouter, former, agir, documenter.</h2>
            <p>
              Un théâtre n'est pas un slogan. C'est un espace de responsabilité: on identifie un
              besoin, on mobilise les bonnes compétences, on teste une réponse, puis on rend compte
              des résultats obtenus.
            </p>
          </div>
          <div class="theatres-principles reveal reveal-delay-1">
            <div v-for="(principle, index) in principles" :key="principle" class="principle-row">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ principle }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad theatres-cta">
      <div class="container">
        <div class="theatres-cta-inner reveal">
          <span class="label">Contribution</span>
          <h2>Un théâtre d'action se construit avec les réalités du terrain.</h2>
          <p>
            Proposez un besoin, une compétence, un territoire, un partenaire ou une initiative à
            relier à la dynamique.
          </p>
          <div class="theatres-actions">
            <a href="mailto:contact@vuducameroun.org" class="btn-primary">Contribuer</a>
            <RouterLink to="/instance" class="btn-ghost">Voir l'instance</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.theatres-page {
  background: var(--black);
  color: var(--white);
}

.theatres-hero {
  background: var(--black);
  border-bottom: 1px solid var(--grey-dark);
  overflow: hidden;
  padding-top: 10rem;
  position: relative;
}

.theatres-hero-bg {
  background:
    linear-gradient(120deg, rgba(31, 182, 109, 0.12), transparent 34%),
    linear-gradient(245deg, rgba(217, 58, 53, 0.08), transparent 36%),
    repeating-linear-gradient(90deg, var(--white-faint) 0 1px, transparent 1px 92px);
  inset: 0;
  opacity: 0.42;
  position: absolute;
}

.theatres-breadcrumb {
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

.theatres-breadcrumb a,
.theatres-breadcrumb .current {
  color: var(--gold);
}

.theatres-hero-grid,
.theatres-method-grid {
  display: grid;
  gap: 5rem;
  grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
  position: relative;
  z-index: 1;
}

.theatres-title {
  font-size: clamp(3.2rem, 7vw, 7rem);
  font-weight: 300;
  line-height: 0.98;
  margin: 1rem 0 0;
  max-width: 9ch;
}

.theatres-title em,
.theatres-intro h2 em {
  color: var(--gold);
  font-style: italic;
}

.theatres-hero-panel {
  align-self: end;
  background:
    linear-gradient(135deg, rgba(31, 182, 109, 0.08), rgba(201, 168, 76, 0.07), rgba(217, 58, 53, 0.06)),
    var(--black-3);
  border: 1px solid var(--gold-line);
  padding: 2rem;
}

.theatres-hero-panel p,
.theatre-lead,
.theatre-impact p,
.theatres-method-left p,
.theatres-cta-inner p {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.85;
  margin: 0;
}

.theatres-hero-stats {
  border-top: 1px solid var(--grey-dark);
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2rem;
  padding-top: 1.2rem;
}

.theatres-hero-stats span {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.theatres-list-section {
  background: var(--black-2);
}

.theatres-intro {
  margin-bottom: 4rem;
  max-width: 780px;
}

.theatres-intro .label {
  display: inline-flex;
  margin-top: 1.2rem;
}

.theatres-intro h2,
.theatres-method-left h2,
.theatres-cta-inner h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 4vw, 4.4rem);
  font-weight: 300;
  line-height: 1.08;
  margin: 1rem 0 0;
}

.theatres-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.theatre-card {
  background:
    linear-gradient(180deg, rgba(245, 242, 236, 0.018), transparent 44%),
    var(--black-3);
  border: 1px solid var(--grey-dark);
  min-height: 100%;
  overflow: hidden;
  padding: 2.5rem;
  position: relative;
}

.theatre-card::before {
  background: linear-gradient(90deg, var(--green), var(--gold), var(--red));
  content: '';
  height: 2px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.theatre-card-head {
  align-items: flex-start;
  display: flex;
  gap: 1.4rem;
  margin-bottom: 1.5rem;
}

.theatre-card-head span {
  color: var(--gold);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.3rem;
  line-height: 1;
}

.theatre-card h3 {
  font-size: 2rem;
  line-height: 1.1;
}

.theatre-columns {
  border-top: 1px solid var(--grey-dark);
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  padding-top: 2rem;
}

.theatre-columns h4,
.theatre-impact span {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  margin: 0 0 0.9rem;
  text-transform: uppercase;
}

.theatre-columns ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.theatre-columns li {
  border-bottom: 1px solid var(--grey-dark);
  color: var(--white-dim);
  font-size: 0.94rem;
  line-height: 1.55;
  padding: 0.7rem 0;
}

.theatre-columns li:first-child {
  padding-top: 0;
}

.theatre-impact {
  background: linear-gradient(90deg, rgba(31, 182, 109, 0.07), rgba(201, 168, 76, 0.05), rgba(217, 58, 53, 0.05));
  border: 1px solid var(--gold-line);
  margin-top: 2rem;
  padding: 1.4rem;
}

.theatres-method-section {
  border-block: 1px solid var(--grey-dark);
}

.theatres-method-left {
  align-self: start;
}

.theatres-method-left .label {
  display: inline-flex;
  margin-bottom: 1rem;
}

.theatres-method-left p {
  margin-top: 1.4rem;
  max-width: 560px;
}

.theatres-principles {
  border: 1px solid var(--grey-dark);
}

.principle-row {
  align-items: start;
  background: var(--black-3);
  border-bottom: 1px solid var(--grey-dark);
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 56px 1fr;
  padding: 1.6rem;
}

.principle-row:last-child {
  border-bottom: none;
}

.principle-row span {
  color: var(--gold);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.7rem;
  line-height: 1;
}

.principle-row p {
  color: var(--white-dim);
  line-height: 1.75;
  margin: 0;
}

.theatres-cta {
  background: var(--black);
}

.theatres-cta-inner {
  margin: 0 auto;
  max-width: 820px;
  text-align: center;
}

.theatres-cta-inner p {
  margin: 1.5rem auto 0;
  max-width: 620px;
}

.theatres-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 1080px) {
  .theatres-hero-grid,
  .theatres-method-grid {
    grid-template-columns: 1fr;
  }

  .theatres-title {
    max-width: 12ch;
  }
}

@media (max-width: 820px) {
  .theatres-grid,
  .theatre-columns,
  .theatres-hero-stats {
    grid-template-columns: 1fr;
  }

  .theatres-hero {
    padding-top: 8rem;
  }

  .theatre-card {
    padding: 2rem 1.5rem;
  }

  .principle-row {
    grid-template-columns: 1fr;
  }

  .theatres-actions .btn-ghost,
  .theatres-actions .btn-primary {
    width: 100%;
  }
}
</style>
