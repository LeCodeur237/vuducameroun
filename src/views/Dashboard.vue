<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  loadManagedNotes,
  publicNotes,
  saveManagedNotes,
  slugifyNoteTitle,
  type PublicNote,
} from '../data/notes'

const blankNote = (): PublicNote => ({
  slug: '',
  tag: 'Actualité',
  title: '',
  image: '/images/carte.png',
  date: '',
  text: '',
  sourceUrl: '',
  author: 'Vu du Cameroun',
  contentHtml: '',
  published: true,
})

const storedNotes = ref<PublicNote[]>([])
const selectedSlug = ref('')
const message = ref('')
const form = reactive<PublicNote>(blankNote())

const baseSlugs = computed(() => new Set(publicNotes.map((note) => note.slug)))
const notes = computed(() => {
  const storedBySlug = new Map(storedNotes.value.map((note) => [note.slug, note]))
  const merged = publicNotes.map((note) => ({ ...note, ...storedBySlug.get(note.slug) }))
  const created = storedNotes.value.filter((note) => !baseSlugs.value.has(note.slug))
  return [...merged, ...created]
})

const stats = computed(() => ({
  total: notes.value.length,
  published: notes.value.filter((note) => note.published !== false).length,
  drafts: notes.value.filter((note) => note.published === false).length,
}))

const syncForm = (note: PublicNote) => {
  Object.assign(form, blankNote(), note)
  selectedSlug.value = note.slug
  message.value = ''
}

const newNote = () => {
  Object.assign(form, blankNote())
  selectedSlug.value = ''
  message.value = ''
}

const refresh = () => {
  storedNotes.value = loadManagedNotes()
  syncForm(notes.value[0] || blankNote())
}

const persistNote = (note: PublicNote) => {
  const next = [...storedNotes.value]
  const index = next.findIndex((storedNote) => storedNote.slug === note.slug)
  if (index >= 0) next[index] = note
  else next.push(note)
  storedNotes.value = next
  saveManagedNotes(next)
}

const saveNote = () => {
  const slug = form.slug || slugifyNoteTitle(form.title)
  if (!slug || !form.title.trim()) {
    message.value = 'Le titre et le slug sont obligatoires.'
    return
  }

  const note = {
    ...form,
    slug,
    title: form.title.trim(),
    tag: form.tag.trim() || 'Actualité',
    image: form.image.trim() || '/images/carte.png',
    date: form.date.trim() || 'Publication',
    text: form.text.trim(),
    sourceUrl: form.sourceUrl.trim(),
    author: form.author?.trim() || 'Vu du Cameroun',
    contentHtml: form.contentHtml?.trim() || `<p>${form.text.trim()}</p>`,
    published: form.published !== false,
  }

  persistNote(note)
  syncForm(note)
  message.value = 'Note enregistrée.'
}

const removeNote = () => {
  if (!form.slug) return

  if (baseSlugs.value.has(form.slug)) {
    persistNote({ ...form, published: false })
    message.value = 'Note masquée du site public.'
    return
  }

  const next = storedNotes.value.filter((note) => note.slug !== form.slug)
  storedNotes.value = next
  saveManagedNotes(next)
  newNote()
  message.value = 'Note supprimée.'
}

const resetLocalChanges = () => {
  storedNotes.value = []
  saveManagedNotes([])
  refresh()
  message.value = 'Données locales réinitialisées.'
}

const updateSlugFromTitle = () => {
  if (!selectedSlug.value) form.slug = slugifyNoteTitle(form.title)
}

onMounted(refresh)
</script>

