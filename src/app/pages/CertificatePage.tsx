import { useParams, Link, useLocation } from "react-router";
import { localize, modules } from "../data/modules";
import { Award, Copy, Download, ExternalLink, Facebook, Home, ImageDown, Instagram, Linkedin, LoaderCircle, Share2, X } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { certificateCanvasToBlob, downloadImage, renderCertificateImage } from "../utils/certificateImage";

type SharePlatform = "facebook" | "linkedin" | "instagram";

export default function CertificatePage() {
  const { moduleId } = useParams();
  const location = useLocation();
  const { language, t } = useTranslation();
  const module = modules.find((item) => item.id === moduleId);
  const certificate = (location.state || {}) as {
    name?: string;
    email?: string;
    downloadUrl?: string;
    emailSent?: boolean;
    certificateId?: string;
    issuedAt?: string;
  };
  const [previewUrl, setPreviewUrl] = useState("");
  const [shareImage, setShareImage] = useState<Blob | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPreparingShare, setIsPreparingShare] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const translated = (en: string, bg: string, pl: string, de = en, bs = en) => language === "bg" ? bg : language === "pl" ? pl : language === "de" ? de : language === "bs" ? bs : en;

  const recipientName = certificate.name || translated("Sports Professional", "Спортен професионалист", "Uczestnik programu", "Teilnehmende Person", "Učesnik programa");
  const issuedDate = useMemo(() => new Date(certificate.issuedAt || Date.now()).toLocaleDateString(language === "bg" ? "bg-BG" : language === "pl" ? "pl-PL" : language === "de" ? "de-AT" : language === "bs" ? "bs-BA" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  }), [certificate.issuedAt, language]);
  const moduleTitle = module ? `${localize(module.title, language)} Digital Module` : "";
  const certificateId = certificate.certificateId || "—";
  const imageFilename = `wtsb-${moduleId || "module"}-${certificateId === "—" ? "certificate" : certificateId}.png`;
  const shareCaption = translated(
    `Proud to share that I successfully completed the ${moduleTitle} with WTSB Digital Modules. #WTSB #Athletics #DigitalLearning`,
    `С радост споделям, че успешно завърших ${moduleTitle} в платформата WTSB Digital Modules. #WTSB #Athletics #DigitalLearning`,
    `Z radością informuję, że pomyślnie ukończyłem(-am) ${moduleTitle} na platformie WTSB Digital Modules. #WTSB #Athletics #DigitalLearning`,
    `Ich freue mich, dass ich das ${moduleTitle} auf der Plattform WTSB Digital Modules erfolgreich abgeschlossen habe. #WTSB #Athletics #DigitalLearning`,
    `Sa zadovoljstvom dijelim da sam uspješno završio/la ${moduleTitle} na platformi WTSB Digital Modules. #WTSB #Athletics #DigitalLearning`,
  );

  useEffect(() => {
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#3b82f6", "#10b981", "#f59e0b"] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#3b82f6", "#10b981", "#f59e0b"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    if (!module) return;
    let active = true;
    let objectUrl = "";
    setIsPreparingShare(true);
    renderCertificateImage({ name: recipientName, moduleTitle, issuedDate, certificateId })
      .then(certificateCanvasToBlob)
      .then((blob) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setShareImage(blob);
        setPreviewUrl(objectUrl);
      })
      .catch(() => setShareStatus(translated("The image could not be prepared.", "Изображението не можа да бъде подготвено.", "Nie udało się przygotować obrazu.", "Das Bild konnte nicht vorbereitet werden.", "Slika nije mogla biti pripremljena.")))
      .finally(() => active && setIsPreparingShare(false));
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [certificateId, issuedDate, language, module, moduleTitle, recipientName]);

  if (!module) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-xl text-gray-600">Module not found</p><Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Home</Link></div></div>;
  }

  const copyCaption = async () => {
    await navigator.clipboard.writeText(shareCaption);
    setShareStatus(translated("The post text has been copied.", "Текстът за публикацията е копиран.", "Tekst publikacji został skopiowany.", "Der Beitragstext wurde kopiert.", "Tekst objave je kopiran."));
  };

  const shareNative = async () => {
    if (!shareImage) return;
    const file = new File([shareImage], imageFilename, { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ title: "WTSB Digital Modules Certificate", text: shareCaption, files: [file] });
        setShareStatus(translated("The image is ready to share.", "Изображението е подготвено за споделяне.", "Obraz jest gotowy do udostępnienia.", "Das Bild kann jetzt geteilt werden.", "Slika je spremna za dijeljenje."));
      } catch (error) {
        if ((error as DOMException).name !== "AbortError") setShareStatus(translated("Sharing was not completed.", "Споделянето не бе завършено.", "Udostępnianie nie zostało zakończone.", "Das Teilen wurde nicht abgeschlossen.", "Dijeljenje nije završeno."));
      }
      return;
    }
    downloadImage(shareImage, imageFilename);
    await copyCaption();
  };

  const openPlatform = async (platform: SharePlatform) => {
    if (!shareImage) return;
    const pageUrl = window.location.origin;
    const urls: Record<SharePlatform, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareCaption)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      instagram: "https://www.instagram.com/",
    };
    window.open(urls[platform], "_blank", "noopener,noreferrer");
    downloadImage(shareImage, imageFilename);
    await navigator.clipboard.writeText(shareCaption).catch(() => undefined);
    setShareStatus(translated(
      "The image was downloaded and the caption copied. Upload the image in the opened platform.",
      "Изображението е изтеглено и текстът е копиран. Качи изображението в отворената платформа.",
      "Obraz został pobrany, a tekst skopiowany. Prześlij obraz w otwartej platformie.",
      "Das Bild wurde heruntergeladen und der Text kopiert. Laden Sie das Bild auf der geöffneten Plattform hoch.",
      "Slika je preuzeta, a tekst kopiran. Postavite sliku na otvorenoj platformi.",
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{t("congratulations")}</h1>
          <p className="text-xl text-gray-600">{t("certCompleteMessage")}</p>
        </div>

        <div className="rounded-xl shadow-2xl overflow-hidden mb-8 bg-white aspect-[3/2] flex items-center justify-center">
          {previewUrl
            ? <img src={previewUrl} alt={translated(`Certificate awarded to ${recipientName}`, `Сертификат на ${recipientName}`, `Certyfikat dla ${recipientName}`, `Zertifikat für ${recipientName}`, `Certifikat za ${recipientName}`)} className="w-full h-full object-contain" />
            : <div className="flex items-center gap-3 text-blue-700"><LoaderCircle className="w-6 h-6 animate-spin" />{translated("Preparing certificate…", "Подготвяне на сертификата…", "Przygotowywanie certyfikatu…", "Zertifikat wird vorbereitet …", "Priprema certifikata…")}</div>}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={certificate.downloadUrl || "#"} download className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors ${certificate.downloadUrl ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 pointer-events-none"}`}>
            <Download className="w-5 h-5" />{t("downloadCertificate")}
          </a>
          <button type="button" onClick={() => { setShareStatus(""); setIsShareOpen(true); }} disabled={!shareImage || isPreparingShare} className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors">
            <Share2 className="w-5 h-5" />{t("shareAchievement")}
          </button>
          <Link to="/" className="flex items-center justify-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            <Home className="w-5 h-5" />{t("returnHome")}
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("whatsNext")}</h3>
          <p className="text-gray-600 mb-6">{t("continueDevMessage")}</p>
          <Link to="/" className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors">{t("exploreMore")}</Link>
        </div>
      </div>

      {isShareOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="share-title">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start gap-4">
              <div><h2 id="share-title" className="text-2xl font-bold text-gray-900">{t("shareAchievement")}</h2><p className="text-gray-600 mt-1">{translated("Your certificate image and post caption are ready.", "Подготвихме изображение и подходящ текст за публикацията.", "Obraz certyfikatu i tekst publikacji są gotowe.", "Ihr Zertifikatsbild und der Beitragstext sind bereit.", "Slika certifikata i tekst objave su spremni.")}</p></div>
              <button type="button" onClick={() => setIsShareOpen(false)} aria-label={translated("Close", "Затвори", "Zamknij", "Schließen", "Zatvori")} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 grid lg:grid-cols-[1.25fr_.75fr] gap-6">
              <div>
                {previewUrl && <img src={previewUrl} alt="Certificate social sharing preview" className="w-full rounded-lg border border-gray-200 shadow-sm" />}
                <label className="block text-sm font-semibold text-gray-800 mt-5 mb-2" htmlFor="share-caption">{translated("Post caption", "Текст за публикацията", "Tekst publikacji", "Beitragstext", "Tekst objave")}</label>
                <textarea id="share-caption" readOnly value={shareCaption} rows={4} className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-700" />
                <button type="button" onClick={copyCaption} className="mt-2 flex items-center gap-2 text-blue-700 font-semibold"><Copy className="w-4 h-4" />{translated("Copy caption", "Копирай текста", "Kopiuj tekst", "Text kopieren", "Kopiraj tekst")}</button>
              </div>
              <div className="space-y-3">
                <button type="button" onClick={shareNative} className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"><Share2 className="w-5 h-5" />{translated("Share image", "Сподели изображението", "Udostępnij obraz", "Bild teilen", "Podijeli sliku")}</button>
                <button type="button" onClick={() => openPlatform("facebook")} className="w-full bg-[#1877F2] text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2"><Facebook className="w-5 h-5" />Facebook<ExternalLink className="w-4 h-4 ml-auto" /></button>
                <button type="button" onClick={() => openPlatform("linkedin")} className="w-full bg-[#0A66C2] text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2"><Linkedin className="w-5 h-5" />LinkedIn<ExternalLink className="w-4 h-4 ml-auto" /></button>
                <button type="button" onClick={() => openPlatform("instagram")} className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2"><Instagram className="w-5 h-5" />Instagram<ExternalLink className="w-4 h-4 ml-auto" /></button>
                <button type="button" onClick={() => shareImage && downloadImage(shareImage, imageFilename)} className="w-full border-2 border-gray-300 text-gray-800 rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2"><ImageDown className="w-5 h-5" />{translated("Download PNG", "Изтегли PNG", "Pobierz PNG", "PNG herunterladen", "Preuzmi PNG")}</button>
                <p className="text-xs leading-5 text-gray-500">{translated(
                  "On mobile, native sharing can send the image directly to an installed app. On desktop, the image is downloaded, the caption copied and the selected platform opened for posting.",
                  "На мобилно устройство бутонът за споделяне може директно да изпрати изображението към инсталирано приложение. При desktop вариант изображението се изтегля, текстът се копира и избраната платформа се отваря за публикуване.",
                  "Na urządzeniu mobilnym udostępnianie może wysłać obraz bezpośrednio do zainstalowanej aplikacji. Na komputerze obraz zostanie pobrany, tekst skopiowany, a wybrana platforma otwarta do publikacji.",
                  "Auf Mobilgeräten kann das Bild direkt an eine installierte App gesendet werden. Am Computer wird das Bild heruntergeladen, der Text kopiert und die gewählte Plattform zum Veröffentlichen geöffnet.",
                  "Na mobilnom uređaju slika se može direktno poslati instaliranoj aplikaciji. Na računaru se slika preuzima, tekst kopira, a odabrana platforma otvara za objavljivanje.",
                )}</p>
                {shareStatus && <p className="rounded-lg bg-green-50 text-green-800 text-sm p-3">{shareStatus}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
