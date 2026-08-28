export type PublicNote = {
  slug: string
  tag: string
  title: string
  image: string
  date: string
  text: string
  sourceUrl: string
  author?: string
  contentHtml?: string
  published?: boolean
}

export const managedNotesStorageKey = 'vdc-managed-notes'

export const publicNotes: PublicNote[] = [
  {
    slug: 'declaration-dynamique-vu-du-cameroun-au-nom-de-la-jeunesse',
    tag: 'Déclaration',
    title: 'Déclaration de la Dynamique Vu du Cameroun : au nom de la jeunesse',
    image: '/images/declaration-troisieme-republique-cameroun.jpg',
    date: '4 Avril 2026',
    text: "La Dynamique Vu du Cameroun prend position au nom de la jeunesse face au tournant institutionnel de la Troisième République.",
    sourceUrl: 'https://ecobiz54.info/declaration-de-la-dynamique-vu-du-cameroun-au-nom-de-la-jeunesse/',
    published: true,
  },
  {
    slug: 'crise-migration-societe-civile-camerounaise-sommet-afrique-france-2026',
    tag: 'Tribune',
    title: "Crise migration : la société civile camerounaise aux marges d'un enjeu brûlant",
    image: '/images/crise-migration-image-pj.png',
    date: '21 février 2026',
    text: "Une tribune sur la migration, la fuite des compétences, les faux recrutements et la responsabilité stratégique de la société civile camerounaise.",
    sourceUrl: 'https://voixdesjeunes.com/actualite/crise-migration-la-societe-civile-camerounaise-aux-marges-d-un-enjeu-brulant-a-l-aube-du-sommet-afrique-france-2026',
    published: true,
  },
  {
    slug: 'vu-de-yaounde-partenariat-cameroun-france-en-2025',
    tag: 'Analyse',
    title: 'Vu de Yaoundé, le partenariat Cameroun - France en 2025',
    image: '/images/partenariat-cameroun-france-2025.jpg',
    date: '9 janvier 2026',
    text: "Vue depuis le Cameroun, l'année 2025 n'a pas été celle d'un spectaculaire tournant dans la relation avec la France, mais celle d'un ajustement maîtrisé.",
    sourceUrl: 'https://lavoixducentre.info/2026/01/09/vu-de-yaounde-le-partenariat-cameroun-france-en-2025/',
    published: true,
  },
  {
    slug: 'sommet-afrique-france-2026-nairobi-feuille-de-route-societe-civile',
    tag: 'Concertation',
    title:
      "Nairobi 2026 : le Cameroun face au défi d'une diplomatie d'influence et d'une coopération fondée sur les intérêts",
    image: '/images/Nairobi-2026-le-Cameroun.jpg',
    date: '23 février 2026',
    text: "Retour sur la concertation de Yaoundé autour de la gouvernance, de la démocratie et d'un partenariat renouvelé.",
    sourceUrl: 'https://globalinfosnews.com/sommet-afrique-france-2026-a-nairobi-la-societe-civile-camerounaise-prepare-sa-feuille-de-route-pour-un-partenariat-renouvele-avec-la-france/',
    published: true,
  },
  {
    slug: 'publication-video-vu-du-cameroun-facebook-reel',
    tag: 'Vidéo',
    title: 'Publication vidéo Vu du Cameroun',
    image: '/images/carte.png',
    date: 'Publication externe',
    text: "Une publication vidéo à consulter directement sur la page Facebook liée à la dynamique Vu du Cameroun.",
    sourceUrl: 'https://web.facebook.com/reel/1296440635662593',
    published: true,
  },
]

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage)

export const loadManagedNotes = (): PublicNote[] => {
  if (!canUseStorage()) return []

  try {
    const raw = window.localStorage.getItem(managedNotesStorageKey)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveManagedNotes = (notes: PublicNote[]) => {
  if (!canUseStorage()) return
  window.localStorage.setItem(managedNotesStorageKey, JSON.stringify(notes))
  window.dispatchEvent(new CustomEvent('vdc-managed-notes-updated'))
}

export const mergeManagedNotes = (baseNotes: PublicNote[], storedNotes = loadManagedNotes()) => {
  const storedBySlug = new Map(storedNotes.map((note) => [note.slug, note]))
  const merged = baseNotes.map((note) => ({ ...note, ...storedBySlug.get(note.slug) }))
  const baseSlugs = new Set(baseNotes.map((note) => note.slug))
  const created = storedNotes.filter((note) => !baseSlugs.has(note.slug))

  return [...merged, ...created].filter((note) => note.published !== false)
}

export const slugifyNoteTitle = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