<template>
  <main class="dashboard-page">
    <section class="dashboard-hero section-pad">
      <div class="container dashboard-shell">
        <div class="dashboard-header">
          <div>
            <h1>Actualités & notes</h1>
            <p>Gérez les publications visibles sur le site et préparez les prochains contenus éditoriaux.</p>
            <div class="page-hero-actions reveal reveal-delay-3">
              <a href="#dashboard-content" class="btn-primary">Gérer</a>
              <RouterLink to="/notes" class="btn-ghost">Voir le site</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="dashboard-content" class="section-pad dashboard-content">
      <div class="container dashboard-shell">
        <div class="dashboard-stats">
          <article>
            <span>{{ stats.total }}</span>
            <p>Total</p>
          </article>
          <article>
            <span>{{ stats.published }}</span>
            <p>Publiées</p>
          </article>
          <article>
            <span>{{ stats.drafts }}</span>
            <p>Masquées</p>
          </article>
        </div>

        <div class="dashboard-grid">
          <aside class="dashboard-list">
            <div class="dashboard-list-head">
              <h2>Publications</h2>
              <button type="button" @click="newNote">Nouvelle</button>
            </div>
            <button
              v-for="note in notes"
              :key="note.slug"
              type="button"
              class="dashboard-note-row"
              :class="{ active: note.slug === selectedSlug, muted: note.published === false }"
              @click="syncForm(note)"
            >
              <img :src="note.image" :alt="note.title" />
              <span>
                <strong>{{ note.title }}</strong>
                <small>{{ note.tag }} · {{ note.date }}</small>
              </span>
            </button>
          </aside>

          <form class="dashboard-form" @submit.prevent="saveNote">
            <div class="dashboard-form-head">
              <h2>{{ selectedSlug ? 'Modifier la note' : 'Nouvelle note' }}</h2>
              <label class="dashboard-switch">
                <input v-model="form.published" type="checkbox" />
                <span>Publié</span>
              </label>
            </div>

            <div class="dashboard-fields two">
              <label>
                <span>Titre</span>
                <input v-model="form.title" type="text" @input="updateSlugFromTitle" />
              </label>
              <label>
                <span>Slug</span>
                <input v-model="form.slug" type="text" />
              </label>
            </div>

            <div class="dashboard-fields three">
              <label>
                <span>Catégorie</span>
                <input v-model="form.tag" type="text" />
              </label>
              <label>
                <span>Date</span>
                <input v-model="form.date" type="text" />
              </label>
              <label>
                <span>Auteur</span>
                <input v-model="form.author" type="text" />
              </label>
            </div>

            <label>
              <span>Image</span>
              <input v-model="form.image" type="text" placeholder="/images/mon-image.jpg" />
            </label>

            <label>
              <span>Lien source</span>
              <input v-model="form.sourceUrl" type="url" placeholder="https://..." />
            </label>

            <label>
              <span>Résumé court</span>
              <textarea v-model="form.text" rows="3"></textarea>
            </label>

            <label>
              <span>Contenu HTML / Quill</span>
              <textarea v-model="form.contentHtml" rows="12"></textarea>
            </label>

            <div class="dashboard-actions">
              <button type="submit" class="dashboard-save">Enregistrer</button>
              <button type="button" class="dashboard-danger" @click="removeNote">
                {{ baseSlugs.has(form.slug) ? 'Masquer' : 'Supprimer' }}
              </button>
              <button type="button" class="dashboard-reset" @click="resetLocalChanges">
                Réinitialiser
              </button>
              <p v-if="message">{{ message }}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.dashboard-page {
  background: var(--black);
  color: var(--white);
  min-height: 100vh;
}

.dashboard-hero {
  align-items: center;
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.64), rgba(8, 8, 8, 0.86)),
    linear-gradient(90deg, rgba(8, 8, 8, 0.42), rgba(201, 168, 76, 0.14), rgba(8, 8, 8, 0.42)),
    url('/images/carte.png') center / cover no-repeat;
  background-attachment: fixed;
  border-bottom: 1px solid var(--grey-dark);
  color: #f5f2ec;
  display: flex;
  height: 500px;
  max-height: 500px;
  min-height: 500px;
  padding: 3.5rem 0;
}

.dashboard-content {
  background: var(--black-2);
}

.dashboard-shell {
  display: grid;
  gap: 1.25rem;
}

.dashboard-header {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  text-align: center;
}

.dashboard-breadcrumb {
  border-bottom: 1px solid var(--gold-line);
  color: rgba(245, 242, 236, 0.78);
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
}

.dashboard-breadcrumb a,
.dashboard-public-link {
  color: var(--gold);
  text-decoration: none;
}

