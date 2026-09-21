import React, { useState, useRef, useEffect } from "react";
import { KimiaLogo } from "./KimiaLogo";
import { ChevronDown, Menu, X, BookOpen, Users, Scale, PhoneCall, Smartphone, ShieldCheck, HelpCircle, FileText, Lock, Activity } from "lucide-react";
import { ModalType } from "../types";

interface NavbarProps {
  onOpenModal: (type: ModalType) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, activeSection }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "#accueil", id: "accueil" },
    { label: "À propos", href: "#a-propos", id: "a-propos" },
    { label: "Notre livre", href: "#notre-livre", id: "notre-livre" },
    { label: "Conseils", href: "#conseils", id: "conseils" },
    { label: "Avocats", href: "#avocats", id: "avocats" },
    { label: "Communauté", href: "#communaute", id: "communaute" },
    { label: "Application", href: "#application", id: "application", isModal: "app" as ModalType },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE4D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#accueil" className="focus:outline-hidden focus:ring-2 focus:ring-[#D4A346] rounded-lg p-1">
          <KimiaLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            if (link.isModal) {
              return (
                <button
                  key={link.label}
                  onClick={() => onOpenModal(link.isModal!)}
                  className="text-sm font-medium text-[#4A453E] hover:text-[#1E1C1A] transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </button>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors py-1 relative ${
                  isActive ? "text-[#1E1C1A] font-semibold" : "text-[#4A453E] hover:text-[#1E1C1A]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A346] rounded-full" />
                )}
              </a>
            );
          })}

          {/* Dépliant "Plus ▾" (Interactive Dropdown Menu) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#4A453E] hover:text-[#1E1C1A] px-2.5 py-1.5 rounded-md hover:bg-[#F2ECE1] transition-all cursor-pointer"
              aria-expanded={dropdownOpen}
            >
              <span>Plus</span>
              <ChevronDown
                className={`w-4 h-4 text-[#736B5E] transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-[#D4A346]" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E8E1D2] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-[#F4EFE6] mb-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9E9587]">
                    Services & Informations
                  </p>
                </div>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenModal("lawyer");
                  }}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#2D2A26] hover:bg-[#FAF6EE] hover:text-[#B8882C] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-[#D4A346]" />
                  <span>Contacter un avocat partenaire</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenModal("book");
                  }}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#2D2A26] hover:bg-[#FAF6EE] hover:text-[#B8882C] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#D4A346]" />
                  <span>Procuration du livre (Guide)</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenModal("app");
                  }}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#2D2A26] hover:bg-[#FAF6EE] hover:text-[#B8882C] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-[#D4A346]" />
                  <span>Télécharger l'application Kimia</span>
                </button>

                <div className="border-t border-[#F4EFE6] my-1 pt-1">
                  <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#9E9587]">
                    Cadre légal & Écoute
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#2D2A26] hover:bg-[#FAF6EE] hover:text-[#B8882C] flex items-center gap-2.5 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#D4A346]" />
                  <span>Demander un conseil / Nous contacter</span>
                </a>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenModal("faq");
                  }}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#2D2A26] hover:bg-[#FAF6EE] hover:text-[#B8882C] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-[#736B5E]" />
                  <span>Foire aux questions (FAQ)</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenModal("terms");
                  }}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#2D2A26] hover:bg-[#FAF6EE] hover:text-[#B8882C] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#736B5E]" />
                  <span>Conditions d'utilisation</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenModal("privacy");
                  }}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#2D2A26] hover:bg-[#FAF6EE] hover:text-[#B8882C] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#736B5E]" />
                  <span>Politique de confidentialité du site</span>
                </button>

                <div className="border-t border-[#F4EFE6] my-1 pt-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenModal("diagnostics");
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#8B5E1E] bg-[#FFF8EB] hover:bg-[#FBEED3] flex items-center gap-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Activity className="w-3.5 h-3.5 text-[#B8882C]" />
                    <span>Diagnostic & Test E-mails</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden gap-2">
          <button
            onClick={() => onOpenModal("book")}
            className="text-xs bg-[#D4A346] text-[#1E1C1A] font-semibold px-3 py-1.5 rounded-md shadow-xs hover:bg-[#C59639]"
          >
            Le Livre
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#4A453E] hover:text-[#1E1C1A] rounded-lg hover:bg-[#F2ECE1]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE4D8] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.isModal) onOpenModal(link.isModal);
                }}
                className="block px-3 py-2 text-base font-medium text-[#2D2A26] rounded-md hover:bg-[#F3EDE1]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="border-t border-[#EAE4D8] pt-3 mt-2 space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-[#9E9587]">
              Accès rapide
            </p>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal("lawyer");
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#2D2A26] flex items-center gap-2 hover:bg-[#F3EDE1] rounded-md"
            >
              <Scale className="w-4 h-4 text-[#D4A346]" /> Contacter un avocat
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal("book");
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#2D2A26] flex items-center gap-2 hover:bg-[#F3EDE1] rounded-md"
            >
              <BookOpen className="w-4 h-4 text-[#D4A346]" /> Procurez-vous le livre
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal("app");
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#2D2A26] flex items-center gap-2 hover:bg-[#F3EDE1] rounded-md"
            >
              <Smartphone className="w-4 h-4 text-[#D4A346]" /> Télécharger l'application
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal("terms");
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#2D2A26] flex items-center gap-2 hover:bg-[#F3EDE1] rounded-md"
            >
              <FileText className="w-4 h-4 text-[#736B5E]" /> Conditions d'utilisation
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal("privacy");
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#2D2A26] flex items-center gap-2 hover:bg-[#F3EDE1] rounded-md"
            >
              <Lock className="w-4 h-4 text-[#736B5E]" /> Politique du site
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal("diagnostics");
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#8B5E1E] bg-[#FFF8EB] flex items-center gap-2 rounded-md font-semibold"
            >
              <Activity className="w-4 h-4 text-[#B8882C]" /> Diagnostic & Test E-mails
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
