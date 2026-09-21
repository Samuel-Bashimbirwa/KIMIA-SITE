import React, { useState } from "react";
import {
  X,
  BookOpen,
  Users,
  Scale,
  Smartphone,
  CheckCircle2,
  Download,
  Phone,
  ShieldAlert,
  Send,
  HelpCircle,
  FileText,
  Lock,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { ModalType } from "../types";
import { FAQ_ITEMS, LAWYER_PARTNERS } from "../data/kimiaData";
import bookImg from "../assets/images/kimia_guide_book_1790018924214.jpg";
import { DiagnosticsModalContent } from "./DiagnosticsModal";

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  onOpenAnotherModal: (type: ModalType) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  onOpenAnotherModal,
}) => {
  if (activeModal === "none") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] rounded-3xl border border-[#E6DDCC] shadow-2xl p-6 sm:p-8 text-[#1E1C1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E6555] hover:text-[#1E1C1A] hover:bg-[#EDE5D5] transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === "book" && <BookModalContent onClose={onClose} />}
        {activeModal === "community" && <CommunityModalContent onClose={onClose} />}
        {activeModal === "lawyer" && <LawyerModalContent onClose={onClose} onOpenContact={() => onOpenAnotherModal("none")} />}
        {activeModal === "app" && <AppModalContent onClose={onClose} />}
        {activeModal === "video" && <VideoModalContent onClose={onClose} />}
        {activeModal === "terms" && <TermsModalContent onClose={onClose} />}
        {activeModal === "privacy" && <PrivacyModalContent onClose={onClose} />}
        {activeModal === "faq" && <FaqModalContent onClose={onClose} />}
        {activeModal === "diagnostics" && <DiagnosticsModalContent onClose={onClose} />}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* Book Modal Content                                            */
/* ------------------------------------------------------------- */
const BookModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [format, setFormat] = useState<"papier" | "numerique">("papier");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Kinshasa",
    quantity: "1",
    isVictimOrNgo: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"order" | "toc">("order");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/book-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, format }),
      });
    } catch (err) {
      console.error(err);
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#FAF3E6] border border-[#E6DCC8] flex items-center justify-center text-[#B8882C]">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">
            Procurez-vous le livre MALK'ia
          </h3>
          <p className="text-xs text-[#736B5E]">
            L'ABC des Violences Basées sur le Genre par NGOIE WA NGOIE
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E6DDCC] text-sm font-semibold">
        <button
          onClick={() => setActiveTab("order")}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "order"
              ? "border-[#D4A346] text-[#1E1C1A]"
              : "border-transparent text-[#7A7161] hover:text-[#1E1C1A]"
          }`}
        >
          Commander / Obtenir
        </button>
        <button
          onClick={() => setActiveTab("toc")}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "toc"
              ? "border-[#D4A346] text-[#1E1C1A]"
              : "border-transparent text-[#7A7161] hover:text-[#1E1C1A]"
          }`}
        >
          Sommaire & Extraits
        </button>
      </div>

      {activeTab === "order" ? (
        submitted ? (
          <div className="bg-[#FAF6EE] p-6 rounded-2xl border border-[#E3DAC8] text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#3D774D] mx-auto" />
            <h4 className="font-serif font-bold text-xl text-[#1E1C1A]">
              Demande enregistrée avec succès !
            </h4>
            <p className="text-sm text-[#5C5549] max-w-md mx-auto">
              Merci pour votre engagement. Vous recevrez les informations de retrait ou le lien de
              téléchargement par e-mail à l'adresse renseignée.
            </p>
            {format === "numerique" && (
              <a
                href="#download-sample"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Le téléchargement du guide numérique MALK'ia (PDF sécurisé) est lancé !");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4A346] text-[#1E1C1A] font-semibold text-sm rounded-xl hover:bg-[#C59639]"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le guide PDF maintenant</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="block w-full text-xs text-[#7A7264] hover:underline mt-4 cursor-pointer"
            >
              Fermer cette fenêtre
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Format Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat("papier")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  format === "papier"
                    ? "bg-white border-[#D4A346] shadow-xs ring-1 ring-[#D4A346]"
                    : "bg-[#FAF5EB] border-[#E5DDCB] text-[#5C5549]"
                }`}
              >
                <div className="font-bold text-sm text-[#1E1C1A]">Livre papier relié</div>
                <div className="text-xs text-[#736B5E] mt-0.5">Distribution en points relais RDC</div>
              </button>

              <button
                type="button"
                onClick={() => setFormat("numerique")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  format === "numerique"
                    ? "bg-white border-[#D4A346] shadow-xs ring-1 ring-[#D4A346]"
                    : "bg-[#FAF5EB] border-[#E5DDCB] text-[#5C5549]"
                }`}
              >
                <div className="font-bold text-sm text-[#1E1C1A]">Version numérique PDF</div>
                <div className="text-xs text-[#736B5E] mt-0.5">Accès immédiat sur smartphone / PC</div>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#544D42] mb-1">Votre nom</label>
                <input
                  type="text"
                  required
                  placeholder="Nom complet ou prénom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#544D42] mb-1">Votre e-mail</label>
                <input
                  type="email"
                  required
                  placeholder="nom@exemple.cd"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#544D42] mb-1">Téléphone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+243 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#544D42] mb-1">Ville de livraison / retrait</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-sm"
                >
                  <option value="Kinshasa">Kinshasa</option>
                  <option value="Goma">Goma</option>
                  <option value="Lubumbashi">Lubumbashi</option>
                  <option value="Bukavu">Bukavu</option>
                  <option value="Matadi">Matadi</option>
                  <option value="Kisangani">Kisangani</option>
                  <option value="Autre">Autre province</option>
                </select>
              </div>
            </div>

            {/* Gratuité pour victimes / associations */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F0E4] border border-[#E6DCC8] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVictimOrNgo}
                onChange={(e) => setFormData({ ...formData, isVictimOrNgo: e.target.checked })}
                className="mt-1 accent-[#D4A346]"
              />
              <span className="text-xs text-[#524B40] leading-snug">
                Je commande pour une association, une école ou en tant que personne vulnérable
                (exemplaire offert par l'initiative MALK'ia).
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4A346] hover:bg-[#C59639] text-[#1E1C1A] font-semibold text-sm rounded-xl transition-all shadow-xs"
            >
              Confirmer la demande du livre
            </button>
          </form>
        )
      ) : (
        <div className="space-y-4 text-sm text-[#4E473D]">
          <div className="p-4 bg-white rounded-xl border border-[#E7DFCE] space-y-2">
            <h4 className="font-bold text-[#1E1C1A]">Titre I : Les violences décryptées par la loi</h4>
            <p className="text-xs text-[#6E6657]">
              Définitions claires des violences physiques, psychologiques, économiques, conjugales et sexuelles selon le Code Pénal congolais.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E7DFCE] space-y-2">
            <h4 className="font-bold text-[#1E1C1A]">Titre II : Vos recours et la conservation des preuves</h4>
            <p className="text-xs text-[#6E6657]">
              Comment porter plainte, faire établir un certificat médical légal sans délai, et faire intervenir un officier de police judiciaire.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E7DFCE] space-y-2">
            <h4 className="font-bold text-[#1E1C1A]">Titre III : Famille, mariage, succession et enfants</h4>
            <p className="text-xs text-[#6E6657]">
              Droits des épouses, suppression définitive de l'autorisation maritale, garde d'enfants et protection de l'héritage face aux spoliations.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E7DFCE] space-y-2">
            <h4 className="font-bold text-[#1E1C1A]">Titre IV : Les traités internationaux et numéros d'urgence</h4>
            <p className="text-xs text-[#6E6657]">
              Application directe du Protocole de Maputo et annuaire complet des permanences juridiques par province.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------- */
/* Community Modal Content                                       */
/* ------------------------------------------------------------- */
const CommunityModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [joined, setJoined] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", province: "Kinshasa" });

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#FAF3E6] border border-[#E6DCC8] flex items-center justify-center text-[#B8882C]">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">
            Intégrer la communauté MALK'ia
          </h3>
          <p className="text-xs text-[#736B5E]">
            Un réseau solidaire pour s'informer, s'entraider et ne plus jamais être seule
          </p>
        </div>
      </div>

      {joined ? (
        <div className="bg-[#FAF6EE] p-6 rounded-2xl border border-[#E3DAC8] text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#3D774D] mx-auto" />
          <h4 className="font-serif font-bold text-xl text-[#1E1C1A]">Bienvenue parmi nous !</h4>
          <p className="text-sm text-[#5C5549]">
            Vous avez rejoint le cercle de solidarité MALK'ia. Nous vous envoyons les liens d'accès
            sécurisés pour participer aux groupes d'échange régionaux.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#D4A346] text-[#1E1C1A] font-semibold text-sm rounded-xl hover:bg-[#C59639]"
          >
            Continuer
          </button>
        </div>
      ) : (
        <form onSubmit={handleJoin} className="space-y-4">
          <div className="p-4 bg-white rounded-xl border border-[#EAE3D4] text-xs space-y-1.5 text-[#544D42]">
            <p className="font-semibold text-[#1E1C1A]">Ce que vous apporte la communauté :</p>
            <p>• Cercles de parole confidentiels animés par des psychologues et juristes</p>
            <p>• Alertes juridiques et vulgarisation des nouvelles lois en RDC</p>
            <p>• Réseau de marrainage pour accompagner les femmes en détresse</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544D42] mb-1">Votre prénom ou pseudonyme</label>
            <input
              type="text"
              required
              placeholder="Ex: Espérance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544D42] mb-1">Votre e-mail ou WhatsApp</label>
            <input
              type="text"
              required
              placeholder="votre.contact@exemple.cd"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544D42] mb-1">Votre province</label>
            <select
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-sm"
            >
              <option value="Kinshasa">Kinshasa</option>
              <option value="Nord-Kivu">Nord-Kivu (Goma)</option>
              <option value="Sud-Kivu">Sud-Kivu (Bukavu)</option>
              <option value="Haut-Katanga">Haut-Katanga (Lubumbashi)</option>
              <option value="Kongo-Central">Kongo-Central</option>
              <option value="Autre">Autre province</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D4A346] hover:bg-[#C59639] text-[#1E1C1A] font-semibold text-sm rounded-xl transition-all shadow-xs"
          >
            Rejoindre la communauté maintenant
          </button>
        </form>
      )}
    </div>
  );
};

