import { useStaticQuery, graphql } from 'gatsby'

export const tagLinks = {
  albano: 'https://music.utoronto.ca/our-people.php?fid=11',
  albery: 'https://en.wikipedia.org/wiki/Tim_Albery',
  alden: 'https://en.wikipedia.org/wiki/Christopher_Alden_(director)',
  armfield: 'https://en.wikipedia.org/wiki/Neil_Armfield',
  bach: 'https://en.wikipedia.org/wiki/Johann_Sebastian_Bach',
  beckwith: 'https://www.schmopera.com/after-15-years-i-felt-like-having-a-party/',
  bedford: 'https://en.wikipedia.org/wiki/Steuart_Bedford',
  bicket: 'https://en.wikipedia.org/wiki/Harry_Bicket',
  biernacki: 'https://tabierna.wixsite.com/mynewwebsite',
  boyes:
    'https://soulpepper.ca/about-us/the-company/resident-artists/derek-boyes/184',
  britten: 'https://en.wikipedia.org/wiki/Benjamin_Britten',
  burton: 'https://ca.linkedin.com/in/sarahjane-burton-91316738',
  butterfield: 'https://en.wikipedia.org/wiki/Peter_Butterfield',
  curran: 'https://en.wikipedia.org/wiki/Paul_Curran_(director)',
  darlington: 'http://www.jonathan-darlington.com',
  davis: 'https://en.wikipedia.org/wiki/Andrew_Davis_(conductor)',
  'de carpentries': 'https://www.francoisdecarpentries.com',
  debus: 'https://learn.coc.ca/about-the-coc/johannes-debus',
  donizetti: 'https://en.wikipedia.org/wiki/Gaetano_Donizetti',
  doucet: 'https://nathaliedoucet.live',
  edison: 'https://en.wikipedia.org/wiki/Noel_Edison',
  elgar: 'https://en.wikipedia.org/wiki/Edward_Elgar',
  ferreira: 'https://www.wesleyferreira.com/press',
  garman:
    'https://crestedbuttemusicfestival.org/meet-brian-garman-cbmfs-new-opera-music-director/',
  glass: 'https://en.wikipedia.org/wiki/Philip_Glass',
  guarino: 'https://en.wikipedia.org/wiki/Robin_Guarino',
  guidarini: 'https://www.schmopera.com/scene/people/marco-guidarini/',
  handel: 'https://en.wikipedia.org/wiki/George_Frideric_Handel',
  hatch: 'https://web.wlu.ca/music/Hatch/biography.php',
  haydn: 'https://en.wikipedia.org/wiki/Joseph_Haydn',
  helfrich: 'https://www.samhelfrich.com',
  hinton: 'https://www.peterhinton.ca/biography',
  irving: 'https://ca.linkedin.com/in/simon-irving-814887110',
  isepp: 'https://en.wikipedia.org/wiki/Martin_Isepp',
  ivany: 'https://www.joelivany.com',
  judge: 'http://www.ianjudge.com',
  kazaras: 'http://www.uzanartists.com/portfolio/peter-kazaras/',
  kovatchev: 'https://www.operamusica.com/artist/julian-kovatchev/#biography',
  labadie:
    'http://www.violonsduroy.com/en/about/bernard-labadie-founding-conductor',
  lacey: 'http://www.williamlacey.com',
  larlee: 'https://www.standrewsartscouncil.com/anne-larlee/',
  lau: 'http://www.kevinlaumusic.com',
  lawless: 'https://www.musichall.uk.com/artists/directors/stephen-lawless',
  lepage: 'https://en.wikipedia.org/wiki/Robert_Lepage',
  'b. macdonald': 'https://en.wikipedia.org/wiki/Brian_Macdonald_(choreographer)',
  'r. macdonald': 'https://imgartists.com/roster/rory-macdonald/',
  macivor: 'https://en.wikipedia.org/wiki/Daniel_MacIvor',
  manson: 'https://www.annemanson.com',
  martin: 'https://www.stephaniemartinmusic.com',
  massenet: 'https://en.wikipedia.org/wiki/Jules_Massenet',
  menotti: 'https://en.wikipedia.org/wiki/Gian_Carlo_Menotti',
  mitchell: 'https://www.kingstonsymphony.ca/about/music-director/',
  mokrzewski: 'http://www.christophermokrzewski.com',
  montalbetti: 'https://www.facebook.com/barbara.montalbetti',
  montanaro: 'http://www.gmartandmusic.com/conductors/montanaro/',
  monteverdi: 'https://en.wikipedia.org/wiki/Claudio_Monteverdi',
  mozart: 'https://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
  newton: 'https://eccehomotheatre.com/home.html',
  oida: 'https://www.yoshioida.com',
  olmi: 'https://www.proscenium.at/kuenstler/paolo_olmi_en.php',
  paulus: 'https://en.wikipedia.org/wiki/Diane_Paulus',
  pérez: 'https://en.karstenwitt.com/alejo-perez',
  pergolesi: 'https://en.wikipedia.org/wiki/Giovanni_Battista_Pergolesi',
  phillips: 'http://www.grandriverchorus.com/html/history.shtml',
  prokofiev: 'https://en.wikipedia.org/wiki/Sergei_Prokofiev',
  puccini: 'https://en.wikipedia.org/wiki/Giacomo_Puccini',
  purcell: 'https://en.wikipedia.org/wiki/Henry_Purcell',
  rhodes: 'https://www.schmopera.com/scene/people/stephanie-rhodes/',
  richards: 'https://twitter.com/richards_markc',
  rovaris:
    'https://www.operaphila.org/about/our-people/leadership/corrado-rovaris/',
  'silva-marin': 'http://www.silva-marin.com/stage.html',
  strauss: 'https://en.wikipedia.org/wiki/Richard_Strauss',
  stravinsky: 'https://en.wikipedia.org/wiki/Igor_Stravinsky',
  verdi: 'https://en.wikipedia.org/wiki/Giuseppe_Verdi',
  vivier: 'https://en.wikipedia.org/wiki/Claude_Vivier',
  wainwright: 'http://rufuswainwright.com',
  walker: 'https://www.fletcherartists.com/artists/antony-walker/',
  way: 'https://www.facebook.com/justin.way.7545',
  wilkins: 'https://www.landmarksorchestra.org/team/christopher-wilkins/',
  'world premiere': 'https://en.wikipedia.org/wiki/Premiere',
}

export type Tag = keyof typeof tagLinks

interface Review {
  link: string
  quotation: string
  source: string
}

interface Title {
  lang: string
  text: string
}

interface Gig {
  description: string
  id: string
  link: string
  reviews: Review[]
  tags: Array<Tag>
  title: Title
}

export default (): Array<Gig> =>
  useStaticQuery(
    graphql`
      {
        allGigsYaml {
          nodes {
            id
            title {
              text
              lang
            }
            link
            description
            tags
            reviews {
              quotation
              source
              link
            }
          }
        }
      }
    `,
  ).allGigsYaml.nodes
