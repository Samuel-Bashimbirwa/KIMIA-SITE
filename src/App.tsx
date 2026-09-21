import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TestimonialsVideo } from "./components/TestimonialsVideo";
import { BookSection } from "./components/BookSection";
import { ActionDomains } from "./components/ActionDomains";
import { RdcBanner } from "./components/RdcBanner";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Modals } from "./components/Modals";
import { ModalType } from "./types";
import { Shield, PhoneCall } from "lucide-react";

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [activeSection, setActiveSection] = useState("accueil");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["accueil", "a-propos", "notre-livre", "conseils", "communaute", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#22201D] flex flex-col font-sans selection:bg-[#E8C576] selection:text-[#1E1C1A]">
      {/* Top Banner for Urgent Helpline */}
      <div className="bg-[#211E1A] text-[#EFEAE1] px-4 py-2 text-xs flex items-center justify-between border-b border-[#38332C]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E5B54F] animate-ping" />
            <span className="font-semibold text-white">Ligne d'écoute & assistance RDC :</span>
            <span className="hidden sm:inline text-[#D9D1C3]">
              Gratuite, anonyme et accessible 24h/24
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:122"
              className="font-bold text-[#E5B54F] hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Numéro vert : 122</span>
            </a>
            <button
              onClick={() => setActiveModal("lawyer")}
              className="text-xs text-[#DDD5C5] hover:text-white underline cursor-pointer hidden md:inline"
            >
              Avocats de permanence
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <Navbar onOpenModal={setActiveModal} activeSection={activeSection} />

      {/* Main Single Page Scrollable Content matching the user's mockup */}
      <main className="grow">
        {/* 1. Hero Section */}
        <Hero onOpenModal={setActiveModal} />

        {/* 2. Testimonials & Interactive Video (Plays like a GIF on hover/touch) */}
        <TestimonialsVideo onOpenModal={setActiveModal} />

        {/* 3. Notre Livre Section (3D Guide & checkpoints) */}
        <BookSection onOpenModal={setActiveModal} />

        {/* 4. Action Domains (Informer. Accompagner. Protéger.) */}
        <ActionDomains onOpenModal={setActiveModal} />

        {/* 5. RDC Banner (Kinshasa view & map silhouette) */}
        <RdcBanner onOpenModal={setActiveModal} />

        {/* 6. Questions & Contact Form (Linked to samuelbashimbirwa@gmail.com) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenModal={setActiveModal} />

      {/* Interactive Modals System */}
      <Modals
        activeModal={activeModal}
        onClose={() => setActiveModal("none")}
        onOpenAnotherModal={setActiveModal}
      />

      {/* Discreet Quick Helpline Floating Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setActiveModal("lawyer")}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#24211D] hover:bg-[#151311] text-white rounded-full shadow-2xl border border-[#484239] transition-all hover:scale-105 cursor-pointer group"
          title="Besoin d'orientation juridique d'urgence ?"
        >
          <Shield className="w-4 h-4 text-[#D4A346]" />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            Aide & Avocats
          </span>
          <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
        </button>
      </div>
    </div>
  );
}
