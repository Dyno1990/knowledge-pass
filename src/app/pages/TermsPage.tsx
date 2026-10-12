import { FileText } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

const sections = [
  {
    title: "1. Purpose and Scope",
    content: "This Digital Educational Modules have been developed with the financial support of the European Commission. Its primary purpose is to support the objectives defined within the framework of “Working Together – Succeeding Better” project, focusing on transnational collaboration on education for all relevant athletics stakeholders.",
  },
  {
    title: "2. Permitted Use",
    content: "Use of the content – whether in whole or in part – is strictly limited to activities that directly contribute to the realization of the project’s objectives. Any other use, including but not limited to commercial exploitation, adaptation, reproduction, distribution, or derivative works, is prohibited unless explicitly authorized in writing by the Project Coordinator.",
  },
  {
    title: "3. Intellectual Property and Attribution",
    content: "All materials, including textual content, graphics, concepts, and structure of the modules, remain the intellectual property of the Project Consortium. Proper attribution to the project and acknowledgment of the European Commission’s support must be maintained in all permitted uses.",
  },
  {
    title: "4. Unauthorized Use and Liability",
    content: "Any unauthorized use of the content, concept, or module – whether partial or in full – without the explicit consent of the Project Consortium, may result in the user being held accountable before the European Commission and other relevant authorities. This includes violations involving misrepresentation, misuse, or redistribution.",
  },
  {
    title: "5. Modifications and Updates",
    content: "The Project Consortium reserves the right to modify or update the module and its terms of use at any time without prior notice. Users are encouraged to refer to the latest version of these Terms & Conditions prior to use.",
  },
  {
    title: "6. Disclaimer",
    content: "While every effort has been made to ensure the accuracy and relevance of the content, the Project Consortium assumes no liability for any errors, omissions, or interpretations made by third parties. Users are responsible for ensuring their use of the module aligns with applicable local and international laws and policies.",
  },
];

const polishSections = [
  { title: "1. Cel i zakres", content: "Cyfrowe moduły edukacyjne zostały opracowane przy wsparciu finansowym Komisji Europejskiej. Ich głównym celem jest realizacja założeń projektu „Working Together – Succeeding Better”, skoncentrowanego na ponadnarodowej współpracy edukacyjnej wszystkich istotnych grup interesariuszy lekkoatletyki." },
  { title: "2. Dozwolone wykorzystanie", content: "Wykorzystanie treści — w całości lub w części — jest ściśle ograniczone do działań bezpośrednio przyczyniających się do realizacji celów projektu. Każde inne wykorzystanie, w tym komercyjne, adaptacja, powielanie, rozpowszechnianie lub tworzenie utworów zależnych, jest zabronione bez wyraźnej pisemnej zgody Koordynatora Projektu." },
  { title: "3. Własność intelektualna i oznaczenie autorstwa", content: "Wszystkie materiały, w tym treści tekstowe, grafiki, koncepcje i struktura modułów, pozostają własnością intelektualną Konsorcjum Projektu. Przy każdym dozwolonym wykorzystaniu należy zachować właściwe oznaczenie projektu oraz informację o wsparciu Komisji Europejskiej." },
  { title: "4. Nieuprawnione wykorzystanie i odpowiedzialność", content: "Każde nieuprawnione wykorzystanie treści, koncepcji lub modułu — częściowe albo pełne — bez wyraźnej zgody Konsorcjum Projektu może skutkować pociągnięciem użytkownika do odpowiedzialności przed Komisją Europejską i innymi właściwymi organami. Dotyczy to również wprowadzania w błąd, niewłaściwego użycia i ponownego rozpowszechniania." },
  { title: "5. Zmiany i aktualizacje", content: "Konsorcjum Projektu zastrzega sobie prawo do zmiany lub aktualizacji modułów i warunków ich użytkowania w dowolnym czasie bez wcześniejszego powiadomienia. Przed skorzystaniem z platformy użytkownik powinien zapoznać się z najnowszą wersją Regulaminu." },
  { title: "6. Wyłączenie odpowiedzialności", content: "Dołożono wszelkich starań, aby zapewnić dokładność i aktualność treści, jednak Konsorcjum Projektu nie ponosi odpowiedzialności za błędy, pominięcia ani interpretacje osób trzecich. Użytkownik odpowiada za zgodność sposobu wykorzystania modułu z obowiązującym prawem i zasadami krajowymi oraz międzynarodowymi." },
];

