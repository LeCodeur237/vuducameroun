<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'

const form = reactive({
  names: '',
  phone: '',
  email: '',
  message: '',
})

const requestTypes = [
  'Adhésion',
  'Contribution citoyenne',
  'Partenariat',
  'Presse et publication',
]

const contactChannels = [
  { label: 'Dynamique', value: 'contact@vuducameroun.org', href: 'mailto:contact@vuducameroun.org' },
  { label: 'Partenariats', value: 'partenariat@vuducameroun.org', href: 'mailto:partenariat@vuducameroun.org' },
  { label: 'Presse', value: 'presse@vuducameroun.org', href: 'mailto:presse@vuducameroun.org' },
]

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`Contact Vu du Cameroun - ${form.names || 'Nouveau message'}`)
  const body = encodeURIComponent(
    [
      `Noms et prénoms: ${form.names}`,
      `Téléphone: ${form.phone}`,
      `Email: ${form.email}`,
      '',
      'Message:',
      form.message,
    ].join('\n')
  )

  return `mailto:contact@vuducameroun.org?subject=${subject}&body=${body}`
})
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero section-pad">
      <div class="contact-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="contact-grid">
          <div class="contact-copy reveal visible">
            <h1>Rejoindre la dynamique.</h1>
            <p>
              Laissez vos coordonnées et votre message. L'équipe Vu du Cameroun pourra vous
              recontacter pour l'adhésion, une contribution, une idée ou un partenariat.
            </p>
            <div class="page-hero-actions reveal reveal-delay-3">
              <a href="#contact-form" class="btn-primary">Écrire</a>
              <RouterLink to="/notes" class="btn-ghost">Lire les notes</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact-form" class="section-pad contact-form-section">
      <div class="container">
        <div class="contact-panel">
          <div class="contact-form-head reveal visible">
            <span class="label">Message</span>
            <h2>Présentez votre demande simplement.</h2>
            <p>
              Décrivez votre intention, le territoire concerné, les compétences disponibles ou le
              type de collaboration souhaité.
            </p>
          </div>

          <form class="contact-form reveal visible" @submit.prevent>
            <div class="contact-fields two">
              <label>
                <span>Noms et prénoms</span>
                <input v-model="form.names" type="text" required autocomplete="name" placeholder="Votre nom complet" />
              </label>
              <label>
                <span>Téléphone</span>
                <input v-model="form.phone" type="tel" required autocomplete="tel" placeholder="+237 ..." />
              </label>
            </div>

            <label>
              <span>Email</span>
              <input v-model="form.email" type="email" required autocomplete="email" placeholder="vous@email.com" />
            </label>

            <label>
              <span>Message</span>
              <textarea
                v-model="form.message"
                rows="8"
                required
                placeholder="Expliquez en quelques lignes votre demande ou votre proposition."
              ></textarea>
            </label>

            <div class="contact-actions">
              <a :href="mailtoHref" class="btn-primary">Envoyer le message</a>
              <RouterLink to="/notes" class="btn-ghost">Voir les notes</RouterLink>
            </div>
          </form>

          <aside class="contact-side reveal visible">
            <div class="contact-side-card contact-side-card-main">
              <span class="label">Coordonnées</span>
              <h3>Vu du Cameroun</h3>
              <p>
                Yaoundé, Cameroun. Association à portée nationale et internationale, active depuis
                2023.
              </p>
              <div class="contact-channel-list">
                <a v-for="channel in contactChannels" :key="channel.label" :href="channel.href">
                  <span>{{ channel.label }}</span>
                  <strong>{{ channel.value }}</strong>
                </a>
              </div>
            </div>

            <div class="contact-side-card">
              <span class="label">Motifs</span>
              <div class="contact-request-list">
                <span v-for="type in requestTypes" :key="type">{{ type }}</span>
              </div>
            </div>

            <div class="contact-side-note">
              <p>
                Pour une réponse utile, indiquez votre ville, votre organisation éventuelle et le
                niveau d'urgence de votre demande.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  background: var(--black);
  color: var(--white);
  min-height: 100vh;
}

.contact-hero {
  align-items: center;
  color: #f5f2ec;
  display: flex;
  height: 500px;
  max-height: 500px;
  min-height: 500px;
  padding: 3.5rem 0;
  position: relative;
}

.contact-hero-bg {
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.62), rgba(8, 8, 8, 0.86)),
    linear-gradient(90deg, rgba(8, 8, 8, 0.42), rgba(201, 168, 76, 0.15), rgba(8, 8, 8, 0.42)),
    url('/images/carte.png') center / cover no-repeat;
  background-attachment: fixed;
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.contact-grid {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0 auto;
  max-width: 1100px;
  position: relative;
  text-align: center;
}

