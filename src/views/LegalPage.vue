<script setup lang="ts">
type Section = {
  title: string
  paragraphs: string[]
}

defineProps<{
  eyebrow: string
  title: string
  intro: string
  updatedAt: string
  sections: Section[]
}>()
</script>

<template>
  <section class="legal-hero">
    <div class="container">
      <div class="legal-hero-inner reveal visible">
        <div class="label">{{ eyebrow }}</div>
        <h1>{{ title }}</h1>
        <p>{{ intro }}</p>
        <span>Derniere mise a jour: {{ updatedAt }}</span>
      </div>
    </div>
  </section>

  <section class="section-pad legal-section">
    <div class="container">
      <div class="legal-layout">
        <aside class="legal-aside">
          <div class="label">Cadre</div>
          <p>
            Ces informations encadrent l'utilisation du site Vu du Cameroun et les relations
            numeriques avec ses visiteurs, membres, partenaires et contributeurs.
          </p>
          <a href="mailto:contact@vuducameroun.org" class="secondary-link">Nous contacter</a>
        </aside>

        <div class="legal-content">
          <article v-for="(section, index) in sections" :key="section.title" class="legal-card">
            <div class="legal-card-num">{{ String(index + 1).padStart(2, '0') }}</div>
            <div>
              <h2>{{ section.title }}</h2>
              <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal-hero {
  background:
    linear-gradient(115deg, rgba(31, 182, 109, 0.1), transparent 34%),
    linear-gradient(245deg, rgba(217, 58, 53, 0.07), transparent 34%),
    var(--black);
  border-bottom: 1px solid var(--grey-dark);
  padding: 10rem 0 5rem;
}

.legal-hero-inner {
  max-width: 820px;
}

.legal-hero h1 {
  font-size: clamp(2.7rem, 6vw, 5.5rem);
  font-weight: 300;
  line-height: 1.05;
  margin: 1rem 0 1.5rem;
}

.legal-hero p {
  color: var(--white-dim);
  font-size: 1.08rem;
  line-height: 1.85;
  margin: 0 0 1.4rem;
}

.legal-hero span {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.legal-section {
  background: var(--black-2);
}

.legal-layout {
  align-items: start;
  display: grid;
  gap: 4rem;
  grid-template-columns: 300px 1fr;
}

.legal-aside {
  background:
    linear-gradient(180deg, rgba(31, 182, 109, 0.06), rgba(201, 168, 76, 0.04), rgba(217, 58, 53, 0.04)),
    var(--black-3);
  border: 1px solid var(--gold-line);
  padding: 2rem;
  position: sticky;
  top: 7rem;
}

.legal-aside p {
  color: var(--white-dim);
  font-size: 0.95rem;
  line-height: 1.75;
  margin: 1rem 0 1.5rem;
}

.legal-content {
  border: 1px solid var(--grey-dark);
}

.legal-card {
  background: var(--black-3);
  border-bottom: 1px solid var(--grey-dark);
  display: grid;
  gap: 2rem;
  grid-template-columns: 72px 1fr;
  padding: 2.5rem;
}

.legal-card:last-child {
  border-bottom: none;
}

.legal-card-num {
  color: var(--gold);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  line-height: 1;
}

.legal-card h2 {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

.legal-card p {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.85;
  margin: 0;
}

.legal-card p + p {
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .legal-layout {
    grid-template-columns: 1fr;
  }

  .legal-aside {
    position: static;
  }
}

@media (max-width: 720px) {
  .legal-hero {
    padding: 8rem 0 4rem;
  }

  .legal-card {
    grid-template-columns: 1fr;
    padding: 1.75rem;
  }
}
</style>
