<script setup lang="ts">
import { RouterLink } from 'vue-router'

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
    <div class="legal-hero-bg" aria-hidden="true"></div>
    <div class="container">
      <div class="legal-hero-inner reveal visible">
        <h1>{{ title }}</h1>
        <p>{{ intro }}</p>
        <div class="page-hero-actions reveal reveal-delay-3">
          <a href="#legal-content" class="btn-primary">Lire</a>
          <RouterLink to="/contact" class="btn-ghost">Nous contacter</RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section id="legal-content" class="section-pad legal-section">
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
  align-items: center;
  background:
    var(--black);
  border-bottom: 1px solid var(--grey-dark);
  color: #f5f2ec;
  display: flex;
  height: 500px;
  max-height: 500px;
  min-height: 500px;
  overflow: hidden;
  padding: 3.5rem 0;
  position: relative;
}

.legal-hero-bg {
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.62), rgba(8, 8, 8, 0.86)),
    linear-gradient(90deg, rgba(8, 8, 8, 0.42), rgba(201, 168, 76, 0.15), rgba(8, 8, 8, 0.42)),
    url('/images/carte.png') center / cover no-repeat;
  background-attachment: fixed;
  inset: 0;
  position: absolute;
}

.legal-hero-inner {
  margin: 0 auto;
  max-width: 1080px;
  position: relative;
  text-align: center;
  z-index: 1;
}

.legal-hero h1 {
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  font-weight: 300;
  line-height: 0.98;
  margin: 1rem 0 1.5rem;
}

.legal-hero p {
  color: rgba(245, 242, 236, 0.82);
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
    linear-gradient(180deg, rgba(201, 168, 76, 0.06), rgba(201, 168, 76, 0.04), rgba(138, 110, 50, 0.04)),
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
    padding: 3.5rem 0;
  }

  .legal-card {
    grid-template-columns: 1fr;
    padding: 1.75rem;
  }
}
</style>
