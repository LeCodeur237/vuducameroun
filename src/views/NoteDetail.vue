<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useReveal } from '../composables/useReveal'
import { loadManagedNotes, type PublicNote } from '../data/notes'

type ApiNote = {
  author?: string
  category?: string
  content?: string
  content_html?: string
  cover_image?: string
  date?: string
  excerpt?: string
  image?: string
  published_at?: string
  slug?: string
  source_url?: string
  tag?: string
  title?: string
}

type Note = {
  author: string
  contentHtml: string
  date: string
  excerpt: string
  image: string
  sourceUrl: string
  tag: string
  title: string
}

const route = useRoute()
const { observe } = useReveal()
const loading = ref(true)
const error = ref('')
const note = ref<Note | null>(null)
const noteHeroStyle = computed(() =>
  note.value
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(8, 8, 8, 0.62), rgba(8, 8, 8, 0.86)), linear-gradient(90deg, rgba(8, 8, 8, 0.42), rgba(201, 168, 76, 0.15), rgba(8, 8, 8, 0.42)), url('${note.value.image}')`,
      }
    : undefined
)

const fallbackNotes: Record<string, Note> = {
  'declaration-dynamique-vu-du-cameroun-au-nom-de-la-jeunesse': {
    author: 'Queen Jokem',
    date: '4 Avril 2026',
    excerpt:
      "La Dynamique Vu du Cameroun prend officiellement la parole pour marquer le tournant de la Troisième République d'une empreinte indélébile.",
    image: '/images/declaration-troisieme-republique-cameroun.jpg',
    sourceUrl: 'https://ecobiz54.info/declaration-de-la-dynamique-vu-du-cameroun-au-nom-de-la-jeunesse/',
    tag: 'Déclaration',
    title: 'Déclaration de la Dynamique Vu du Cameroun : au nom de la jeunesse',
    contentHtml: `
      <p>Camerounaises, Camerounais, Jeunesse du Cameroun, fers de lance de la Nation, Ma Génération … Notre Génération,</p>

      <p>Ce 4 avril 2026, le Parlement réuni en Congrès vient de clore un chapitre pour en ouvrir un autre : celui de la Troisième République. Ce n’est pas un simple ajustement de textes ; c’est une mutation profonde de notre architecture institutionnelle. La Dynamique Vu du Cameroun prend officiellement la parole pour marquer ce tournant d’une empreinte indélébile.</p>

      <p>Une modification constitutionnelle est un acte grave et historique qui engage l’avenir sur des décennies. Pourtant, la Dynamique Vu du Cameroun ne peut que constater, avec une amertume lucide, que ce moment de refondation nationale s’est opéré dans un silence participatif assourdissant.</p>

      <h2>Le Regret d’une Occasion Manquée.</h2>
      <p>Nous regrettons profondément que la jeunesse camerounaise, qui constitue plus de 70 % de notre population et qui héritera seule des conséquences de ces réformes, n’ait été à aucun moment associée à l’initiative. Où était la consultation populaire ? Où était le pré-référendum d’idées ?</p>

      <p>Nous rappelons avec force qu’au lendemain d’une crise post-électorale en 2025 où la jeunesse a été en première ligne tant dans l’expression souveraine des urnes que dans la défense de ses convictions dans la rue aucune initiative n’a été prise pour instaurer un dialogue préalable avec les corps intermédiaires. Lors de sa prestation de serment le 6 novembre 2025, le Président de la République avait pourtant solennellement promis une implication accrue des jeunes et des femmes dans les responsabilités politiques du pays. Aujourd’hui, le constat est froid : ni la société civile, ni les organisations de jeunesse n’ont été consultées pour recueillir leurs attentes sur la Loi Fondamentale qui régira leur vie.</p>

      <h2>Une Transition pour qui ?</h2>
      <p>L’instauration d’un poste de Vice-Président de la République est présentée comme un aménagement institutionnel majeur. Mais la Dynamique Vu du Cameroun s’interroge froidement :</p>

      <p>Quelles seront les responsabilités réelles de ce Vice-Président ?</p>
      <p>S’agit-il d’un véritable mécanisme de transition politique générationnelle ou d’un simple réaménagement de l’ordre établi ?</p>
      <p>Cette mutation va-t-elle enfin apporter la résolution des maux qui consument notre pays sans jamais le faire briller ?</p>

      <p>Nous voulons des réponses sur le retour définitif à la paix dans le Nord-Ouest et le Sud-Ouest, sur le chômage endémique qui vide nos terres de leurs talents, sur la question de la diaspora et de la double nationalité, et sur la confiscation des opportunités économiques. La Troisième République ne peut se résumer à un changement d’organigramme ; elle doit être le moteur d’un renouvellement réel de la classe politique dans nos mairies, notre Parlement et nos ministères.</p>

      <p>Dans cet esprit de responsabilité, la Dynamique Vu du Cameroun lance un appel à l’action et à l’ouverture :</p>

      <h2>À l’Exécutif et au Parlement :</h2>
      <p>Nous saluons l’audace de la réforme, mais nous en rappelons la charge historique. Le Président de la République, lors de son investiture en 2025, a scellé un pacte solennel avec les femmes et les jeunes. Ces promesses ne sont plus des options ; elles sont désormais les clauses obligatoires de notre contrat social. Nous vous interpellons : la création du poste de Vice-Président et la nouvelle structuration de l’État ne doivent pas être des réceptacles de conservatisme, mais des moteurs de régénération. La stabilité ne se décrète pas, elle se construit par l’inclusion réelle de ceux qui feront le Cameroun de 2050.</p>

      <h2>Au futur Vice-Président de la République :</h2>
      <p>Votre charge sera le baromètre de la réussite de cette Troisième République. Bien que l’étendue de vos missions soit définie par la haute discrétion du Président de la République, vous ne bénéficierez d’aucun état de grâce. La Nation exige que votre mandat soit celui de la rupture avec l’inertie.</p>

      <p>Votre loyauté envers le Chef de l’État est un impératif institutionnel, mais elle doit impérativement se doubler d’une audace politique et d’une proximitécharnelle avec les 70 % de la population qui constituent la jeunesse camerounaise. Nous vous attendons sur l’autel des résultats : l’extinction définitive des foyers de crise dans le Nord-Ouest et le Sud-Ouest, la cicatrisation des fractures nées de la présidentielle de 2025, et l’inversion immédiate d’un chômage qui transforme notre génie national en désespoir. Ne soyez pas un Vice-Président de bureau, mais le garant d’une stabilité qui écoute les frustrations de notre diaspora et les aspirations de nos territoires. Votre mission est de transformer la fidélité en efficacité.</p>

      <h2>Aux Partenaires Internationaux, Pays Amis et Frères :</h2>
      <p>Le Cameroun vit une transition institutionnelle majeure, souveraine et historique. Si nous saluons votre vigilance bienveillante et appelons à votre soutien constant envers nos institutions et notre peuple, nous affirmons avec une fermeté inébranlable que ce moment appartient exclusivement aux Camerounais. Le génie de notre peuple suffit à dessiner son destin ; votre rôle est d’accompagner cet élan, non de le diriger, que ce soit de manière directe ou par des canaux détournés. À cet effet, nous interpellons avec gravité ces associations, groupes et mouvements de la société civile qui consentent à n’être que des relais d’influence étrangère : gardez-vous de transposer les agendas de vos bailleurs de fonds sur les réformes structurelles de notre Nation. Dans cette Troisième République en marche, seul le peuple camerounais détient le privilège sacré d’adouber ou de contester les choix de ses institutions. Dans le respect des relations d’amitié et des coopérations bilatérales et multilatérales.</p>

      <h2>À la Jeunesse camerounaise, héritière de la Troisième République :</h2>
      <p>Le temps de l’attente n’est plus une option, c’est une faute. Le temps où nous restions au balcon de l’histoire est révolu. N’attendez plus qu’on vous appelle : imposez votre présence. N’attendez plus qu’on vous ouvre la porte : postulez.</p>

      <p>À tous les niveaux de l’État, dans chaque interstice de responsabilité politique, administrative et publique, manifestez-vous. Nous prenons le Président de la République au mot : les promesses de 2025 ne sont pas des trophées de campagne, ce sont nos droits de tirage sur l’avenir.</p>

      <p>Si les pesanteurs bureaucratiques, les réseaux d’influence ou les blocus politiques tentent de saboter cet élan de renouveau, affrontez-les. Faites-le avec l’audace des bâtisseursqui ne craignent pas la pierre, avec la rigueurdes patriotes qui placent l’intérêt supérieur au-dessus des privilèges, avec la sagesse puisée à la source de nos aînés et avec cette vigueur incandescente qui est le privilège unique de notre jeunesse.</p>

      <p>Dans le respect absolu de nos institutions, nous devons être ceux qui occupent le terrain, ceux qui conçoivent l’alternative et ceux qui exécutent la vision. La Troisième République n’est pas un cadeau que l’on reçoit, c’est un territoire que l’on conquiert par la compétence et l’engagement.</p>

      <p>Allons dans les mairies pour réinventer la proximité !</p>
      <p>Allons au Parlement pour porter la voix des sans-voix !</p>
      <p>Allons dans les directions d’entreprises et les ministères pour injecter le virus de la performance !</p>
      <p>Allons dans les commissions nationales et les services de sécurité pour garantir la stabilité et la loyauté !</p>
      <p>Allons dans nos institutions de coopération pour faire rayonner le génie camerounais à l’international !</p>

      <p>La Troisième République appartient à ceux qui ont le courage de s’en saisir ici et maintenant. Ne demandez plus ce que le pays fait pour vous, montrez-leur ce que vous faites déjà pour le pays. Levez-vous. Postulez. Agissez.</p>

      <p>Ma posture, en tant que Présidente de la Dynamique Vu du Cameroun, est celle d’une sentinelle.</p>
      <p>Nous ne sommes pas dans l’opposition de principe, nous sommes dans l’influence de résultat. Nous offrons une alternative objective, froide et stratégique. Nous sommes le réseau des consciences prêtes à servir, prêtes à transformer la contrainte en opportunité.</p>

      <p>La Troisième République sera le miroir de notre audace collective. Que chaque Camerounais, où qu’il se trouve, se sente investi d’une part de cette souveraineté nouvelle.</p>

      <blockquote>Le changement ne se fera pas sans nous. Il se fera par nous.</blockquote>

      <p>Fait à Yaoundé, le 4 Avril 2026</p>
      <p><strong>Queen Jokem</strong></p>
      <p>Présidente Exécutive, Dynamique Vu du Cameroun 🇨🇲</p>
      <p>Experte en Communication Politique</p>
    `,
  },
  'crise-migration-societe-civile-camerounaise-sommet-afrique-france-2026': {
    author: 'Sara Timb',
    date: '21 février 2026',
    excerpt:
      "Une tribune sur la migration, la fuite des compétences, les faux recrutements et la responsabilité stratégique de la société civile camerounaise à l'aube du Sommet Afrique-France 2026.",
    image: '/images/crise-migration-image-pj.png',
    sourceUrl:
      'https://voixdesjeunes.com/actualite/crise-migration-la-societe-civile-camerounaise-aux-marges-d-un-enjeu-brulant-a-l-aube-du-sommet-afrique-france-2026',
    tag: 'Tribune',
    title:
      "Crise migration : la société civile camerounaise aux marges d'un enjeu brûlant",
    contentHtml: `
      <p>Alors que les projecteurs diplomatiques sur le continent se braquent sur le Sommet Afrique-France de Nairobi, un silence assourdissant pèse sur une tragédie humaine et économique sans précédent au Cameroun et en Afrique.</p>
      <p>Entre mouvements migratoires non contrôlés et le piège mortel de faux recrutements pour le front russo-ukrainien, la jeunesse camerounaise et africaine est devenue la variable d'ajustement de crises globales. Face à cette « migration de sacrifice » la société civile camerounaise et africaine est appelée à franchir un nouveau cap : celui d'une co-responsabilité stratégique pleinement assumée - loin de l'« humanitaire-spectacle » et ancrée dans un mixte solution qui dépasse les tables rondes.</p>

      <p>Une date rayonne dans l'agenda diplomatique, un lieu de confluence - véritable carrefour de l'Afrique de l'Est - s'apprête à répondre à sa vocation en nouant dialogues et rencontres entre deux continents liés par l'histoire ; entre moult nations appelées à conjuguer leurs inspirations et leurs aspirations. Ainsi Le Sommet Afrique-France point et s'annonce comme un espace stratégique de redéfinition des équilibres économiques, de consolidation des coopérations et de refondation des solidarités.</p>

      <p>Ces intérêts stratégiques qui affluent, sans doute, vers une heureuse convergence, demeurent traversés par des mémoires partagées et des espérances politiques qui engagent l'avenir.</p>

      <p>Placé sous le sceau de l'économie, le Sommet Afrique - France qui se déroulera le 11 mai 2026 à Nairobi au Kenya, offre à la fois un motif légitime de satisfaction et un bouquet d'interrogations qui s'impose avec gravité et lucidité, car si aucun développement durable ne saurait s'affranchir de politiques économiques structurées, ambitieuses et adaptées aux mutations profondes du monde, pourrait-on parler d'économie sans intégrer, dans toute sa complexité, la question migratoire ?</p>

      <p>Peut-on élaborer des politiques d'investissement, de compétitivité et d'innovation sans considérer les dynamiques de mobilité humaine qui façonnent les marchés du travail, redistribuent les compétences et redessinent les équilibres démographiques ?</p>

      <p>Selon le Fonds Monétaire International, le nombre de migrants d'Afrique subsaharienne dans les pays de l'OCDE pourrait passer d'environ 7 millions en 2013 à environ 34 millions en 2050.</p>

      <blockquote>Birago Diop rappelait que « quand la mémoire va chercher du bois mort, elle ramène toujours le fagot qui lui plaît ».</blockquote>

      <p>En tant qu'africain, le fagot que notre mémoire collective exhume n'est pas toujours celui dont nous aimerions nous enorgueillir ; il est cependant d'une insigne éloquence sur l'impact des dynamiques migratoires en Afrique. Il dit les espoirs arrachés aux terres natales, les talents dispersés aux quatre coins d'un monde qui les a souvent mieux reconnus que leurs patries d'origine et les trajectoires brisées sur les routes de l'exil,</p>

      <blockquote>Car ils sont là nos morts de Gibraltar,<br>Entre Tanger et Tarifa<br>Nous savons qu'ils sont bien là et non là-bas<br>Où le parfum des lieux qu'ils n'ont point connus<br>Baigne et les péniches et les paquebots d'une pâle brune.</blockquote>

      <p>Il n'est point question de blâmer ces africain.e.s, dont les choix relèvent souvent de la recherche légitime de conditions de travail dignes et de reconnaissance professionnelle. Il s'agit de ne point occulter un constat pour le moins triste : l'absence de politiques concertées - favorisant la mobilité circulaire, le brain gain, l'investissement productif des diasporas - fait de l'émigration un facteur limitant.</p>

      <h2>L'émigration et le business du désespoir : un double tacle au progrès du Cameroun</h2>
      <p>Le cas du Cameroun revêt, à cet égard, une gravité qui ne saurait être éludée. Les données récentes relatives à l'immigration légale vers le Canada - hors province de Québec - révèlent une tendance particulièrement significative : le Cameroun constitue désormais, et de loin, le premier bassin d'émigration des personnes d'expression française à destination du Canada.</p>

      <p>En 2024, plus de 10 000 ressortissants camerounais ont ainsi été admis, soit un volume près de trois fois supérieur à celui du second pays de provenance, l'Algérie, qui enregistre moins de 4 000 admissions sur la même période.</p>

      <p>Il importe de préciser que cette mobilité concerne majoritairement des profils hautement qualifiés - notamment dans les secteurs de l'éducation et de la santé - précisément identifiés comme stratégiques et hautement désirés sur le marché du travail canadien. Autrement dit, il ne s'agit pas d'une migration marginale, mais d'une « fuite de cerveaux » si préjudiciable à notre société.</p>

      <p>Par ailleurs, le Cameroun figure également parmi les dix principaux pays dont les ressortissants.e.s ont obtenu un premier visa pour la France en 2024. À ces flux réguliers s'ajoute la présence remarquée de migrant.e.s camerounais.e.s en situation irrégulière sur le territoire français, dont le nombre exact échappe quelque peu aux statistiques officielles, mais, qui participent néanmoins aux dynamiques migratoires de notre époque.</p>

      <p>En outre, le rapport du collectif All Eyes on Wagner, rendu public au début du mois de février, met en lumière un dispositif de captation condamnable : le « Business du désespoir ». Sous l'apparence rassurante d'une migration régulière à visée professionnelle, des ressortissants.e.s africain.e.s ont été recrutés de manière trompeuse pour être projetés sur la scène des opérations de la guerre opposant la Russie à l'Ukraine. Selon les données avancées, au moins 1 417 Africain.e.s, certains sans formation militaire à la base, ont ainsi été intégrés dans des dispositifs militaires, à la faveur de promesses fallacieuses d'emplois civils.</p>

      <p>Dans cette configuration alarmante, le Cameroun apparaît comme l'un des foyers majeurs de ce recrutement. Avec 355 ressortissants identifiés parmi les recrues, il se situe au deuxième rang des nationalités les plus représentées et constitue, au sens large, l'un des principaux viviers mobilisés sur le continent.</p>

      <p>Les procédés décrits frappent par leur simplicité méthodique : des agences de voyages, dont les enseignes se multiplient dans plusieurs villes camerounaises, proposent des départs vers la Russie en garantissant des emplois dans le bâtiment, la restauration ou d'autres secteurs techniques. Derrière ces perspectives professionnelles ostensiblement attractives se profilerait, pour nombre de jeunes, une incorporation contrainte dans le conflit Russo-ukrainien dont ils ne maîtrisent aucunement les enjeux.</p>

      <p>Le bilan humain est particulièrement accablant : 94 décès de jeunes camerounais déjà recensés. 94 vies interrompues. 94 familles confrontées à l'irréparable. Ce chiffre, à lui seul, impose un sursaut moral et politique.</p>

      <p>Comment accepter que des jeunes animés par la quête légitime d'un avenir se retrouvent instrumentalisés dans une guerre étrangère à leurs aspirations ?</p>

      <p>Comment tolérer que la recherche d'une insertion professionnelle se transforme en exposition meurtrière, au point de réduire des trajectoires de vies à de simples variables de complémentarité militaire ?</p>

      <p>Plus préoccupant encore est le contraste des réactions institutionnelles. Tandis que le Kenya s'est solennellement saisi du dossier, engageant des démarches diplomatiques, le silence observé au Cameroun interroge et inquiète.</p>

      <h2>Que peut la société civile ?</h2>
      <p>Au Cameroun, le phénomène peine à susciter un débat public d'ampleur. Certaines organisations de la société civile impliquées dans des dynamiques de coopérations internationales semblent l'aborder avec détachement et retenue, privilégiant des annonces ponctuelles et des initiatives à portée symbolique plutôt qu'une interpellation stratégique proportionnée à la gravité des faits.</p>

      <p>Il se confirme que le Cameroun est l'un réservoir majeur de capital humain pour des économies développées en quête de compétences. Cette réalité impose une réflexion approfondie sur les conséquences, pour notre pays, d'un tel mouvement - à la fois opportunité de rayonnement diasporique et risque d'érosion durable de nos ressources humaines essentielles.</p>

      <p>Cela convoque l'une des recommandations phares du Groupe d'étude sur l'Immigration et l'Intégration (IMI) du Comité Économique et Social Européen (CESE) : « les États doivent intensifier leurs efforts pour aboutir à une coopération plus structurée entre les OSC et les autorités gouvernementales, de façon à créer des synergies ainsi qu'à mieux utiliser les connaissances et les ressources disponibles de part et d'autre. Il convient de mettre davantage à profit l'expertise de terrain des OSC lors de la conception de stratégies et de mesures d'intégration, en vue d'accroître leur efficacité ».</p>

      <p>Cela va sans dire que les OSCs ont un rôle significatif dans la lutte contre l'émigration clandestine et la réinstallation des migrant.e.s de retour.</p>

      <p>L'enjeu migratoire dépasse la seule question des départs : il engage la souveraineté, la réputation et la qualité du dialogue diplomatique.</p>

      <p>Il est impératif que les organisations de la société civile, travaillant dans le cadre du dialogue et du partenariat - et bénéficiant, à ce titre, des financements, de la visibilité et de la reconnaissance des puissances partenaires - puissent sortir des slogans et des annonces tapageuses sans efficacité opérationnelle pour engager en synergie avec l'État du Cameroun, une réflexion stratégique.</p>

      <p>Cette réflexion devra porter sur la régulation des agences de recrutement, la protection consulaire, la responsabilité des intermédiaires et, plus largement, sur les conditions économiques et sociales qui rendent notre jeunesse vulnérable aux promesses les plus périlleuses.</p>

      <p>Il n'est donc pas question d'ériger en solution ou ébauche de solution une simple parade sur la place publique à une date hautement symbolique ou encore un simple reportage télévisé et des articles presses annonçant des campagnes de sensibilisation dont l'effectivité demeure, jusqu'à présent, incertaine.</p>

      <p>L'exigence véritable consiste à donner aux jeunes vulnérables la possibilité de consolider leurs revenus depuis le Cameroun ; il faut permettre aux migrant.e.s de retour de pouvoir réussir leur réinstallation en les rendant autonomes. La pertinence d'une approche holistique - articulant renforcement des capacités, financement des projets entrepreneuriaux et création de réseaux professionnels entre les écosystèmes nationaux et internationaux - s'impose désormais comme l'une des mesures efficaces.</p>

      <p>Dans cet élan, l'exemple de l'Italie est salutaire. Confrontée depuis plusieurs années à une pression migratoire accrue, l'Italie a progressivement structuré une réponse stratégique articulée autour de trois axes complémentaires : diplomatique, sécuritaire et socio-économique.</p>

      <p>Cette tribune se veut être la traduction éloquente du désir de ces jeunes d'ici et d'ailleurs qui pensent que la migration n'est pas un sujet périphérique ; elle est déterminante pour toutes stratégies économiques. Puisse l'écho de cette évidence résonner durant l'opéra de voix africaines et européennes réunies en choeur pour faire fredonner une symphonie qui inspire et connecte à Nairobi.</p>

      <p>Bon sommet !</p>

      <p><strong>Sara Timb</strong></p>
      <p>Pour la Dynamique « Vu du Cameroun »</p>

      <h2>Biographie</h2>
      <p>Sara TIMB « Mésange » est une écrivaine camerounaise multirécompensée, doctorante en biotechnologies végétales à l'Université de Yaoundé I, entrepreneure sociale et membre de la dynamique « Vu du Cameroun ». Auteure de 02 livres, elle figure parmi les 06 écrivaines africaines sélectionnées pour contribuer à l'édition 2025 du World Poetry Almanac. Passionnée de politique, elle est nommée Responsable de la rédaction stratégique et des contenus de campagne dans l'équipe nationale de campagne du PCRN pour l'élection présidentielle du 12 octobre 2025. En 2024, elle fonde THE POETBUILDERS et lance le Programme J'écris Au Cameroun (PJAC), une initiative littéraire et pédagogique qui vise à implémenter une approche innovante de l'apprentissage de la littérature. Son engagement lui vaut d'être sélectionnée en août 2024 parmi les 45 femmes africaines entrepreneures à fort impact sur le continent pour rejoindre la cohorte 2024 du Social & Inclusive Business Camp, un programme prestigieux de l'Agence Française de Développement (AFD). Sara TIMB est aussi Directrice exécutive d'ABL Cameroon (African Business Leaders) et Représentante Nationale de l'OJA (Organisation des Jeunes Africains).</p>

      <p>Le texte intégral est disponible sur La Voix des Jeunes via le lien source associé à cette note.</p>
    `,
  },
  'vu-de-yaounde-partenariat-cameroun-france-en-2025': {
    author: 'Queen Jokem et Éric Léonel Loumou',
    date: '9 janvier 2026',
    excerpt:
      "Une lecture camerounaise du partenariat Cameroun-France en 2025, entre mémoire assumée, coopération économique, sécurité, jeunesse et bataille des récits.",
    image: '/images/partenariat-cameroun-france-2025.jpg',
    sourceUrl:
      'https://lavoixducentre.info/2026/01/09/vu-de-yaounde-le-partenariat-cameroun-france-en-2025/',
    tag: 'Analyse',
    title: 'Vu de Yaoundé, le partenariat Cameroun - France en 2025',
    contentHtml: `
      <p>Vue depuis le Cameroun, l'année 2025 n'a pas été celle d'un spectaculaire tournant dans la relation avec la France, mais celle d'un ajustement maîtrisé. Dans un environnement régional marqué par des recompositions géopolitiques, une pression informationnelle accrue et une diversification assumée des partenariats, Yaoundé comme Paris ont privilégié la consolidation à la rupture.</p>

      <p>Loin des effets d'annonce, la relation franco-camerounaise s'est inscrite dans une logique pragmatique, fondée sur des intérêts convergents et une lecture réaliste des contraintes régionales. Pour le Cameroun, il s'agissait avant tout de sécuriser ses priorités nationales ; pour la France, de maintenir un ancrage crédible en Afrique centrale à partir d'un partenaire stable et structurant.</p>

      <h2>Assumer l'histoire pour stabiliser le partenariat</h2>
      <p>L'un des faits politiques marquants de l'année reste la remise du rapport du Comité mixte pluridisciplinaire France-Cameroun sur la période 1945-1971. Attendu de longue date, ce travail scientifique dépasse le seul registre mémoriel. Il constitue, pour les deux États, un outil politique permettant de désamorcer une question longtemps instrumentalisée dans l'espace public camerounais comme dans les arènes informationnelles africaines.</p>

      <p>La reconnaissance par le président Emmanuel Macron de la répression exercée durant la lutte pour l'indépendance camerounaise s'inscrit dans une démarche désormais assumée par Paris : reconnaître pour crédibiliser. Si ce geste ne saurait suffire à refermer toutes les blessures, il contribue néanmoins à assainir le cadre du dialogue bilatéral, condition nécessaire à toute coopération durable.</p>

      <p>Du point de vue camerounais, cette séquence mémorielle a surtout permis de replacer la relation sur un terrain plus lisible, moins chargé symboliquement, et donc plus propice à des échanges orientés vers l'avenir.</p>

      <h2>Une coopération économique recentrée sur l'impact</h2>
      <p>Sur le plan économique, l'année 2025 confirme une évolution notable : la coopération franco-camerounaise se concentre désormais sur des secteurs identifiés comme prioritaires par les autorités camerounaises - énergie, infrastructures, financement de projets structurants et appui au secteur privé.</p>

      <p>Le financement conjoint franco-britannique de 51,8 milliards FCFA en faveur de la Cameroon Development Corporation (CDC) illustre cette dynamique. Plus qu'un appui financier, il s'agit d'un signal politique et économique : soutien à un acteur local stratégique, mobilisation de partenaires internationaux et objectif clair de relance industrielle et d'emploi.</p>

      <p>Cette approche, fondée sur des interventions ciblées, mesurables et cofinancées, répond autant aux attentes camerounaises qu'à la volonté française de démontrer l'utilité concrète de son engagement. Elle traduit un changement de méthode : moins de dispersion, plus de lisibilité. Le méga projet hydroélectrique de Nachtigal en est une illustration supplémentaire.</p>

      <h2>Sécurité : continuité et discrétion assumée</h2>
      <p>Dans un contexte sécuritaire toujours sensible en Afrique centrale, la coopération en matière de défense et de sécurité s'est poursuivie sans rupture, mais sans ostentation. Formations, échanges institutionnels et appui technique restent au coeur du dispositif.</p>

      <p>Cette posture répond à une double lecture. D'une part, le Cameroun privilégie le renforcement de ses propres capacités nationales. D'autre part, la France acte les limites des modèles d'intervention directe, désormais largement contestés sur le continent. La stabilité régionale passe moins par la visibilité militaire que par la coopération institutionnelle et la montée en compétences.</p>

      <p>À cet égard, le Cameroun apparaît comme un partenaire clé permettant à la France de maintenir une présence sécuritaire discrète mais stratégique en Afrique centrale. Ce partenariat a permis au Cameroun de lutter efficacement contre le terrorisme et grande piraterie maritime dans le golf de guinée.</p>

      <h2>Jeunesse, innovation et capital humain</h2>
      <p>Autre axe structurant de l'année 2025 : l'investissement dans le capital humain. Les programmes de soutien à l'entrepreneuriat, à l'image de StartUp 237, ont accompagné de jeunes porteurs de projets camerounais, avec une attention particulière portée aux femmes et aux publics sous-représentés.</p>

      <p>La coopération académique, via l'Institut français et l'Agence universitaire de la Francophonie, s'est également renforcée. Pour le Cameroun, ces dispositifs participent à la montée en compétences et à l'ouverture internationale de sa jeunesse. Pour la France, ils constituent un levier d'influence durable, fondé sur la formation, la circulation des savoirs et les réseaux.</p>

      <p>Former plutôt qu'assister, connecter plutôt que substituer : cette logique, partagée, structure désormais l'un des piliers les plus consensuels du partenariat.</p>

      <h2>Soft power et bataille des récits</h2>
      <p>Sur le terrain culturel et linguistique, la France conserve un avantage comparatif réel. Les actions de l'Alliance française, les échanges artistiques et les programmes éducatifs continuent de jouer un rôle structurant. Toutefois, cet espace est de plus en plus disputé par de nouveaux acteurs, notamment russes et chinois, très présents dans les médias et sur les réseaux sociaux.</p>

      <p>L'année 2025 a mis en évidence un enjeu central : agir ne suffit plus, il faut rendre l'action lisible. Dans un environnement informationnel saturé, la perception compte autant que l'initiative elle-même. Une autre urgence stratégique émerge, l'intensification des collaboration stratégiques endogènes.</p>

      <h2>2026 : une année charnière</h2>
      <p>À l'horizon 2026, plusieurs échéances s'annoncent décisives. Le Sommet Afrique-France de Nairobi constituera un test majeur : capacité à intégrer les jeunes acteurs économiques africains, à donner une place réelle aux jeunesses et à proposer un partenariat perçu comme équilibré.</p>

      <p>Pour le Cameroun, l'enjeu n'est pas de raviver une relation héritée, mais d'en façonner une nouvelle, alignée sur ses priorités nationales. Pour la France, le Cameroun apparaît de plus en plus comme un point d'ancrage stratégique, à partir duquel repenser et redéployer sa présence en Afrique centrale.</p>

      <p>Les bases ont été posées en 2025. Leur traduction politique, économique et symbolique en 2026 déterminera la capacité du partenariat camerouno-français à s'inscrire durablement dans le paysage africain du XXIe siècle.</p>

      <p><strong>Queen Jokem et Éric Léonel Loumou</strong></p>

      <p>Le texte intégral est disponible sur La Voix du Centre via le lien source associé à cette note.</p>
    `,
  },
  'sommet-afrique-france-2026-nairobi-feuille-de-route-societe-civile': {
    author: 'Annette Olinga',
    date: '23 février 2026',
    excerpt:
      "Retour sur la concertation organisée à Yaoundé par Vu du Cameroun pour préparer une contribution citoyenne au Sommet Afrique-France 2026 de Nairobi.",
    image: '/images/Nairobi-2026-le-Cameroun.jpg',
    sourceUrl:
      'https://globalinfosnews.com/sommet-afrique-france-2026-a-nairobi-la-societe-civile-camerounaise-prepare-sa-feuille-de-route-pour-un-partenariat-renouvele-avec-la-france/',
    tag: 'Concertation',
    title:
      "Nairobi 2026 : le Cameroun face au défi d'une diplomatie d'influence et d'une coopération fondée sur les intérêts",
    contentHtml: `
      <h2>De la coopération subie à la coopération négociée</h2>
      <p>Pendant longtemps, la coopération internationale a été principalement appréhendée sous l'angle de l'aide, du financement et de l'accompagnement technique. Cette conception, progressivement remise en cause, laisse place à une approche davantage fondée sur le partenariat, la réciprocité et la recherche d'intérêts convergents.</p>
      <p>L'enjeu n'est donc plus seulement de savoir ce que la France, ou tout autre partenaire international, peut apporter au Cameroun. Il est également de déterminer ce que le Cameroun souhaite obtenir, ce qu'il peut proposer et, surtout, quelles garanties peuvent être associées aux engagements pris.</p>
      <p>La notion de « co-responsabilité » évoquée lors de la concertation de Yaoundé prend ici tout son sens. Elle suppose une rupture avec une culture de dépendance qui placerait systématiquement le partenaire extérieur dans la position du financeur, du prescripteur ou du technicien, tandis que l'acteur africain serait réduit au rôle de bénéficiaire.</p>
      <p>Une coopération véritablement stratégique devrait plutôt fonctionner comme un échange d'intérêts : investissements contre environnement favorable, transfert de compétences contre accès au marché, innovation contre développement de chaînes de valeur locales, coopération sécuritaire contre renforcement des capacités nationales, diplomatie culturelle contre influence réciproque.</p>
      <p>Cette évolution exige toutefois une condition préalable : la définition d'une doctrine nationale de partenariat.</p>

      <h2>Nairobi ne doit pas seulement être un sommet ; il doit devenir un espace de négociation</h2>
      <p>L'une des principales leçons que l'on peut tirer de l'expérience de Montpellier est que les recommandations issues d'un sommet ne produisent pas automatiquement des résultats.</p>
      <p>Entre la déclaration politique et sa mise en oeuvre existe une chaîne complexe : volonté gouvernementale, capacité administrative, mobilisation des ressources, mécanismes de suivi, appropriation nationale et capacité des acteurs à maintenir la pression sur les engagements pris.</p>
      <p>C'est précisément sur ce terrain que se joue la véritable bataille stratégique.</p>
      <p>Pour le Cameroun, participer à Nairobi ne devrait donc pas se limiter à être représenté. L'enjeu est de disposer d'une feuille de route nationale, articulée autour de quelques priorités clairement identifiées et défendues par différents acteurs : État, secteur privé, société civile, universités, collectivités territoriales et diaspora.</p>
      <p>Une telle approche permettrait de transformer la participation camerounaise en véritable instrument d'influence.</p>
      <p>La question essentielle ne serait plus : « Que va proposer le sommet ? », mais plutôt : « Quels intérêts camerounais voulons-nous faire inscrire dans les résultats du sommet ? »</p>

      <h2>Le véritable enjeu : passer de la présence à l'influence</h2>
      <p>Dans les grandes rencontres internationales, la visibilité ne constitue pas nécessairement une influence.</p>
      <p>Être présent à une table de négociation ne signifie pas nécessairement avoir la capacité d'en modifier l'agenda. La participation devient influence lorsqu'elle s'appuie sur une connaissance précise des rapports de force, une stratégie d'alliance, des propositions crédibles et une capacité de mobilisation avant, pendant et après la rencontre.</p>
      <p>C'est là que la société civile peut jouer un rôle déterminant.</p>
      <p>Une société civile stratégique ne devrait pas seulement formuler des revendications. Elle devrait être capable de produire de l'expertise, d'identifier les opportunités, d'anticiper les évolutions, de construire des coalitions et de contribuer à l'évaluation des politiques publiques.</p>
      <p>La dynamique engagée par « Vu du Cameroun » présente, dans cette perspective, un intérêt particulier : elle cherche à créer un espace où les acteurs camerounais peuvent réfléchir en amont à leurs intérêts plutôt que de simplement réagir aux agendas élaborés ailleurs.</p>
      <p>Cette démarche correspond à une transformation plus large des relations internationales. L'État reste l'acteur central de la diplomatie, mais il n'est plus le seul producteur d'influence. Les entreprises, les organisations de la société civile, les universités, les médias, les diasporas et les réseaux professionnels constituent désormais autant de relais de puissance.</p>

      <h2>La jeunesse : une force démographique qui doit devenir une capacité stratégique</h2>
      <p>La question de la jeunesse occupe naturellement une place centrale dans cette réflexion.</p>
      <p>La jeunesse africaine représente une force démographique considérable. Mais la démographie ne devient un avantage stratégique que lorsqu'elle est convertie en compétences, en innovation, en entrepreneuriat et en capacité d'action collective.</p>
      <p>Le risque serait donc de réduire la participation des jeunes aux sommets internationaux à une dimension symbolique.</p>
      <p>La présence de jeunes Camerounais à Nairobi ne prendra véritablement son sens que si elle s'accompagne d'une capacité à défendre des propositions précises : emploi, innovation, transformation numérique, financement des entreprises, formation, mobilité professionnelle, industries culturelles et créatives, développement des territoires, transition énergétique ou encore gouvernance.</p>
      <p>La jeunesse doit ainsi passer du statut de public cible à celui de partenaire de négociation.</p>
      <p>Cette transformation suppose également une professionnalisation de la représentation. Les délégations de la société civile doivent être préparées, documentées et coordonnées. Elles doivent savoir quels objectifs poursuivre, quels interlocuteurs rencontrer, quelles alliances construire et quels résultats obtenir.</p>
      <p>Autrement dit, la participation citoyenne doit elle aussi relever d'une logique stratégique.</p>

      <h2>La France n'est plus le seul partenaire : une nouvelle géopolitique de l'offre</h2>
      <p>L'évolution du contexte africain impose également de replacer la relation franco-africaine dans une compétition internationale plus large.</p>
      <p>La France demeure un partenaire important du Cameroun, mais elle évolue désormais dans un environnement où d'autres puissances et acteurs économiques proposent leurs propres modèles de coopération, d'investissement, d'infrastructures, de sécurité ou d'innovation.</p>
      <p>Cette diversification constitue une opportunité pour les États africains.</p>
      <p>Elle leur offre la possibilité de comparer les offres, de négocier davantage et de rechercher des partenariats adaptés à leurs intérêts.</p>
      <p>Mais elle comporte également un risque : celui de passer d'une dépendance à un partenaire à une dispersion entre plusieurs partenaires sans stratégie nationale cohérente.</p>
      <p>La souveraineté stratégique ne consiste donc pas à remplacer un partenaire par un autre. Elle consiste à conserver la capacité de choisir.</p>
      <p>Pour le Cameroun, l'enjeu est ainsi de développer une diplomatie économique et d'influence capable de dialoguer avec plusieurs pôles de puissance tout en conservant une doctrine claire : quels secteurs sont prioritaires ? Quels investissements sont recherchés ? Quels transferts de technologies sont exigés ? Quels intérêts nationaux doivent être protégés ? Quels engagements doivent être évalués ?</p>

      <h2>Le défi du suivi : transformer les engagements en résultats</h2>
      <p>L'un des enseignements les plus importants de l'expérience de Montpellier réside dans la nécessité du suivi.</p>
      <p>Les sommets internationaux produisent souvent des déclarations ambitieuses. Mais leur impact réel dépend de la capacité des acteurs à transformer ces engagements en programmes, puis en résultats mesurables.</p>
      <p>C'est pourquoi la création de mécanismes de suivi apparaît comme une question stratégique majeure.</p>
      <p>Pour le Cameroun, il pourrait être pertinent de disposer d'un dispositif de veille et de suivi associant acteurs publics et non étatiques. Celui-ci pourrait documenter les engagements pris à Nairobi, identifier les responsables de leur mise en oeuvre, mesurer les progrès réalisés et publier périodiquement un bilan.</p>
      <p>Une telle architecture contribuerait à renforcer la crédibilité des acteurs camerounais.</p>
      <p>Elle permettrait également d'éviter un phénomène fréquent dans les relations internationales : la multiplication des engagements sans mécanisme efficace de reddition de comptes.</p>

      <h2>Vers une diplomatie camerounaise davantage fondée sur l'intelligence stratégique</h2>
      <p>Au fond, Nairobi pose une question qui dépasse la relation avec la France.</p>
      <p>Il s'agit de savoir si le Cameroun veut désormais aborder les grandes rencontres internationales comme des événements diplomatiques ou comme des espaces de compétition stratégique et de projection de ses intérêts nationaux.</p>
      <p>La seconde option suppose de renforcer les capacités d'analyse, de veille, de négociation et d'influence.</p>
      <p>Elle suppose également de mieux connecter l'expertise produite dans les universités, les think tanks, les organisations de la société civile et le secteur privé avec les processus de décision publique.</p>
      <p>La société civile peut contribuer à cette dynamique en devenant un véritable réservoir d'expertise nationale. L'État, de son côté, peut y trouver un partenaire capable d'identifier les attentes sociales, de tester des propositions et de contribuer à l'évaluation des politiques.</p>
      <p>Le véritable changement de paradigme serait donc moins institutionnel que méthodologique : passer d'une logique de réaction à une logique d'anticipation.</p>

      <h2>Nairobi comme test de maturité collective</h2>
      <p>Le Sommet Afrique-France de Nairobi constitue ainsi une occasion particulière pour le Cameroun.</p>
      <p>Il peut être abordé comme un rendez-vous diplomatique supplémentaire ou comme une opportunité de repositionnement.</p>
      <p>Dans le second cas, le pays devra arriver avec des priorités clairement définies, des acteurs préparés, des alliances identifiées et des objectifs mesurables.</p>
      <p>La société civile camerounaise, de son côté, devra éviter deux écueils : celui de l'enthousiasme sans stratégie et celui de la contestation sans proposition.</p>
      <p>La véritable influence se construit dans l'équilibre entre lucidité critique et capacité de proposition.</p>
      <p>Nairobi pourrait alors devenir davantage qu'un sommet entre États et partenaires. Il pourrait constituer un laboratoire d'une nouvelle relation entre le Cameroun, la France et, plus largement, les partenaires internationaux du continent : une relation fondée non plus sur la verticalité, mais sur la négociation ; non plus sur l'assistance, mais sur la création de valeur ; non plus sur la dépendance, mais sur l'interdépendance maîtrisée.</p>
      <p>La question décisive n'est finalement pas de savoir si le Cameroun sera entendu à Nairobi.</p>
      <p>Elle est de savoir s'il aura suffisamment préparé sa position pour être en mesure de se faire entendre.</p>
      <p>Et c'est peut-être là que se trouve le véritable enjeu stratégique de ce sommet : transformer une participation en influence, une influence en négociation, et une négociation en résultats concrets pour le Cameroun.</p>

      <p>Le texte intégral est disponible sur Global Infos News via le lien source associé à cette note.</p>
    `,
  },
  'publication-video-vu-du-cameroun-facebook-reel': {
    author: 'Vu du Cameroun',
    date: 'Publication externe',
    excerpt:
      "Publication vidéo liée à la dynamique Vu du Cameroun, à consulter directement sur Facebook.",
    image: '/images/carte.png',
    sourceUrl: 'https://web.facebook.com/reel/1296440635662593',
    tag: 'Vidéo',
    title: 'Publication vidéo Vu du Cameroun',
    contentHtml: `
      <p>Cette entrée référence une publication vidéo hébergée sur Facebook.</p>

      <p>Le contenu du Reel n'étant pas disponible sous forme de texte exploitable ici, la page sert de point de redirection propre vers la publication originale.</p>

      <p>Consultez la vidéo complète via le lien source associé à cette note.</p>
    `,
  },
}

const slug = computed(() => String(route.params.slug ?? ''))

const normalizeNote = (payload: ApiNote, fallback?: Note): Note => ({
  author: payload.author || fallback?.author || 'Vu du Cameroun',
  contentHtml: payload.content_html || payload.content || fallback?.contentHtml || '',
  date: payload.published_at || payload.date || fallback?.date || 'Publication',
  excerpt: payload.excerpt || fallback?.excerpt || '',
  image: fallback?.image || payload.cover_image || payload.image || '/images/carte.png',
  sourceUrl: payload.source_url || fallback?.sourceUrl || '',
  tag: payload.category || payload.tag || fallback?.tag || 'Note',
  title: payload.title || fallback?.title || 'Note citoyenne',
})

const noteFromManaged = (managedNote: PublicNote, fallback?: Note): Note => ({
  author: managedNote.author || fallback?.author || 'Vu du Cameroun',
  contentHtml: managedNote.contentHtml || fallback?.contentHtml || `<p>${managedNote.text}</p>`,
  date: managedNote.date || fallback?.date || 'Publication',
  excerpt: managedNote.text || fallback?.excerpt || '',
  image: managedNote.image || fallback?.image || '/images/carte.png',
  sourceUrl: managedNote.sourceUrl || fallback?.sourceUrl || '',
  tag: managedNote.tag || fallback?.tag || 'Note',
  title: managedNote.title || fallback?.title || 'Note citoyenne',
})

const sanitizeQuillHtml = (html: string) => {
  const allowedTags = new Set([
    'A',
    'BLOCKQUOTE',
    'BR',
    'EM',
    'H2',
    'H3',
    'H4',
    'LI',
    'OL',
    'P',
    'SPAN',
    'STRONG',
    'UL',
  ])
  const allowedAttributes = new Set(['class', 'href', 'rel', 'target'])
  const template = document.createElement('template')
  template.innerHTML = html

  template.content.querySelectorAll('*').forEach((node) => {
    if (!allowedTags.has(node.tagName)) {
      node.replaceWith(...Array.from(node.childNodes))
      return
    }

    Array.from(node.attributes).forEach((attribute) => {
      if (!allowedAttributes.has(attribute.name)) {
        node.removeAttribute(attribute.name)
        return
      }

      if (attribute.name === 'href') {
        const value = attribute.value.trim()
        if (!value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('mailto:')) {
          node.removeAttribute('href')
        }
      }
    })

    if (node.tagName === 'A') {
      node.setAttribute('rel', 'noopener noreferrer')
      node.setAttribute('target', '_blank')
    }
  })

  return template.innerHTML
}

const sanitizedContent = computed(() => sanitizeQuillHtml(note.value?.contentHtml || ''))
const relatedNotes = computed(() =>
  Object.entries(fallbackNotes)
    .filter(([relatedSlug]) => relatedSlug !== slug.value)
    .map(([relatedSlug, relatedNote]) => ({ slug: relatedSlug, ...relatedNote }))
)

const fetchNote = async () => {
  loading.value = true
  error.value = ''
  const staticFallback = fallbackNotes[slug.value]
  const managedFallback = loadManagedNotes().find((storedNote) => storedNote.slug === slug.value)
  if (managedFallback?.published === false) {
    note.value = null
    error.value = "Cette note n'est pas disponible pour le moment."
    loading.value = false
    return
  }

  const fallback = managedFallback ? noteFromManaged(managedFallback, staticFallback) : staticFallback

  const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
  const endpoint = import.meta.env.VITE_NOTES_ENDPOINT || '/api/notes'

  try {
    if (!baseUrl) throw new Error('API non configuree')
    const response = await fetch(`${baseUrl}${endpoint}/${slug.value}`)
    if (!response.ok) throw new Error(`Erreur API ${response.status}`)
    const payload = await response.json()
    note.value = normalizeNote(payload.data || payload.note || payload, fallback)
  } catch {
    note.value = fallback || null
    if (!note.value) error.value = "Cette note n'est pas disponible pour le moment."
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNote()
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observe(el))
})

watch(slug, fetchNote)
</script>

<template>
  <main class="note-detail-page">
    <section class="note-detail-hero section-pad">
      <div class="note-detail-bg" :style="noteHeroStyle" aria-hidden="true"></div>
      <div class="container">
        <div v-if="loading" class="note-state">Chargement de la note...</div>
        <div v-else-if="error" class="note-state">
          <p>{{ error }}</p>
          <RouterLink to="/notes" class="btn-ghost">Retour aux notes</RouterLink>
        </div>

        <article v-else-if="note" class="note-detail-layout">
          <div class="note-detail-copy">
            <h1>{{ note.title }}</h1>
            <p class="note-detail-excerpt">{{ note.excerpt }}</p>
            <div class="page-hero-actions reveal reveal-delay-3">
              <a href="#note-content" class="btn-primary">Lire</a>
              <RouterLink to="/notes" class="btn-ghost">Toutes les notes</RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section v-if="note && !loading" id="note-content" class="section-pad note-content-section">
      <div class="container">
        <div class="note-content-shell">
          <aside class="note-content-aside">
            <span class="label">Autres notes</span>
            <div v-if="relatedNotes.length" class="related-notes">
              <RouterLink
                v-for="related in relatedNotes"
                :key="related.slug"
                :to="`/notes/${related.slug}`"
                class="related-note"
              >
                <span>{{ related.tag }}</span>
                <strong>{{ related.title }}</strong>
              </RouterLink>
            </div>
            <p v-else>Aucune autre note publiée pour le moment.</p>
            <a v-if="note.sourceUrl" :href="note.sourceUrl" target="_blank" rel="noopener noreferrer" class="primary-link">
              Lire la source
            </a>
            <RouterLink to="/notes" class="secondary-link">Toutes les notes</RouterLink>
          </aside>
          <div class="note-quill-content ql-editor" v-html="sanitizedContent"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.note-detail-page {
  background: var(--black);
  color: var(--white);
}

.note-detail-hero {
  align-items: center;
  background: var(--black);
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

.note-detail-bg {
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.62), rgba(8, 8, 8, 0.86)),
    linear-gradient(90deg, rgba(8, 8, 8, 0.42), rgba(201, 168, 76, 0.15), rgba(8, 8, 8, 0.42)),
    url('/images/declaration-troisieme-republique-cameroun.jpg') top center / cover no-repeat;
  background-attachment: fixed;
  background-position: top center;
  background-size: cover;
  inset: 0;
  position: absolute;
}

.note-detail-breadcrumb {
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

.note-detail-breadcrumb a {
  color: var(--gold);
}

.note-detail-layout {
  display: block;
  margin: 0 auto;
  max-width: 1160px;
  position: relative;
  text-align: center;
  z-index: 1;
}

.note-detail-copy {
  margin-top: 0;
  max-width: none;
}

.note-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.note-detail-meta span {
  border: 1px solid var(--gold-line);
  color: var(--gold);
  font-family: 'Syne', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  padding: 0.5rem 0.8rem;
  text-transform: uppercase;
}

.note-detail-copy h1 {
  font-size: clamp(2rem, 4.2vw, 4.2rem);
  font-weight: 300;
  line-height: 0.98;
  margin: 0;
  max-width: none;
}

.note-detail-excerpt {
  color: rgba(245, 242, 236, 0.82);
  font-size: 1.04rem;
  line-height: 1.85;
  margin: 1.25rem auto 0;
  max-width: 900px;
}

.note-detail-cover {
  aspect-ratio: 16 / 7;
  background: var(--black-3);
  border: 1px solid var(--gold-line);
  overflow: hidden;
  width: 100%;
}

.note-detail-cover img {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  width: 100%;
}

.note-state {
  background: var(--black-3);
  border: 1px solid var(--gold-line);
  color: var(--white-dim);
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.note-state p {
  margin: 0 0 1.4rem;
}

.note-content-section {
  background: var(--black-2);
}

.note-content-shell {
  align-items: start;
  display: grid;
  gap: 4rem;
  grid-template-columns: minmax(0, 1fr) 320px;
}

.note-content-aside {
  background: var(--black-3);
  border: 1px solid var(--gold-line);
  padding: 2rem;
  position: sticky;
  top: 7rem;
  order: 2;
}

.note-content-aside p {
  color: var(--white-dim);
  font-size: 0.92rem;
  line-height: 1.75;
  margin: 1rem 0 1.5rem;
}

.note-content-aside .primary-link,
.note-content-aside .secondary-link {
  margin-top: 0.8rem;
  width: 100%;
}

.related-notes {
  display: grid;
  gap: 0.8rem;
  margin: 1.3rem 0 1.5rem;
}

.related-note {
  border: 1px solid var(--grey-dark);
  display: block;
  padding: 1rem;
  transition: border-color 0.25s ease, color 0.25s ease;
}

.related-note:hover {
  border-color: var(--gold-line);
}

.related-note span {
  color: var(--gold);
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.related-note strong {
  color: var(--white);
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.2;
}

.note-quill-content {
  background: var(--black-3);
  border: 1px solid var(--grey-dark);
  color: var(--white-dim);
  font-size: 1.05rem;
  line-height: 1.9;
  padding: clamp(2rem, 5vw, 4rem);
}

.note-quill-content :deep(h2),
.note-quill-content :deep(h3),
.note-quill-content :deep(h4) {
  color: var(--white);
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  line-height: 1.15;
  margin: 2rem 0 1rem;
}

.note-quill-content :deep(h2) {
  font-size: 2.3rem;
}

.note-quill-content :deep(h3) {
  font-size: 1.8rem;
}

.note-quill-content :deep(p),
.note-quill-content :deep(ul),
.note-quill-content :deep(ol),
.note-quill-content :deep(blockquote) {
  margin: 0 0 1.3rem;
}

.note-quill-content :deep(a) {
  color: var(--gold);
  text-decoration: underline;
}

.note-quill-content :deep(blockquote) {
  border-left: 2px solid var(--gold);
  color: var(--white);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-style: italic;
  line-height: 1.45;
  padding-left: 1.5rem;
}

.note-quill-content :deep(.ql-align-center) {
  text-align: center;
}

.note-quill-content :deep(.ql-align-right) {
  text-align: right;
}

.note-quill-content :deep(.ql-indent-1) {
  padding-left: 2rem;
}

.note-quill-content :deep(.ql-indent-2) {
  padding-left: 4rem;
}

@media (max-width: 1080px) {
  .note-detail-layout,
  .note-content-shell {
    grid-template-columns: 1fr;
  }

  .note-content-aside {
    position: static;
  }
}

@media (max-width: 760px) {
  .note-detail-hero {
    padding-top: 8rem;
  }

  .note-detail-copy h1 {
    font-size: clamp(2.4rem, 12vw, 4rem);
  }

  .note-detail-cover {
    aspect-ratio: 4 / 3;
  }

  .note-detail-meta span {
    font-size: 0.52rem;
  }
}
</style>
