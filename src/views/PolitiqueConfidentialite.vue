<script setup lang="ts">
import LegalPage from './LegalPage.vue'

const sections = [
  {
    title: 'Donnees concernees',
    paragraphs: [
      "Vu du Cameroun peut recevoir des donnees lorsque le visiteur contacte l'organisation par email, manifeste son interet pour une adhesion, propose un partenariat ou transmet une demande de presse.",
      "Ces donnees peuvent inclure le nom, l'adresse email, l'organisation representee, le message transmis et les informations volontairement communiquees par le visiteur.",
    ],
  },
  {
    title: 'Finalites',
    paragraphs: [
      "Les donnees sont utilisees pour repondre aux demandes, suivre les propositions de partenariat, organiser les adhesions, traiter les sollicitations institutionnelles et ameliorer la qualite de la relation avec le public.",
      "Vu du Cameroun ne vend pas les donnees personnelles des visiteurs.",
    ],
  },
  {
    title: 'Conservation',
    paragraphs: [
      "Les informations sont conservees pendant la duree necessaire au traitement de la demande, au suivi de la relation ou au respect d'obligations administratives applicables.",
      "Les messages sans suite operationnelle peuvent etre supprimes ou archives de maniere raisonnable.",
    ],
  },
  {
    title: 'Cookies et mesure',
    paragraphs: [
      "Le site peut utiliser des fonctionnalites techniques necessaires a son bon fonctionnement, notamment la conservation locale du choix light/dark.",
      "Si des outils de mesure d'audience sont ajoutes ulterieurement, ils devront etre configures dans un esprit de minimisation et de transparence.",
    ],
  },
  {
    title: 'Droits des personnes',
    paragraphs: [
      "Toute personne peut demander l'acces, la rectification ou la suppression des donnees la concernant en ecrivant a contact@vuducameroun.org.",
      "La demande doit permettre d'identifier clairement la personne concernee et le contexte de la collecte.",
    ],
  },
]
</script>

<template>
  <LegalPage
    eyebrow="Donnees personnelles"
    title="Politique de confidentialite"
    intro="Cette politique explique comment Vu du Cameroun traite les donnees communiquees volontairement par les visiteurs, membres, partenaires et contributeurs."
    updated-at="27 aout 2026"
    :sections="sections"
  />
</template>
