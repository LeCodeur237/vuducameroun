<script setup lang="ts">
import LegalPage from './LegalPage.vue'

const sections = [
  {
    title: 'Editeur du site',
    paragraphs: [
      "Le site vuducameroun.org est edite par Vu du Cameroun, dynamique citoyenne apolitique basee a Yaounde, Cameroun.",
      "Contact general: contact@vuducameroun.org. Contact partenariats: partenariat@vuducameroun.org. Contact presse: presse@vuducameroun.org.",
    ],
  },
  {
    title: 'Objet du site',
    paragraphs: [
      "Le site presente la doctrine, les axes d'action, les initiatives, les contenus publics et les canaux de contact de Vu du Cameroun.",
      "Les informations publiees ont une vocation institutionnelle, citoyenne et informative. Elles ne constituent pas un conseil juridique, financier ou administratif individualise.",
    ],
  },
  {
    title: 'Responsabilite editoriale',
    paragraphs: [
      "Vu du Cameroun s'efforce de publier des informations exactes, utiles et actualisees. Des erreurs, omissions ou decalages peuvent toutefois exister.",
      "L'organisation peut modifier, suspendre ou retirer tout contenu du site afin de preserver la coherence de sa doctrine, la securite des visiteurs ou la qualite de l'information diffusee.",
    ],
  },
  {
    title: 'Propriete intellectuelle',
    paragraphs: [
      "Les textes, visuels, logos, elements graphiques, structures de pages et contenus du site sont proteges par les droits applicables, sauf mention contraire.",
      "Toute reproduction, adaptation ou reutilisation substantielle doit faire l'objet d'une autorisation prealable, notamment lorsque l'usage concerne une communication publique, commerciale ou politique.",
    ],
  },
  {
    title: 'Signalement',
    paragraphs: [
      "Pour signaler une erreur, un contenu inapproprie, une atteinte aux droits ou une demande institutionnelle, le visiteur peut ecrire a contact@vuducameroun.org.",
    ],
  },
]
</script>

<template>
  <LegalPage
    eyebrow="Informations legales"
    title="Mentions legales"
    intro="Les presentes mentions identifient l'editeur du site et precisent les conditions generales de publication des contenus de Vu du Cameroun."
    updated-at="27 aout 2026"
    :sections="sections"
  />
</template>
