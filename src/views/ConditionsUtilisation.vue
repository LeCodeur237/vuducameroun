<script setup lang="ts">
import LegalPage from './LegalPage.vue'

const sections = [
  {
    title: 'Acceptation',
    paragraphs: [
      "L'acces au site vuducameroun.org implique l'acceptation des presentes conditions d'utilisation.",
      "Si un visiteur n'accepte pas ces conditions, il lui appartient de ne pas utiliser le site ou ses formulaires de contact.",
    ],
  },
  {
    title: 'Usage autorise',
    paragraphs: [
      "Le site doit etre utilise dans un esprit loyal, pacifique et conforme aux lois applicables.",
      "Sont interdits les usages visant a perturber le service, usurper l'identite de l'organisation, extraire abusivement les contenus ou detourner les messages de Vu du Cameroun a des fins contraires a son positionnement apolitique.",
    ],
  },
  {
    title: 'Contenus et liens',
    paragraphs: [
      "Les contenus publies peuvent etre modifies a tout moment pour tenir compte de l'evolution des programmes, de la doctrine, des partenariats ou des exigences de communication publique.",
      "Le site peut orienter vers des adresses email ou ressources externes. Vu du Cameroun ne peut pas garantir le contenu de services tiers qui ne sont pas sous son controle.",
    ],
  },
  {
    title: 'Engagements des contributeurs',
    paragraphs: [
      "Toute personne qui transmet un message, une proposition ou un document s'engage a communiquer des informations sinceres et a respecter les droits des tiers.",
      "Vu du Cameroun peut refuser ou ne pas traiter une sollicitation contraire a son objet citoyen, a son caractere apolitique ou a ses exigences de paix sociale.",
    ],
  },
  {
    title: 'Evolution des conditions',
    paragraphs: [
      "Les presentes conditions peuvent etre mises a jour pour clarifier les usages, renforcer la securite du site ou tenir compte de nouvelles fonctionnalites.",
      "La version applicable est celle publiee sur cette page au moment de la consultation.",
    ],
  },
]
</script>

<template>
  <LegalPage
    eyebrow="Utilisation du site"
    title="Conditions d'utilisation"
    intro="Ces conditions encadrent l'acces au site Vu du Cameroun et l'usage de ses contenus, liens, ressources et canaux de contact."
    updated-at="27 aout 2026"
    :sections="sections"
  />
</template>