.contact-copy h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5.2vw, 5.2rem);
  line-height: 0.96;
  margin: 1rem auto 1.1rem;
  max-width: 920px;
}

.contact-copy p {
  color: rgba(245, 242, 236, 0.82);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-inline: auto;
  max-width: 620px;
}

.contact-form-section {
  background: var(--black-2);
}

.contact-panel {
  align-items: start;
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) 380px;
}

.contact-form-head {
  border-top: 1px solid var(--gold-line);
  grid-column: 1 / -1;
  padding-top: 1.4rem;
}

.contact-form-head h2 {
  font-size: clamp(2rem, 3.8vw, 3.8rem);
  line-height: 1;
  margin: 0.8rem 0 1rem;
  max-width: 760px;
}

.contact-form-head p {
  color: var(--white-dim);
  font-size: 1rem;
  line-height: 1.8;
  margin: 0;
  max-width: 720px;
}

.contact-form {
  background:
    linear-gradient(180deg, rgba(201, 168, 76, 0.035), transparent 40%),
    var(--black-3);
  border: 1px solid rgba(201, 168, 76, 0.28);
  display: grid;
  gap: 1.1rem;
  padding: 2rem;
  text-align: left;
}

.contact-fields {
  display: grid;
  gap: 1rem;
}

.contact-fields.two {
  grid-template-columns: 1fr 1fr;
}

.contact-form label {
  display: grid;
  gap: 0.55rem;
}

.contact-form label span {
  color: var(--white-dim);
  font-family: 'Syne', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.contact-form input,
.contact-form textarea {
  background: var(--black-2);
  border: 1px solid var(--grey-dark);
  color: var(--white);
  font: inherit;
  outline: none;
  padding: 1rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  width: 100%;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--gold);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: color-mix(in srgb, var(--white-dim) 62%, transparent);
}

.contact-form textarea {
  line-height: 1.6;
  resize: vertical;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding-top: 0.5rem;
}

.contact-side {
  display: grid;
  gap: 1rem;
  position: sticky;
  top: 2rem;
}

.contact-side-card {
  background: var(--black-3);
  border: 1px solid var(--gold-line);
  padding: 1.5rem;
}

.contact-side-card-main {
  background:
    linear-gradient(135deg, rgba(201, 168, 76, 0.09), transparent 42%),
    var(--black-3);
}

.contact-side-card h3 {
  font-size: 2.2rem;
  line-height: 1;
  margin: 1rem 0;
}

.contact-side-card p,
.contact-side-note p {
  color: var(--white-dim);
  font-size: 0.94rem;
  line-height: 1.75;
  margin: 0;
}

.contact-channel-list {
  border-top: 1px solid var(--grey-dark);
  display: grid;
  gap: 0;
  margin-top: 1.5rem;
}

.contact-channel-list a {
  border-bottom: 1px solid var(--grey-dark);
  display: grid;
  gap: 0.25rem;
  padding: 1rem 0;
}

.contact-channel-list a:last-child {
  border-bottom: none;
}

.contact-channel-list span {
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.contact-channel-list strong {
  color: var(--white);
  font-size: 0.96rem;
  font-weight: 400;
  word-break: break-word;
}

.contact-request-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.contact-request-list span {
  border: 1px solid var(--gold-line);
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  padding: 0.5rem 0.7rem;
  text-transform: uppercase;
}

.contact-side-note {
  border-left: 2px solid var(--gold);
  padding-left: 1rem;
}

:root[data-theme='light'] .contact-page,
:root[data-theme='light'] .contact-form-section {
  background: #ffffff;
}

:root[data-theme='light'] .contact-form,
:root[data-theme='light'] .contact-side-card {
  background: #ffffff;
  border-color: #e7e1d2;
}

:root[data-theme='light'] .contact-form input,
:root[data-theme='light'] .contact-form textarea {
  background: #ffffff;
  border-color: #e7e1d2;
  color: #111111;
}

:root[data-theme='light'] .contact-channel-list strong {
  color: #111111;
}

@media (max-width: 980px) {
  .contact-panel {
    grid-template-columns: 1fr;
  }

  .contact-side {
    position: static;
  }
}

@media (max-width: 700px) {
  .contact-fields.two {
    grid-template-columns: 1fr;
  }

  .contact-form,
  .contact-side-card {
    padding: 1.25rem;
  }
}
</style>