/* ------------------------------------------------------------- */
/* Lawyer Partner Modal Content                                  */
/* ------------------------------------------------------------- */
const LawyerModalContent: React.FC<{ onClose: () => void; onOpenContact: () => void }> = ({
  onClose,
  onOpenContact,
}) => {
  const [selectedCity, setSelectedCity] = useState("all");

  const filteredLawyers =
    selectedCity === "all"
      ? LAWYER_PARTNERS
      : LAWYER_PARTNERS.filter((l) => l.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#FAF3E6] border border-[#E6DCC8] flex items-center justify-center text-[#B8882C]">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">
            Avocats partenaires MALK'ia
          </h3>
          <p className="text-xs text-[#736B5E]">
            Orientation juridique gratuite et assistance en RDC
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-semibold text-[#5C5549]">Filtrer par ville :</span>
        {["all", "Kinshasa", "Goma", "Lubumbashi", "Bukavu"].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
              selectedCity === city
                ? "bg-[#D4A346] border-[#D4A346] text-[#1E1C1A] font-semibold"
                : "bg-white border-[#DDD5C5] text-[#5C5549] hover:bg-[#F3EDE1]"
            }`}
          >
            {city === "all" ? "Toutes" : city}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {filteredLawyers.map((lawyer) => (
          <div
            key={lawyer.name}
            className="p-4 bg-white rounded-xl border border-[#E9E1D2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#1E1C1A]">{lawyer.name}</span>
                {lawyer.proBono && (
                  <span className="text-[10px] bg-[#E8F3EB] text-[#28633B] font-semibold px-2 py-0.5 rounded-full">
                    Orientation Pro Bono
                  </span>
                )}
              </div>
              <p className="text-xs text-[#736B5E] mt-0.5">{lawyer.bar}</p>
              <p className="text-xs text-[#4F493E] mt-1">
                <span className="font-semibold">Domaines :</span> {lawyer.specialty}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                const contactEl = document.getElementById("contact");
                contactEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3.5 py-2 bg-[#FAF5EB] hover:bg-[#F2E8D2] border border-[#DDD3BF] text-[#1E1C1A] text-xs font-semibold rounded-lg shrink-0 cursor-pointer"
            >
              Demander consultation
            </button>
          </div>
        ))}
      </div>

      <div className="p-3.5 bg-[#FAF4E8] rounded-xl border border-[#ECDDBF] text-xs text-[#75591D]">
        💡 Les consultations initiales d'orientation sont gratuites. MALK'ia facilite votre mise en relation directe.
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* App Modal Content                                             */
/* ------------------------------------------------------------- */
const AppModalContent: React.FC<{ onClose: () => void }> = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#FAF3E6] border border-[#E6DCC8] flex items-center justify-center text-[#B8882C] mx-auto">
        <Smartphone className="w-8 h-8" />
      </div>

      <div>
        <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">
          Application mobile MALK'ia
        </h3>
        <p className="text-xs sm:text-sm text-[#736B5E] max-w-md mx-auto mt-1">
          Votre guide juridique toujours dans votre poche, accessible 100% hors-ligne.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D4]">
          <div className="font-bold text-sm text-[#1E1C1A]">Accès hors-ligne total</div>
          <p className="text-xs text-[#6B6456] mt-0.5">
            Consultez toutes les lois et guides sans connexion internet en RDC.
          </p>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D4]">
          <div className="font-bold text-sm text-[#1E1C1A]">Bouton SOS discret</div>
          <p className="text-xs text-[#6B6456] mt-0.5">
            Envoi instantané d'une alerte chiffrée avec localisation aux proches choisis.
          </p>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D4]">
          <div className="font-bold text-sm text-[#1E1C1A]">Audio en langues nationales</div>
          <p className="text-xs text-[#6B6456] mt-0.5">
            Écoutez les explications en Lingala, Swahili, Tshiluba et Kikongo.
          </p>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D4]">
          <div className="font-bold text-sm text-[#1E1C1A]">Numéros d'urgence intégrés</div>
          <p className="text-xs text-[#6B6456] mt-0.5">
            Appel en un clic vers la ligne verte 122 et les permanences d'avocats.
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => alert("L'application MALK'ia pour Android (fichier APK sécurisé) est en cours de téléchargement !")}
          className="w-full sm:w-auto px-6 py-3 bg-[#D4A346] hover:bg-[#C59639] text-[#1E1C1A] font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Télécharger MALK'ia (Android APK)</span>
        </button>

        <button
          onClick={() => alert("Version Web Progressive App disponible sur tous les téléphones iOS & Android !")}
          className="w-full sm:w-auto px-5 py-3 bg-white border border-[#DDD5C5] text-[#2C2925] font-semibold text-sm rounded-xl hover:bg-[#F8F5ED]"
        >
          <span>Ajouter à l'écran d'accueil</span>
        </button>
      </div>

      <p className="text-[11px] text-[#8C8373]">
        Version 2.4.0 • Léger (seulement 8 Mo) • Aucun traqueur publicitaire
      </p>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* Video Testimonial Modal Content                               */
/* ------------------------------------------------------------- */
const VideoModalContent: React.FC<{ onClose: () => void }> = () => {
  const [lang, setLang] = useState<"fr" | "ln" | "sw">("fr");

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">
          Témoignages de femmes congolaises
        </h3>
        <p className="text-xs text-[#736B5E]">
          « Elles ont osé parler, elles ont été écoutées » — Histoires vécues de résilience
        </p>
      </div>

      {/* Video Container */}
      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-lg border border-[#E3DAC8]">
        <video
          controls
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        />
      </div>

      {/* Language / Subtitle Selector */}
      <div className="flex items-center justify-between text-xs pt-1">
        <span className="font-semibold text-[#544D42]">Sous-titres disponibles :</span>
        <div className="flex gap-2">
          <button
            onClick={() => setLang("fr")}
            className={`px-2.5 py-1 rounded-md border ${
              lang === "fr" ? "bg-[#D4A346] font-bold text-[#1E1C1A]" : "bg-white text-[#544D42]"
            }`}
          >
            Français
          </button>
          <button
            onClick={() => setLang("ln")}
            className={`px-2.5 py-1 rounded-md border ${
              lang === "ln" ? "bg-[#D4A346] font-bold text-[#1E1C1A]" : "bg-white text-[#544D42]"
            }`}
          >
            Lingala
          </button>
          <button
            onClick={() => setLang("sw")}
            className={`px-2.5 py-1 rounded-md border ${
              lang === "sw" ? "bg-[#D4A346] font-bold text-[#1E1C1A]" : "bg-white text-[#544D42]"
            }`}
          >
            Swahili
          </button>
        </div>
      </div>

      {/* Transcript Excerpt */}
      <div className="p-4 bg-white rounded-xl border border-[#E9E1D2] text-xs text-[#4F493E] space-y-2">
        <p className="font-semibold text-[#1E1C1A]">Transcription résumée :</p>
        <p className="leading-relaxed">
          « Quand la violence a débuté dans mon foyer, je pensais que c'était le destin de toutes les femmes. Lorsque j'ai eu entre les mains le livre « L'ABC des Violences Basées sur le Genre » de MALK'ia et que j'ai lu les articles du Code Pénal et du Code de la Famille, j'ai compris que la violence n'est ni une coutume ni une fatalité, c'est un délit. Aujourd'hui, je suis autonome et j'aide d'autres femmes à Goma. »
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* Terms Modal Content                                           */
/* ------------------------------------------------------------- */
const TermsModalContent: React.FC<{ onClose: () => void }> = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-[#B8882C]" />
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">Conditions d'utilisation</h3>
          <p className="text-xs text-[#736B5E]">Dernière mise à jour : 2026</p>
        </div>
      </div>

      <div className="space-y-3 text-xs text-[#524B40] leading-relaxed max-h-80 overflow-y-auto pr-2">
        <p>
          <strong>1. Objet de la plateforme :</strong> MALK'ia est une initiative citoyenne et juridique indépendante destinée à vulgariser le droit et à orienter les femmes en République Démocratique du Congo. Les informations fournies ont une valeur informative et éducative.
        </p>
        <p>
          <strong>2. Gratuité de l'orientation :</strong> L'accès aux synthèses de lois, aux contenus du site et à la mise en relation avec nos partenaires est entièrement gratuit.
        </p>
        <p>
          <strong>3. Responsabilité :</strong> Bien que les fiches soient relues par des juristes qualifiés, MALK'ia ne remplace pas une décision judiciaire ni l'intervention formelle d'un avocat constitué dans une procédure en cours.
        </p>
        <p>
          <strong>4. Propriété intellectuelle :</strong> Le guide et le livre MALK'ia et leurs illustrations sont protégés. La reproduction à des fins commerciales sans autorisation est interdite. La reproduction à des fins de sensibilisation communautaire non commerciale est encouragée.
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* Privacy Modal Content                                         */
/* ------------------------------------------------------------- */
const PrivacyModalContent: React.FC<{ onClose: () => void }> = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Lock className="w-8 h-8 text-[#B8882C]" />
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">Politique de confidentialité</h3>
          <p className="text-xs text-[#736B5E]">Protection intégrale des données des femmes et des victimes</p>
        </div>
      </div>

      <div className="space-y-3 text-xs text-[#524B40] leading-relaxed max-h-80 overflow-y-auto pr-2">
        <p>
          <strong>Confidentialité absolue :</strong> Nous savons combien la sécurité des femmes signalant des abus est critique. Aucune donnée personnelle, nom ou numéro de téléphone n'est transmis à des tiers sans votre consentement explicite.
        </p>
        <p>
          <strong>Usage de pseudonyme :</strong> Vous avez le droit d'utiliser un prénom fictif ou un pseudonyme pour poser vos questions à notre équipe.
        </p>
        <p>
          <strong>Destinataire des requêtes :</strong> Vos messages sont directement transmis à la coordination administrative de MALK'ia (samuelbashimbirwa@gmail.com) et traités avec la plus stricte déontologie.
        </p>
        <p>
          <strong>Suppression immédiate :</strong> Vous pouvez à tout moment demander l'effacement définitif de tout historique de vos messages.
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* FAQ Modal Content                                             */
/* ------------------------------------------------------------- */
const FaqModalContent: React.FC<{ onClose: () => void }> = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <HelpCircle className="w-8 h-8 text-[#B8882C]" />
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">Foire aux questions (FAQ)</h3>
          <p className="text-xs text-[#736B5E]">Réponses aux questions les plus posées sur vos droits</p>
        </div>
      </div>

      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#EAE3D4] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left font-serif font-bold text-sm text-[#1E1C1A] flex items-center justify-between gap-3 hover:text-[#B8882C] cursor-pointer"
              >
                <span>{item.question}</span>
                <span className="text-xs text-[#B8882C] font-mono">{isOpen ? "—" : "+"}</span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs text-[#595247] leading-relaxed border-t border-[#F5EFE4] pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
