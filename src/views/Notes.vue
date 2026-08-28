<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useReveal } from '../composables/useReveal'
import { mergeManagedNotes, publicNotes, type PublicNote } from '../data/notes'

const { observe } = useReveal()
onMounted(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
  window.addEventListener('storage', refreshNotes)
  window.addEventListener('vdc-managed-notes-updated', refreshNotes)
})

const notes = ref<PublicNote[]>(mergeManagedNotes(publicNotes))

const refreshNotes = () => {
  notes.value = mergeManagedNotes(publicNotes)
}

onUnmounted(() => {
  window.removeEventListener('storage', refreshNotes)
  window.removeEventListener('vdc-managed-notes-updated', refreshNotes)
})

const perPage = 8
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(notes.value.length / perPage))
const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return notes.value.slice(start, start + perPage)
})

const goToPage = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <main class="notes-page">
    <section class="notes-hero section-pad">
      <div class="notes-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="notes-hero-grid">
          <h1 class="notes-title reveal reveal-delay-1">
            Des notes pour <em>éclairer</em> l'action.
          </h1>
          <div class="notes-hero-panel reveal reveal-delay-2">
            <p>
              Les notes donnent une forme lisible aux analyses, enseignements, alertes et
              propositions issues des théâtres d'action. Elles servent à former, documenter et
              transmettre.
            </p>
          </div>
          <div class="page-hero-actions reveal reveal-delay-3">
            <a href="#notes-list" class="btn-primary">Explorer</a>
            <RouterLink to="/reseaux" class="btn-ghost">Voir les réseaux</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section id="notes-list" class="section-pad notes-list-section">
      <div class="container">
        <div class="notes-heading reveal">
          <div class="gold-rule"></div>
          <span class="label">Actualité</span>
          <h2>Tribunes, Articles et Notes du mouvement.</h2>
        </div>

        <div class="notes-grid">
          <article v-for="note in paginatedNotes" :key="note.title" class="note-card reveal">
            <div class="note-image">
              <img :src="note.image" :alt="note.title" loading="lazy" decoding="async" />
            </div>
            <div class="note-body">
              <div class="note-meta">
                <span>{{ note.tag }}</span>
                <span>{{ note.date }}</span>
              </div>
              <h3>{{ note.title }}</h3>
              <p>{{ note.text }}</p>
              <RouterLink :to="`/notes/${note.slug}`" class="note-link">
                Lire la note
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </RouterLink>
            </div>
          </article>
        </div>

        <div v-if="totalPages > 1" class="notes-pagination" aria-label="Pagination des notes">
          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            :class="{ active: page === currentPage }"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </section>

    <section class="section-pad notes-editorial section-dark">
      <div class="container">
        <div class="notes-editorial-grid">
          <div class="reveal">
            <span class="label">Ligne éditoriale</span>
            <h2>Des contenus utiles, pas du bruit.</h2>
          </div>
          <div class="notes-editorial-text reveal reveal-delay-1">
            <p>
              Chaque note doit clarifier un enjeu, nommer un besoin, proposer une piste d'action
              et rester fidèle au positionnement apolitique, civique et formatif de Vu du Cameroun.
            </p>
            <p>
              Le style attendu est direct, responsable, accessible aux jeunes et exploitable par
              les relais de terrain.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.notes-page {
  background: var(--black);
  color: var(--white);
}

.notes-hero {
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

.notes-hero-bg {
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.6), rgba(8, 8, 8, 0.84)),
    linear-gradient(90deg, rgba(8, 8, 8, 0.42), rgba(201, 168, 76, 0.15), rgba(8, 8, 8, 0.42)),
    url('/images/Nairobi-2026-le-Cameroun.jpg') top center / cover no-repeat;
  background-attachment: fixed;
  inset: 0;
  position: absolute;
}

.notes-breadcrumb {
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

.notes-breadcrumb a,
.notes-breadcrumb .current {
  color: var(--gold);
}

.notes-hero-grid,
.notes-editorial-grid {
  display: grid;
  gap: 4rem;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.82fr);
  position: relative;
  z-index: 1;
}

.notes-hero-grid {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  max-width: 1120px;
  text-align: center;
}

.notes-title {
  font-size: clamp(2.4rem, 4.6vw, 4.7rem);
  font-weight: 300;
  line-height: 0.98;
  margin: 1rem 0 0;
  max-width: 980px;
}

.notes-title em {
  color: var(--gold);
  font-style: italic;
}

.notes-hero-panel {
  align-self: center;
  background: transparent;
  border: none;
  max-width: 760px;
  padding: 0;
}

.notes-hero-panel p,
.note-card p,
.notes-editorial-text p {
  color: var(--white-dim);
  font-size: 0.92rem;
  line-height: 1.72;
  margin: 0;
}

.notes-hero-panel p {
  color: rgba(245, 242, 236, 0.82);
}

.notes-format-list {
  border-top: 1px solid rgba(201, 168, 76, 0.34);
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin: 1.4rem auto 0;
  padding-top: 1.2rem;
}

.notes-format-list span,
.note-meta span {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.notes-list-section {
  background: var(--black-2);
}

.notes-heading {
  margin-bottom: 4rem;
  max-width: 760px;
}

.notes-heading .label {
  display: inline-flex;
  margin-top: 1.2rem;
}

.notes-heading h2,
.notes-editorial-grid h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 3.4vw, 3.8rem);
  font-weight: 300;
  line-height: 1.08;
  margin: 1rem 0 0;
}

.notes-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.note-card {
  background: var(--black-3);
  border: 1px solid var(--grey-dark);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.note-image {
  background: var(--black-2);
  border-bottom: 1px solid var(--gold-line);
  aspect-ratio: 16 / 10;
  height: auto;
  overflow: hidden;
}

.note-image img {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0.82;
  transition: opacity 0.3s ease, transform 0.4s ease;
  width: 100%;
}

.note-card:hover .note-image img {
  opacity: 0.98;
  transform: scale(1.04);
}

.note-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem;
}

.note-meta {
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.note-card h3 {
  font-size: 1.08rem;
  line-height: 1.24;
  margin-bottom: 0.8rem;
}

.note-link {
  align-items: center;
  color: var(--gold);
  display: inline-flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.54rem;
  font-weight: 700;
  gap: 0.5rem;
  letter-spacing: 0.18em;
  margin-top: auto;
  padding-top: 1.4rem;
  text-transform: uppercase;
}

.note-link svg {
  fill: none;
  height: 14px;
  stroke: currentColor;
  width: 14px;
}

.notes-pagination {
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  margin-top: 3rem;
}

.notes-pagination button {
  align-items: center;
  background: var(--black-3);
  border: 1px solid var(--grey-dark);
  color: var(--white-dim);
  cursor: none;
  display: inline-flex;
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  height: 36px;
  justify-content: center;
  letter-spacing: 0.12em;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  width: 36px;
}

.notes-pagination button:hover,
.notes-pagination button.active {
  border-color: var(--gold-line);
  color: var(--gold);
}

.notes-editorial {
  border-block: 1px solid var(--grey-dark);
}

.notes-editorial-text p + p {
  margin-top: 1rem;
}

@media (max-width: 1080px) {
  .notes-hero-grid,
  .notes-editorial-grid {
    grid-template-columns: 1fr;
  }

  .notes-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .notes-hero {
    padding-top: 8rem;
  }

  .notes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
