import { Translations } from "./types";

export const fi: Translations = {
  welcome: {
    title: "✦ Lumina ✦",
    subtitle: "Tekoälyn Tarot-lukija",
    text: "Tervetuloa, etsijä. Olen Lumina, oppaasi tuntemattoman verhon läpi. Kortit ovat odottaneet sinua. Aloitetaanko?",
    begin: "Aloita Lukeminen",
  },
  spreadSelect: {
    intro: "Ennen kuin aloitamme, minun on tiedettävä kuinka syvälle haluat katsoa. Valitse levitys — jokainen paljastaa kosmoksen eri tavalla...",
    cardLabel: "kortti",
    cardsLabel: "korttia",
  },
  question: {
    prompt: "Kerro nyt minulle... mikä painaa mieltäsi? Mikä kysymys on tuonut sinut korttien äärelle tänään?\n\nPuhu vapaasti — rakkaudesta, urasta, kohtaamastasi päätöksestä tai yksinkertaisesti siitä, mitä universumi haluaa sinun tietävän. Mitä avoimempi sydämesi on, sitä selkeämmin kortit puhuvat.",
    placeholder: "Esitä kysymyksesi...",
    submit: "Paljasta Kysymykseni",
  },
  userInfo: {
    questions: [
      { key: "name", question: "Anna minun ensin tutustua sinuun hieman. Millä nimellä kutsun sinua?" },
      { key: "age", question: "Kuinka monta vuodenaikaa olet kulkenut tällä maapallolla? Ikäsi, jos saan tietää." },
      { key: "occupation", question: "Mikä täyttää päiväsi? Työsi, käsityösi — mitä teet?" },
      { key: "status", question: "Vielä yksi asia — mikä on sydämesi nykytila? Oletko rakastunut, etsimässä vai paranemassa?" },
    ],
    placeholder: "Vastauksesi...",
    answer: "Vastaa",
    skip: "Ohita",
  },
  cardPick: {
    intro: "Kortit on levitetty eteesi kuvapuoli alaspäin, salaperäisyyden verhon alla. Älä kiirehdi. Anna intuition puhua mieltä kovemmin.",
    cardOf: "Kortti {current}/{total}:",
    faceDownLabel: "Kuvapuoli alaspäin oleva tarot-kortti",
  },
  thinking: [
    "Tähdet asettuvat linjaan...",
    "Tunnen energian muuttuvan...",
    "Maailmojen välinen verho ohenee...",
    "Anna minun virittäytyä värähteleesi...",
    "Kosmos kuiskaa...",
    "Tunnen jotain muotoutuvan...",
    "Kortit kuuntelevat...",
  ],
  loading: {
    phrases: [
      "Universumi kutoo lukemistasi...",
      "Kortit puhuvat kuiskaten... kuuntelen...",
      "Muinaiset energiat kohtaavat levityksessäsi...",
      "Kohtalon lankoja luetaan...",
      "Näen kuvioiden muotoutuvan tähtien valossa...",
    ],
    downloading: "Ladataan oraakkelia...",
    preparingTitle: "Valmistellaan lukemistasi",
    preparingSubtitle: "Lumina valmistautuu kanavoimaan kortteja. Tämä tapahtuu vain kerran — tulevat lukemiset ovat välittömiä.",
  },
  reading: {
    title: "Lukemisesi, {name}",
    subtitle: "{spread} — {count} korttia",
    questionLabel: "Kysymyksesi",
    interpretationTitle: "Universumi Puhuu",
    interpretationText: "Kortit on nostettu ja niiden energia on selkeä. Tätä lukemista valmistelee kosmos — pian Luminan tekoäly kanavoi levityksesi täyden tulkinnan. Tiedä nyt, että kortit ovat kuulleet sinut ja vastaukset muotoutuvat tähtien valossa.",
    placeholderNote: "✦ Tekoälypohjainen tulkinta tulossa pian ✦",
    restart: "Aloita Uusi Lukeminen",
    defaultName: "Etsijä",
    errorTitle: "Yhteys Katkesi",
    errorText: "Maailmankaikkeuden säikeet, jotka kutovat tulkintaasi, ovat tilapäisesti halkeilleet. Joskus maailmankaikkeuden energia on liian turbulenttia kanavoitavaksi selkeästi ensimmäisellä yrittämällä. Varmista, että henkesi on vakaa, ja yritä uudelleen, tai kenties etsi opastusta toisen portaalin (selaimen) kautta.",
    tryAgain: "Tasapainota ja yritä uudelleen",
  },
  mobileBlock: {
    title: "Käytä Työpöytäkonetta",
    message: "Etsijä, energiat, joita tarvitaan maailmankaikkeuden kanavoimiseen Luminan kautta, ovat valtavat. Tältä pieneltä laitteelta puuttuu henkinen 'laajuus' pitää yllä näkyä horjumatta. Jotta voisit nähdä selvästi, sinun on astuttava suuremman alttarin ääreen — pöytäkoneen. Siellä verho nostetaan.",
  },
  spreads: {
    single: {
      name: "Yksi Kortti",
      description: "Nopea vilkaisu kysymystäsi ympäröivään energiaan.",
      positions: [
        { name: "Vastaus", meaning: "Ydinenergia ja opastus kysymykseesi", instruction: "Sulje silmäsi. Pidä kysymyksesi sydämessäsi. Kun tunnet olevasi valmis, anna kätesi vetäytyä yhden kortin luo." },
      ],
    },
    "three-card": {
      name: "Kolmen Kortin Levitys",
      description: "Menneisyys, nykyisyys ja tulevaisuus — matkasi kaari.",
      positions: [
        { name: "Menneisyys", meaning: "Mikä on johtanut sinut tänne", instruction: "Mieti missä olet ollut. Mitkä tapahtumat muovasivat tämän hetken? Anna intuition ohjata kätesi korttiin, joka pitää menneisyyttäsi." },
        { name: "Nykyisyys", meaning: "Missä seisot nyt", instruction: "Tuo tietoisuutesi tähän hetkeen. Tunne ympärilläsi oleva energia. Valitse kortti, joka puhuu nykyisyydellesi." },
        { name: "Tulevaisuus", meaning: "Mitä edessä on", instruction: "Avaa lopuksi mielesi sille, mitä voi tulla. Älä yritä pakottaa vastausta — anna universumin paljastaa tie. Valitse viimeinen korttisi." },
      ],
    },
    "five-card": {
      name: "Viiden Kortin Risti",
      description: "Syvempi katsaus tilanteeseesi joka kulmasta.",
      positions: [
        { name: "Nykyisyys", meaning: "Nykyinen tilanteesi", instruction: "Keskity. Tunne kysymyksesi paino. Valitse kortti, joka edustaa sitä missä olet nyt." },
        { name: "Haaste", meaning: "Mikä seisoo tiellä", instruction: "Mieti esteitä joita kohtaat. Mikä pidättelee sinua? Anna kortin paljastaa itsensä." },
        { name: "Perusta", meaning: "Juurisyy kaiken alla", instruction: "Mene syvemmälle. Mikä on pinnan alla? Valitse kortti, joka puhuu piilotetusta totuudesta." },
        { name: "Lähimenneisyys", meaning: "Viimeaikaiset vaikuttavat tapahtumat", instruction: "Katso taaksesi. Mitkä viimeaikaiset tapahtumat kaikuvat vielä? Valitse kortti, joka kantaa sitä energiaa." },
        { name: "Potentiaali", meaning: "Paras mahdollinen lopputulos", instruction: "Katso nyt eteenpäin toivon kanssa. Mikä on korkein mahdollisuus? Valitse viimeinen korttisi avoimella sydämellä." },
      ],
    },
    horseshoe: {
      name: "Hevosenkenkälevitys",
      description: "Seitsemän korttia kattavaan näkymään polustasi.",
      positions: [
        { name: "Menneisyys", meaning: "Menneisyyden vaikutukset", instruction: "Aloita alusta. Anna muistojesi nousta hellästi ja valitse kortti, joka pitää menneisyytesi energiaa." },
        { name: "Nykyisyys", meaning: "Nykyiset olosuhteet", instruction: "Tuo itsesi täysipainoisesti tähän hetkeen. Mitä tunnet juuri nyt? Valitse kortti." },
        { name: "Piilovaikutukset", meaning: "Mitä et ehkä näe", instruction: "On voimia joita et voi nähdä. Luota intuitioosi täysin — valitse kortti miettimättä liikaa." },
        { name: "Esteet", meaning: "Voitettavat haasteet", instruction: "Tunnusta mikä seisoo sinun ja toiveesi välissä. Valitse kortti, joka edustaa sitä estettä." },
        { name: "Ulkoiset Vaikutukset", meaning: "Ihmiset ja energiat ympärilläsi", instruction: "Mieti elämäsi ihmisiä. Kuka vaikuttaa tähän tilanteeseen? Anna heidän energiansa ohjata valintaasi." },
        { name: "Neuvo", meaning: "Mitä universumi ehdottaa", instruction: "Avaudu opastukselle. Universumilla on viesti sinulle. Valitse kortti kunnioituksella." },
        { name: "Lopputulos", meaning: "Todennäköinen tulos", instruction: "Tämä on viimeinen kortti. Hengitä syvään. Mitä tahansa tuleekaan, luota että se on mitä sinun tarvitsee nähdä. Valitse nyt." },
      ],
    },
    "celtic-cross": {
      name: "Kelttiläinen Risti",
      description: "Klassinen kymmenen kortin levitys syvään, kerrokselliseen oivallukseen.",
      positions: [
        { name: "Nykyisyys", meaning: "Asian ydin", instruction: "Tämä kortti on kaiken keskipiste. Pidä kysymyksesi lähellä ja valitse kortti, joka resonoi syvimmin kanssasi juuri nyt." },
        { name: "Haaste", meaning: "Mikä ristii sinua", instruction: "Jokaisessa kysymyksessä on jännitettä. Tunne se jännite ja valitse kortti, joka ilmentää sitä." },
        { name: "Perusta", meaning: "Tilanteen juuri", instruction: "Kaiva syvälle pinnan alle. Mitkä tiedostamattomat voimat ovat pelissä? Valitse kortti vaistonvaraisesti." },
        { name: "Lähimenneisyys", meaning: "Mikä on katoamassa", instruction: "Jokin poistuu elämästäsi. Tunne se vapautuminen ja valitse kortti, joka vangitsee katoavan." },
        { name: "Kruunu", meaning: "Pyrkimyksesi ja paras lopputulos", instruction: "Katso ylös. Mitä toivot? Anna korkeimman toiveesi ohjata tätä valintaa." },
        { name: "Lähitulevaisuus", meaning: "Mikä lähestyy", instruction: "Jotain uutta tulee kohti sinua. Tunnetko sen? Valitse kortti, joka kantaa sen energiaa." },
        { name: "Voimasi", meaning: "Sisäiset voimavarasi", instruction: "Pohdi omaa voimaasi. Mitä voimaa kannat sisälläsi? Valitse kortti, joka peilaa sisäistä itseäsi." },
        { name: "Ulkoiset Voimat", meaning: "Miten muut näkevät sinut", instruction: "Astu itsesi ulkopuolelle. Miten maailma näkee sinut tässä tilanteessa? Valitse kortti, joka heijastaa sitä." },
        { name: "Toiveet ja Pelot", meaning: "Mitä haluat ja pelkäät", instruction: "Toivo ja pelko ovat usein saman kolikon kaksi puolta. Tunne molemmat ja valitse kortti, joka pitää sitä kaksinaisuutta." },
        { name: "Lopullinen Tulos", meaning: "Mihin tämä matka johtaa", instruction: "Tämä on viimeinen kortti. Ota hiljaisuuden hetki. Hengitä syvään. Kun olet valmis, anna sielusi valita kortti, joka täydentää lukemisesi." },
      ],
    },
  },
};
