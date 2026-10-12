import {
  Award,
  Building2,
  CheckCircle2,
  Dumbbell,
  Flag,
  HeartHandshake,
  Leaf,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

const audiences = [
  { name: "e-Athlete", icon: Dumbbell, color: "text-blue-600", background: "bg-blue-50" },
  { name: "e-Coach", icon: Award, color: "text-green-600", background: "bg-green-50" },
  { name: "e-Referee", icon: Flag, color: "text-red-600", background: "bg-red-50" },
  { name: "e-Volunteer", icon: HeartHandshake, color: "text-purple-600", background: "bg-purple-50" },
  { name: "e-Administrator", icon: Building2, color: "text-orange-600", background: "bg-orange-50" },
];

const pillars = [
  {
    title: "Good Governance",
    icon: Scale,
    accent: "text-blue-700",
    background: "bg-blue-50",
    border: "border-blue-200",
    description: "Transparent, accountable and ethical leadership across athletic organisations.",
  },
  {
    title: "Human Rights & Integrity",
    icon: ShieldCheck,
    accent: "text-purple-700",
    background: "bg-purple-50",
    border: "border-purple-200",
    description: "Respect, safeguarding, equality, inclusion and integrity throughout athletics.",
  },
  {
    title: "Sustainability",
    icon: Leaf,
    accent: "text-green-700",
    background: "bg-green-50",
    border: "border-green-200",
    description: "Responsible practices that support the long-term development of the athletics community.",
  },
];

const topics = [
  "EU common values",
  "Non-discrimination",
  "Gender equality",
  "Ethical governance",
  "Safeguarding",
  "Inclusion",
  "Digitalisation",
  "Integrity",
  "Sustainable practices",
];

export default function AboutPage() {
  const { language } = useTranslation();
  const pl = language === "pl";
  const copy = pl ? {
    hero: "Budowanie silniejszych społeczności lekkoatletycznych dzięki praktycznej edukacji",
    heroText: "Platforma e-learningowa Working Together – Succeeding Better jest praktycznym narzędziem rozwoju kompetencji, wspierającym długofalowy rozwój federacji lekkoatletycznych i ich społeczności.",
    roles: "Edukacja dla każdej roli", rolesText: "Platforma obejmuje pięć wielojęzycznych modułów edukacyjnych dostosowanych do głównych grup interesariuszy lekkoatletyki. Dzięki temu każdy uczestnik środowiska lekkoatletycznego ma dostęp do istotnych treści odpowiadających jego roli.", modules: "Wielojęzycznych modułów",
    framework: "Wspólne ramy edukacyjne", pillars: "Trzy główne filary", pillarsText: "Moduły opierają się na Strategii Rozwoju Europejskich Federacji Lekkoatletycznych i obejmują trzy powiązane obszary.",
    practical: "Praktyczna edukacja dopasowana do roli", practicalText: "Dzięki interaktywnym materiałom, praktycznym przykładom i studiom rzeczywistych przypadków uczestnicy poznają zastosowanie wspólnych wartości UE, niedyskryminacji, równości płci, etycznego zarządzania, ochrony uczestników, włączenia społecznego, cyfryzacji, uczciwości i zrównoważonych praktyk w lekkoatletyce.", practicalText2: "Treści są dostosowane do potrzeb każdej grupy interesariuszy, przy zachowaniu wspólnych ram edukacyjnych we wszystkich modułach.", areas: "Kluczowe obszary nauki",
    objective: "Nasz główny cel", impact: "Kompetencje, które przynoszą trwałe efekty", objectiveText: "Głównym celem platformy jest wzmacnianie zdolności organizacyjnej i operacyjnej federacji lekkoatletycznych poprzez dostępne, wielojęzyczne i pozaformalne możliwości uczenia się, wspierające ciągły rozwój zawodowy i osobisty.", objectiveText2: "Platforma ma wyposażyć wszystkich interesariuszy lekkoatletyki w wiedzę, umiejętności i praktyczne narzędzia potrzebne do tworzenia bardziej inkluzywnych, dobrze zarządzanych, etycznych i zrównoważonych federacji oraz zwiększania możliwości rozwoju całej społeczności lekkoatletycznej.",
  } : language === "de" ? {
    hero: "Stärkere Leichtathletik-Communitys durch praxisnahes Lernen",
    heroText: "Die E-Learning-Plattform Working Together – Succeeding Better ist ein praxisnahes Instrument zur Kompetenzentwicklung und unterstützt die langfristige Entwicklung von Leichtathletikverbänden und ihren Communitys.",
    roles: "Lernen für jede Rolle", rolesText: "Die Plattform umfasst fünf mehrsprachige Lernmodule für die wichtigsten Interessengruppen der Leichtathletik. So erhalten alle Beteiligten Zugang zu relevanten, rollenspezifischen Bildungsinhalten.", modules: "Mehrsprachige Module",
    framework: "Gemeinsamer Bildungsrahmen", pillars: "Drei zentrale Säulen", pillarsText: "Die Module basieren auf der Entwicklungsstrategie für europäische Leichtathletikverbände und gliedern sich in drei miteinander verbundene Bereiche.",
    practical: "Praxisnahes und rollenspezifisches Lernen", practicalText: "Durch interaktive Lernmaterialien, praktische Beispiele und Fallstudien erwerben die Teilnehmenden Wissen über gemeinsame EU-Werte, Nichtdiskriminierung, Gleichstellung, ethische Führung, Schutzkonzepte, Inklusion, Digitalisierung, Integrität und nachhaltige Praktiken in der Leichtathletik.", practicalText2: "Die Inhalte sind an die besonderen Bedürfnisse jeder Interessengruppe angepasst und folgen zugleich einem gemeinsamen Bildungsrahmen für alle Module.", areas: "Zentrale Lernbereiche",
    objective: "Unser Hauptziel", impact: "Kompetenzen mit nachhaltiger Wirkung", objectiveText: "Das Hauptziel der E-Learning-Plattform ist die Stärkung der organisatorischen und operativen Fähigkeiten von Leichtathletikverbänden durch zugängliche, mehrsprachige und non-formale Lernangebote, die eine kontinuierliche berufliche und persönliche Entwicklung fördern.", objectiveText2: "Die Plattform soll alle relevanten Interessengruppen mit Wissen, Fähigkeiten und praktischen Werkzeugen ausstatten, damit sie zu inklusiveren, gut geführten, ethischen und nachhaltigen Verbänden sowie zu besseren Entwicklungsmöglichkeiten für die gesamte Leichtathletik-Community beitragen können.",
  } : language === "bs" ? {
    hero: "Jačanje atletskih zajednica kroz praktično učenje",
    heroText: "E-learning platforma Working Together – Succeeding Better osmišljena je kao praktičan alat za razvoj kapaciteta koji podržava dugoročni razvoj atletskih saveza i njihovih zajednica.",
    roles: "Učenje za svaku ulogu", rolesText: "Platforma sadrži pet višejezičnih obrazovnih modula prilagođenih glavnim grupama učesnika u atletici, tako da svaki član atletske zajednice ima pristup relevantnom sadržaju prilagođenom svojoj ulozi.", modules: "Višejezičnih modula",
    framework: "Zajednički obrazovni okvir", pillars: "Tri ključna stuba", pillarsText: "Moduli su zasnovani na Strategiji razvoja evropskih atletskih saveza i organizovani su oko tri međusobno povezana područja.",
    practical: "Praktično učenje prilagođeno ulozi", practicalText: "Kroz interaktivne materijale, praktične primjere i studije slučaja učesnici stiču znanje o primjeni zajedničkih vrijednosti EU, nediskriminacije, rodne ravnopravnosti, etičkog upravljanja, zaštite, inkluzije, digitalizacije, integriteta i održivih praksi u atletici.", practicalText2: "Sadržaj je prilagođen posebnim potrebama svake grupe učesnika, uz zajednički obrazovni okvir za sve module.", areas: "Ključna područja učenja",
    objective: "Naš glavni cilj", impact: "Kapaciteti koji stvaraju trajan učinak", objectiveText: "Glavni cilj platforme je jačanje organizacijskih i operativnih kapaciteta atletskih saveza kroz pristupačne, višejezične i neformalne mogućnosti učenja koje podstiču kontinuirani profesionalni i lični razvoj.", objectiveText2: "Platforma svim relevantnim učesnicima u atletici pruža znanje, vještine i praktične alate potrebne za doprinos inkluzivnijim, dobro upravljanim, etičkim i održivim savezima te za stvaranje većih razvojnih prilika za cijelu atletsku zajednicu.",
  } : language === "sq" ? {
    hero: "Komunitete më të forta të atletikës përmes të nxënit praktik",
    heroText: "Platforma e-learning Working Together – Succeeding Better është krijuar si një mjet praktik për zhvillimin e kapaciteteve që mbështet zhvillimin afatgjatë të federatave të atletikës dhe komuniteteve të tyre.",
    roles: "Të nxënit për çdo rol", rolesText: "Platforma përmban pesë module arsimore shumëgjuhëshe të përshtatura për grupet kryesore të interesit në atletikë, duke i dhënë çdo pjesëmarrësi qasje në përmbajtje të përshtatshme për rolin e tij.", modules: "Module shumëgjuhëshe",
    framework: "Kuadër i përbashkët arsimor", pillars: "Tre shtylla kryesore", pillarsText: "Modulet bazohen në Strategjinë e Zhvillimit për Federatat Evropiane të Atletikës dhe organizohen rreth tre fushave të ndërlidhura.",
    practical: "Të nxënit praktik dhe i përshtatur sipas rolit", practicalText: "Përmes materialeve ndërvepruese, shembujve praktikë dhe rasteve reale, pjesëmarrësit fitojnë njohuri për vlerat e përbashkëta të BE-së, mosdiskriminimin, barazinë gjinore, qeverisjen etike, mbrojtjen, përfshirjen, digjitalizimin, integritetin dhe praktikat e qëndrueshme në atletikë.", practicalText2: "Përmbajtja përshtatet me nevojat e secilit grup, duke ruajtur një kuadër të përbashkët arsimor në të gjitha modulet.", areas: "Fushat kryesore të të nxënit",
    objective: "Qëllimi ynë kryesor", impact: "Kapacitete që krijojnë ndikim të qëndrueshëm", objectiveText: "Qëllimi kryesor i platformës është të forcojë kapacitetet organizative dhe operacionale të federatave të atletikës përmes mundësive të qasshme, shumëgjuhëshe dhe joformale të të nxënit që nxisin zhvillimin e vazhdueshëm profesional dhe personal.", objectiveText2: "Platforma synon t’u ofrojë të gjitha grupeve të interesit njohuritë, aftësitë dhe mjetet praktike për të kontribuar në federata më përfshirëse, të mirëqeverisura, etike dhe të qëndrueshme, duke krijuar më shumë mundësi zhvillimi për të gjithë komunitetin e atletikës.",
  } : null;
  const visiblePillars = pl ? [
    { ...pillars[0], title: "Dobre zarządzanie", description: "Przejrzyste, odpowiedzialne i etyczne przywództwo w organizacjach lekkoatletycznych." },
    { ...pillars[1], title: "Prawa człowieka i uczciwość", description: "Szacunek, ochrona, równość, włączenie społeczne i uczciwość w całej lekkoatletyce." },
    { ...pillars[2], title: "Zrównoważony rozwój", description: "Odpowiedzialne praktyki wspierające długoterminowy rozwój społeczności lekkoatletycznej." },
  ] : language === "de" ? [
    { ...pillars[0], title: "Gute Führung", description: "Transparente, verantwortungsvolle und ethische Führung in Leichtathletikorganisationen." },
    { ...pillars[1], title: "Menschenrechte und Integrität", description: "Respekt, Schutz, Gleichstellung, Inklusion und Integrität in der gesamten Leichtathletik." },
    { ...pillars[2], title: "Nachhaltigkeit", description: "Verantwortungsvolle Praktiken für die langfristige Entwicklung der Leichtathletik-Community." },
  ] : language === "bs" ? [
    { ...pillars[0], title: "Dobro upravljanje", description: "Transparentno, odgovorno i etičko vodstvo u atletskim organizacijama." },
    { ...pillars[1], title: "Ljudska prava i integritet", description: "Poštovanje, zaštita, ravnopravnost, inkluzija i integritet u atletici." },
    { ...pillars[2], title: "Održivost", description: "Odgovorne prakse koje podržavaju dugoročni razvoj atletske zajednice." },
  ] : language === "sq" ? [
    { ...pillars[0], title: "Qeverisja e mirë", description: "Udhëheqje transparente, e përgjegjshme dhe etike në organizatat e atletikës." },
    { ...pillars[1], title: "Të drejtat e njeriut dhe integriteti", description: "Respekt, mbrojtje, barazi, përfshirje dhe integritet në të gjithë atletikën." },
    { ...pillars[2], title: "Qëndrueshmëria", description: "Praktika të përgjegjshme që mbështesin zhvillimin afatgjatë të komunitetit të atletikës." },
  ] : pillars;
  const visibleTopics = pl ? ["Wspólne wartości UE", "Niedyskryminacja", "Równość płci", "Etyczne zarządzanie", "Ochrona uczestników", "Włączenie społeczne", "Cyfryzacja", "Uczciwość", "Zrównoważone praktyki"] : language === "de" ? ["Gemeinsame EU-Werte", "Nichtdiskriminierung", "Gleichstellung", "Ethische Führung", "Schutzkonzepte", "Inklusion", "Digitalisierung", "Integrität", "Nachhaltige Praktiken"] : language === "bs" ? ["Zajedničke vrijednosti EU", "Nediskriminacija", "Rodna ravnopravnost", "Etičko upravljanje", "Zaštita učesnika", "Inkluzija", "Digitalizacija", "Integritet", "Održive prakse"] : language === "sq" ? ["Vlerat e përbashkëta të BE-së", "Mosdiskriminimi", "Barazia gjinore", "Qeverisja etike", "Mbrojtja e pjesëmarrësve", "Përfshirja", "Digjitalizimi", "Integriteti", "Praktikat e qëndrueshme"] : topics;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-300/10" />
          <div className="relative p-8 sm:p-12 lg:p-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Working Together – Succeeding Better
            </div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
              {copy?.hero || "Building stronger athletics communities through practical learning"}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-blue-50">
              {copy?.heroText || "The Working Together – Succeeding Better e-learning platform is designed as a practical capacity-building tool that supports the long-term development of athletic federations and their communities."}
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">{copy?.roles || "Learning for every role"}</h2>
              </div>
              <p className="text-lg leading-8 text-gray-600">
                {copy?.rolesText || "The platform consists of five multilingual learning modules tailored to the main stakeholder groups in athletics, ensuring that every participant in the athletics ecosystem has access to relevant, role-specific educational content."}
              </p>
            </div>
            <div className="rounded-2xl bg-blue-50 px-6 py-5 text-center lg:min-w-48">
              <p className="text-4xl font-extrabold text-blue-700">5</p>
              <p className="mt-1 font-semibold text-blue-900">{copy?.modules || "Multilingual modules"}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {audiences.map(({ name, icon: Icon, color, background }) => (
              <div key={name} className={`${background} rounded-xl p-5 text-center transition-transform hover:-translate-y-1`}>
                <Icon className={`mx-auto mb-3 h-8 w-8 ${color}`} />
                <p className="font-bold text-gray-900">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">{copy?.framework || "Shared educational framework"}</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">{copy?.pillars || "Three core pillars"}</h2>
            <p className="mx-auto mt-3 max-w-3xl text-lg leading-8 text-gray-600">
              {copy?.pillarsText || "The modules are based on the project's Development Strategy for European Athletic Federations and are structured around three connected areas."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {visiblePillars.map(({ title, icon: Icon, accent, background, border, description }) => (
              <article key={title} className={`${background} ${border} rounded-2xl border p-7 shadow-sm`}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className={`h-7 w-7 ${accent}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10">
            <div className="mb-5 flex items-center gap-3">
              <Target className="h-8 w-8 text-indigo-600" />
              <h2 className="text-3xl font-bold text-gray-900">{copy?.practical || "Practical and role-specific learning"}</h2>
            </div>
            <p className="text-lg leading-8 text-gray-600">
              {copy?.practicalText || "Through interactive learning materials, practical examples, and real-life case studies, participants will gain knowledge on the application of EU common values, non-discrimination, gender equality, ethical governance, safeguarding, inclusion, digitalisation, integrity, and sustainable practices within athletics."}
            </p>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              {copy?.practicalText2 || "The content is adapted to the specific needs of each stakeholder group while maintaining a common educational framework across all modules."}
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 sm:p-10">
            <h3 className="mb-5 text-lg font-bold text-gray-900">{copy?.areas || "Key learning areas"}</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {visibleTopics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 rounded-lg bg-white/80 px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 flex-none text-indigo-600" />
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-orange-600 text-white shadow-md">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-700">{copy?.objective || "Our main objective"}</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">{copy?.impact || "Capacity that creates lasting impact"}</h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                {copy?.objectiveText || "The main objective of the e-learning platform is to strengthen the organisational and operational capacity of athletic federations by providing accessible, multilingual, non-formal learning opportunities that promote continuous professional and personal development."}
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                {copy?.objectiveText2 || "Ultimately, the platform aims to equip all relevant athletics stakeholders with the knowledge, skills, and practical tools necessary to contribute to more inclusive, well-governed, ethical, and sustainable federations, while creating greater development opportunities for the entire athletics community."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