.dashboard-header h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5.2vw, 5.2rem);
  line-height: 0.96;
  margin: 0.5rem 0 0;
}

.dashboard-header p {
  color: rgba(245, 242, 236, 0.82);
  font-size: 1.04rem;
  line-height: 1.75;
  margin: 1.2rem auto 0;
  max-width: 720px;
}

.dashboard-public-link,
.dashboard-list-head button,
.dashboard-actions button {
  border: 1px solid var(--gold-line);
  background: var(--black-3);
  color: var(--white);
  cursor: pointer;
  font: inherit;
  padding: 0.85rem 1rem;
}

.dashboard-stats {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dashboard-stats article {
  background: var(--black-3);
  border: 1px solid var(--gold-line);
  padding: 1.25rem;
}

.dashboard-stats span {
  color: var(--gold);
  display: block;
  font-family: var(--font-display);
  font-size: 2.5rem;
}

.dashboard-stats p {
  color: var(--white-dim);
  margin: 0.25rem 0 0;
}

.dashboard-grid {
  align-items: start;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1.7fr);
}

.dashboard-list,
.dashboard-form {
  background: var(--black-3);
  border: 1px solid var(--gold-line);
  padding: 1rem;
}

.dashboard-list {
  display: grid;
  gap: 0.75rem;
  position: sticky;
  top: 6rem;
}

.dashboard-list-head,
.dashboard-form-head,
.dashboard-actions {
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
}

.dashboard-list h2,
.dashboard-form h2 {
  font-size: 1rem;
  margin: 0;
  text-transform: uppercase;
}

.dashboard-note-row {
  align-items: center;
  background: var(--black-2);
  border: 1px solid transparent;
  color: var(--white);
  cursor: pointer;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 64px minmax(0, 1fr);
  padding: 0.6rem;
  text-align: left;
}

.dashboard-note-row.active {
  border-color: var(--gold);
}

.dashboard-note-row.muted {
  opacity: 0.55;
}

.dashboard-note-row img {
  aspect-ratio: 1;
  height: 64px;
  object-fit: cover;
  object-position: top center;
  width: 64px;
}

.dashboard-note-row strong,
.dashboard-note-row small {
  display: block;
}

.dashboard-note-row strong {
  font-size: 0.88rem;
  line-height: 1.25;
}

.dashboard-note-row small {
  color: var(--white-dim);
  margin-top: 0.25rem;
}

.dashboard-form {
  display: grid;
  gap: 1rem;
}

.dashboard-switch {
  align-items: center;
  color: var(--white-dim);
  display: flex;
  gap: 0.5rem;
}

.dashboard-fields {
  display: grid;
  gap: 1rem;
}

.dashboard-fields.two {
  grid-template-columns: 1.2fr 0.8fr;
}

.dashboard-fields.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dashboard-form label {
  display: grid;
  gap: 0.45rem;
}

.dashboard-form label span {
  color: var(--white-dim);
  font-size: 0.78rem;
  text-transform: uppercase;
}

.dashboard-form input,
.dashboard-form textarea {
  background: var(--black-2);
  border: 1px solid var(--grey-dark);
  color: var(--white);
  font: inherit;
  padding: 0.85rem;
  width: 100%;
}

.dashboard-form textarea {
  line-height: 1.55;
  resize: vertical;
}

.dashboard-save {
  border-color: rgba(201, 168, 76, 0.45) !important;
}

.dashboard-danger {
  border-color: rgba(138, 110, 50, 0.55) !important;
}

.dashboard-reset {
  color: var(--white-dim) !important;
}

.dashboard-actions {
  justify-content: flex-start;
  flex-wrap: wrap;
}

.dashboard-actions p {
  color: var(--gold);
  margin: 0;
}

@media (max-width: 900px) {
  .dashboard-header,
  .dashboard-form-head,
  .dashboard-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .dashboard-grid,
  .dashboard-stats,
  .dashboard-fields.two,
  .dashboard-fields.three {
    grid-template-columns: 1fr;
  }

  .dashboard-list {
    position: static;
  }
}
</style>
