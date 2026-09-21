import React from "react";
import { KimiaLogo } from "./KimiaLogo";
import { Smartphone, Facebook, Instagram, Youtube, Linkedin, Heart } from "lucide-react";
import { ModalType } from "../types";

interface FooterProps {
  onOpenModal: (type: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EAE3D5] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#ECE5D8]">
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4 space-y-5">
            <KimiaLogo size="md" />

            <div className="pt-2">
              <p className="text-xs font-semibold text-[#575044] mb-3">Suivez-nous</p>
              <div className="flex items-center space-x-3 text-[#1E1C1A]">
                <a
                  href="#suivez-nous"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal("community");
                  }}
                  className="w-9 h-9 rounded-full bg-white border border-[#DDD5C5] hover:border-[#D4A346] hover:bg-[#F7F2E7] flex items-center justify-center transition-colors"
                  aria-label="Facebook MALK'ia"
                >
                  <Facebook className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="#suivez-nous"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal("community");
                  }}
                  className="w-9 h-9 rounded-full bg-white border border-[#DDD5C5] hover:border-[#D4A346] hover:bg-[#F7F2E7] flex items-center justify-center transition-colors"
                  aria-label="Instagram MALK'ia"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#suivez-nous"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal("video");
                  }}
                  className="w-9 h-9 rounded-full bg-white border border-[#DDD5C5] hover:border-[#D4A346] hover:bg-[#F7F2E7] flex items-center justify-center transition-colors"
                  aria-label="YouTube MALK'ia"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="#suivez-nous"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal("community");
                  }}
                  className="w-9 h-9 rounded-full bg-white border border-[#DDD5C5] hover:border-[#D4A346] hover:bg-[#F7F2E7] flex items-center justify-center transition-colors"
                  aria-label="LinkedIn MALK'ia"
                >
                  <Linkedin className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Liens utiles */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-[#1E1C1A]">Liens utiles</h4>
            <ul className="space-y-2 text-sm text-[#5E574B]">
              <li>
                <a
                  href="#notre-livre"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal("book");
                  }}
                  className="hover:text-[#1E1C1A] transition-colors"
                >
                  Notre livre
                </a>
              </li>
              <li>
                <a href="#conseils" className="hover:text-[#1E1C1A] transition-colors">
                  Conseils
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal("lawyer")}
                  className="hover:text-[#1E1C1A] transition-colors text-left cursor-pointer"
                >
                  Avocats
                </button>
              </li>
              <li>
                <a href="#communaute" className="hover:text-[#1E1C1A] transition-colors">
                  Communauté
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal("app")}
                  className="hover:text-[#1E1C1A] transition-colors text-left cursor-pointer"
                >
                  Application
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Plus */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-[#1E1C1A]">Plus</h4>
            <ul className="space-y-2 text-sm text-[#5E574B]">
              <li>
                <button
                  onClick={() => onOpenModal("terms")}
                  className="hover:text-[#1E1C1A] transition-colors text-left cursor-pointer"
                >
                  Conditions d'utilisation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal("privacy")}
                  className="hover:text-[#1E1C1A] transition-colors text-left cursor-pointer"
                >
                  Politique du site
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal("faq")}
                  className="hover:text-[#1E1C1A] transition-colors text-left cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#1E1C1A] transition-colors">
                  Nous contacter
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal("diagnostics")}
                  className="text-xs font-semibold text-[#966723] hover:underline transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Diagnostic & Test E-mails</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: App Download CTA matching mockup */}
          <div className="lg:col-span-3 space-y-3 flex flex-col justify-start">
            <button
              onClick={() => onOpenModal("app")}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#D4A346] hover:bg-[#C59639] active:bg-[#AF822D] text-[#1E1C1A] font-semibold text-sm rounded-xl transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Smartphone className="w-5 h-5" />
              <span>Télécharger l'application</span>
            </button>
            <p className="text-xs text-center text-[#736B5E]">MALK'ia, toujours avec vous.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7264]">
          <p>© 2026 MALK'ia. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            <span>Une initiative pour des femmes plus fortes en RDC</span>
            <span className="text-[#C5993F]">💛</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