const germanSections = [
  { title: "1. Zweck und Geltungsbereich", content: "Diese digitalen Bildungsmodule wurden mit finanzieller Unterstützung der Europäischen Kommission entwickelt. Ihr Hauptzweck ist die Unterstützung der Ziele des Projekts „Working Together – Succeeding Better“, das sich auf die länderübergreifende Bildungszusammenarbeit aller relevanten Interessengruppen der Leichtathletik konzentriert." },
  { title: "2. Zulässige Nutzung", content: "Die Nutzung der Inhalte – vollständig oder auszugsweise – ist ausschließlich für Tätigkeiten zulässig, die unmittelbar zur Verwirklichung der Projektziele beitragen. Jede andere Nutzung, einschließlich kommerzieller Verwertung, Bearbeitung, Vervielfältigung, Verbreitung oder Erstellung abgeleiteter Werke, ist ohne ausdrückliche schriftliche Genehmigung der Projektkoordination untersagt." },
  { title: "3. Geistiges Eigentum und Quellenangabe", content: "Alle Materialien, einschließlich Texte, Grafiken, Konzepte und Modulstruktur, bleiben geistiges Eigentum des Projektkonsortiums. Bei jeder zulässigen Nutzung müssen das Projekt ordnungsgemäß genannt und die Unterstützung der Europäischen Kommission anerkannt werden." },
  { title: "4. Unbefugte Nutzung und Haftung", content: "Jede unbefugte Nutzung der Inhalte, des Konzepts oder eines Moduls – teilweise oder vollständig – ohne ausdrückliche Zustimmung des Projektkonsortiums kann eine Verantwortlichkeit gegenüber der Europäischen Kommission und anderen zuständigen Stellen begründen. Dies gilt auch für irreführende Darstellung, missbräuchliche Nutzung und Weiterverbreitung." },
  { title: "5. Änderungen und Aktualisierungen", content: "Das Projektkonsortium behält sich das Recht vor, die Module und ihre Nutzungsbedingungen jederzeit ohne vorherige Ankündigung zu ändern oder zu aktualisieren. Nutzer:innen sollten vor der Nutzung die jeweils aktuelle Fassung dieser Bedingungen prüfen." },
  { title: "6. Haftungsausschluss", content: "Obwohl alle Anstrengungen unternommen wurden, um Richtigkeit und Relevanz der Inhalte sicherzustellen, übernimmt das Projektkonsortium keine Haftung für Fehler, Auslassungen oder Auslegungen durch Dritte. Nutzer:innen sind selbst dafür verantwortlich, dass ihre Nutzung des Moduls den geltenden nationalen und internationalen Rechtsvorschriften und Richtlinien entspricht." },
];

const bosnianSections = [
  { title: "1. Svrha i obim", content: "Ovi digitalni obrazovni moduli razvijeni su uz finansijsku podršku Evropske komisije. Njihova glavna svrha je podrška ciljevima projekta „Working Together – Succeeding Better“, usmjerenog na transnacionalnu saradnju u obrazovanju svih relevantnih učesnika u atletici." },
  { title: "2. Dozvoljena upotreba", content: "Korištenje sadržaja – u cijelosti ili djelimično – strogo je ograničeno na aktivnosti koje direktno doprinose ostvarivanju ciljeva projekta. Svaka druga upotreba, uključujući komercijalno iskorištavanje, prilagođavanje, umnožavanje, distribuciju ili izradu izvedenih djela, zabranjena je bez izričitog pisanog odobrenja koordinatora projekta." },
  { title: "3. Intelektualno vlasništvo i navođenje izvora", content: "Svi materijali, uključujući tekstualni sadržaj, grafike, koncepte i strukturu modula, ostaju intelektualno vlasništvo projektnog konzorcija. U svakoj dozvoljenoj upotrebi moraju se pravilno navesti projekat i podrška Evropske komisije." },
  { title: "4. Neovlaštena upotreba i odgovornost", content: "Svaka neovlaštena upotreba sadržaja, koncepta ili modula – djelimična ili potpuna – bez izričite saglasnosti projektnog konzorcija može dovesti do odgovornosti korisnika pred Evropskom komisijom i drugim nadležnim tijelima. To uključuje lažno predstavljanje, zloupotrebu i ponovnu distribuciju." },
  { title: "5. Izmjene i ažuriranja", content: "Projektni konzorcij zadržava pravo da u bilo kojem trenutku i bez prethodne obavijesti izmijeni ili ažurira module i njihove uslove korištenja. Korisnicima se preporučuje da prije korištenja provjere najnoviju verziju ovih uslova." },
  { title: "6. Odricanje od odgovornosti", content: "Iako je uložen svaki napor da sadržaj bude tačan i relevantan, projektni konzorcij ne preuzima odgovornost za greške, propuste ili tumačenja trećih strana. Korisnici su odgovorni da korištenje modula bude usklađeno s važećim domaćim i međunarodnim zakonima i pravilima." },
];

export default function TermsPage() {
  const { language, t } = useTranslation();
  const visibleSections = language === "pl" ? polishSections : language === "de" ? germanSections : language === "bs" ? bosnianSections : sections;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{t("termsTitle")}</h1>
          </div>

          <div className="prose max-w-none">
            {visibleSections.map((section) => (
              <section key={section.title} className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-7">{section.content}</p>
              </section>
            ))}

            <div className="mt-10 border-l-4 border-blue-600 bg-blue-50 rounded-r-lg p-6">
              <p className="text-gray-800 leading-7 font-medium">
                {language === "pl" ? "Projekt finansowany przez Unię Europejską. Wyrażone poglądy i opinie należą jednak wyłącznie do autora lub autorów i nie muszą odzwierciedlać stanowiska Unii Europejskiej ani Europejskiej Agencji Wykonawczej ds. Edukacji i Kultury (EACEA). Unia Europejska ani EACEA nie ponoszą za nie odpowiedzialności." : language === "de" ? "Von der Europäischen Union finanziert. Die geäußerten Ansichten und Meinungen entsprechen jedoch ausschließlich jenen der Autor:innen und spiegeln nicht unbedingt die Position der Europäischen Union oder der Europäischen Exekutivagentur für Bildung und Kultur (EACEA) wider. Weder die Europäische Union noch die EACEA können dafür verantwortlich gemacht werden." : language === "bs" ? "Finansira Evropska unija. Izneseni stavovi i mišljenja pripadaju isključivo autoru ili autorima i ne odražavaju nužno stavove Evropske unije ili Evropske izvršne agencije za obrazovanje i kulturu (EACEA). Evropska unija ni EACEA ne mogu se smatrati odgovornima za njih." : "Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
