import { Translations } from "./types";

export const sv: Translations = {
  welcome: {
    title: "✦ Lumina ✦",
    subtitle: "AI Tarot-läsare",
    text: "Välkommen, sökare. Jag är Lumina, din guide genom det okändas slöja. Korten har väntat på dig. Ska vi börja?",
    begin: "Börja Din Läsning",
  },
  spreadSelect: {
    intro: "Innan vi börjar måste jag veta hur djupt du vill se. Välj en uppläggning — var och en avslöjar kosmos på ett annat sätt...",
    cardLabel: "kort",
    cardsLabel: "kort",
  },
  question: {
    prompt: "Berätta nu för mig... vad tynger ditt sinne? Vilken fråga har fört dig till korten idag?\n\nTala fritt — om kärlek, karriär, ett beslut du står inför, eller helt enkelt vad universum vill att du ska veta. Ju öppnare ditt hjärta är, desto tydligare talar korten.",
    placeholder: "Ställ din fråga...",
    submit: "Avslöja Min Fråga",
  },
  userInfo: {
    questions: [
      { key: "name", question: "Låt mig först lära känna dig lite. Vad ska jag kalla dig?" },
      { key: "age", question: "Hur många årstider har du vandrat på denna jord? Din ålder, om du vill." },
      { key: "occupation", question: "Vad upptar dina dagar? Ditt arbete, ditt hantverk — vad gör du?" },
      { key: "status", question: "En sista sak — vad är ditt hjärtas nuvarande tillstånd? Är du förälskad, sökande eller läkande?" },
    ],
    placeholder: "Ditt svar...",
    answer: "Svara",
    skip: "Hoppa Över",
  },
  cardPick: {
    intro: "Korten ligger framför dig, med framsidan nedåt, höljda i mystik. Skynda inte. Låt din intuition tala högre än ditt sinne.",
    cardOf: "Kort {current} av {total}:",
    faceDownLabel: "Nedvända tarot-kort",
  },
  thinking: [
    "Stjärnorna ställer sig i linje...",
    "Jag känner att energin skiftar...",
    "Slöjan mellan världar tunnas ut...",
    "Låt mig stämma av med din vibration...",
    "Kosmos viskar...",
    "Jag känner att något formas...",
    "Korten lyssnar...",
  ],
  loading: {
    phrases: [
      "Universum väver din läsning...",
      "Korten talar i viskningar... jag lyssnar...",
      "Urgamla energier samlas kring din uppläggning...",
      "Ödets trådar avläses...",
      "Jag ser mönster formas i stjärnljuset...",
    ],
    downloading: "Laddar ner oraklet...",
    preparingTitle: "Förbereder din läsning",
    preparingSubtitle: "Lumina förbereder sig för att kanalisera korten. Detta sker bara en gång — framtida läsningar blir omedelbara.",
  },
  reading: {
    title: "Din Läsning, {name}",
    subtitle: "{spread} — {count} Kort",
    questionLabel: "Din Fråga",
    interpretationTitle: "Universum Talar",
    interpretationText: "Korten har dragits och deras energi är klar. Denna läsning förbereds av kosmos — snart kommer Luminas AI att kanalisera den fullständiga tolkningen av din uppläggning. Vet att korten har hört dig, och svaren tar form i stjärnljuset.",
    placeholderNote: "✦ AI-driven tolkning kommer snart ✦",
    restart: "Börja En Ny Läsning",
    defaultName: "Sökare",
    errorTitle: "Förbindelsen Bröts",
    errorText: "De kosmiska trådar som väver din läsning har tillfälligt brustit. Ibland är universums energi för turbulent för att kanaliseras tydligt vid det första försöket. Se till att din ande är stadig, och försök igen, eller sök kanske vägledning genom en annan portal (webbläsare).",
    tryAgain: "Balansera på nytt och försök igen",
  },
  mobileBlock: {
    title: "Dator Krävs",
    message: "Sökare, de energier som krävs för att kanalisera kosmos genom Lumina är enorma. Denna lilla enhet saknar den andliga 'vidd' som krävs för att hålla visionen utan att vackla. För att se tydligt måste du träda inför ett större altare — en stationär dator. Där ska slöjan lyftas.",
  },
  spreads: {
    single: {
      name: "Enstaka Kort",
      description: "En snabb glimt av energin kring din fråga.",
      positions: [
        { name: "Svaret", meaning: "Kärnenergin och vägledningen för din fråga", instruction: "Blunda. Håll din fråga i ditt hjärta. När du känner dig redo, låt din hand dras till ett enda kort." },
      ],
    },
    "three-card": {
      name: "Tre Kort-uppläggning",
      description: "Förflutet, nutid och framtid — din resas båge.",
      positions: [
        { name: "Det Förflutna", meaning: "Vad som har lett dig hit", instruction: "Tänk på var du har varit. Vilka händelser formade detta ögonblick? Låt din intuition leda din hand till kortet som bär ditt förflutna." },
        { name: "Nuet", meaning: "Var du står nu", instruction: "Rikta nu din medvetenhet till just detta ögonblick. Känn energin runt dig. Välj kortet som talar till din nutid." },
        { name: "Framtiden", meaning: "Vad som ligger framför", instruction: "Öppna slutligen ditt sinne för det som kan komma. Försök inte tvinga fram ett svar — låt universum avslöja vägen. Välj ditt sista kort." },
      ],
    },
    "five-card": {
      name: "Fem Kort-kors",
      description: "En djupare titt på din situation från alla vinklar.",
      positions: [
        { name: "Nuet", meaning: "Din nuvarande situation", instruction: "Centrera dig. Känn vikten av din fråga. Välj kortet som representerar var du är just nu." },
        { name: "Utmaningen", meaning: "Vad som står i vägen", instruction: "Tänk på hindren du möter. Vad håller dig tillbaka? Låt ett kort avslöja sig." },
        { name: "Grunden", meaning: "Grundorsaken under allt", instruction: "Gå djupare nu. Vad ligger under ytan? Välj ett kort som talar till den dolda sanningen." },
        { name: "Det Nära Förflutna", meaning: "Händelser som nyligen påverkat", instruction: "Titta bakåt. Vilka nyliga händelser ekar fortfarande? Välj kortet som bär den energin." },
        { name: "Potentialen", meaning: "Bästa möjliga utfall", instruction: "Titta nu framåt med hopp. Vad är den högsta möjligheten? Välj ditt sista kort med öppet hjärta." },
      ],
    },
    horseshoe: {
      name: "Hästsko-uppläggning",
      description: "Sju kort för en heltäckande vy av din väg.",
      positions: [
        { name: "Det Förflutna", meaning: "Förflutna influenser", instruction: "Börja vid början. Låt dina minnen stiga varsamt och välj kortet som håller det förflutnas energi." },
        { name: "Nuet", meaning: "Nuvarande omständigheter", instruction: "Ta dig fullt in i detta ögonblick. Vad känner du just nu? Välj ett kort." },
        { name: "Dolda Influenser", meaning: "Vad du kanske inte ser", instruction: "Det finns krafter du inte kan se. Lita helt på din intuition — välj ett kort utan att övertänka." },
        { name: "Hinder", meaning: "Utmaningar att övervinna", instruction: "Erkänn vad som står mellan dig och din önskan. Välj kortet som representerar den barriären." },
        { name: "Yttre Influenser", meaning: "Människor och energier runt dig", instruction: "Tänk på människorna i ditt liv. Vem påverkar situationen? Låt deras energi vägleda ditt val." },
        { name: "Råd", meaning: "Vad universum föreslår", instruction: "Öppna dig för vägledning. Universum har ett budskap till dig. Välj ett kort med vördnad." },
        { name: "Utfallet", meaning: "Det troliga resultatet", instruction: "Detta är det sista kortet. Ta ett djupt andetag. Vad som än kommer, lita på att det är vad du behöver se. Välj nu." },
      ],
    },
    "celtic-cross": {
      name: "Keltiskt Kors",
      description: "Den klassiska tio-kortsuppläggningen för djup, skiktad insikt.",
      positions: [
        { name: "Nuet", meaning: "Sakens kärna", instruction: "Detta kort är centrum för allt. Håll din fråga nära och välj kortet som resonerar djupast med dig just nu." },
        { name: "Utmaningen", meaning: "Vad som korsar dig", instruction: "Varje fråga bär spänning. Känn den spänningen och välj kortet som förkroppsligar den." },
        { name: "Grunden", meaning: "Situationens rot", instruction: "Gräv djupt under ytan. Vilka omedvetna krafter är i spel? Välj ett kort från din magkänsla." },
        { name: "Det Nära Förflutna", meaning: "Vad som försvinner", instruction: "Något lämnar ditt liv. Känn den frigivningen och välj ett kort som fångar det som bleknar." },
        { name: "Kronan", meaning: "Dina ambitioner och bästa utfall", instruction: "Titta upp. Vad hoppas du på? Låt din högsta önskan vägleda detta val." },
        { name: "Den Nära Framtiden", meaning: "Vad som närmar sig", instruction: "Något nytt kommer mot dig. Kan du känna det? Välj kortet som bär dess energi." },
        { name: "Din Kraft", meaning: "Dina inre resurser", instruction: "Reflektera över din egen styrka. Vilken kraft bär du inom dig? Välj ett kort som speglar ditt inre jag." },
        { name: "Yttre Krafter", meaning: "Hur andra ser dig", instruction: "Kliv utanför dig själv. Hur uppfattar världen dig i denna situation? Välj kortet som speglar det." },
        { name: "Hopp & Rädslor", meaning: "Vad du önskar och fruktar", instruction: "Hopp och rädsla är ofta två sidor av samma mynt. Känn båda och välj ett kort som håller den dualiteten." },
        { name: "Det Slutliga Utfallet", meaning: "Vart denna resa leder", instruction: "Detta är det sista kortet. Ta en stunds tystnad. Andas djupt. När du är redo, låt din själ välja kortet som fullbordar din läsning." },
      ],
    },
  },
};
