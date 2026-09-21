import React from "react";
import { BookOpen, Scale, Users, PhoneCall, Shield, ArrowUpRight } from "lucide-react";
import { ModalType } from "../types";

interface ActionDomainsProps {
  onOpenModal: (type: ModalType) => void;
}

export const ActionDomains: React.FC<ActionDomainsProps> = ({ onOpenModal }) => {
  const domains = [
    {
      title: "Accès à l'information",
      description: "Des contenus fiables et à jour sur vos droits.",
      icon: BookOpen,
      action: () => onOpenModal("book"),
      badge: "Lois & Guides",
    },
    {
      title: "Orientation juridique",
      description: "Mise en relation avec des avocats partenaires.",
      icon: Scale,
      action: () => onOpenModal("lawyer"),
      badge: "Barreaux RDC",
    },
    {
      title: "Soutien communautaire",
      description: "Une communauté solidaire pour échanger et se soutenir.",
      icon: Users,
      action: () => onOpenModal("community"),
      badge: "Entraide",
    },
    {
      title: "Assistance et conseils",
      description: "Des réponses à vos questions et une orientation adaptée.",
      icon: PhoneCall,
      action: () => {
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
      },
      badge: "Écoute 24/7",
    },
    {
      title: "Sensibilisation",
      description: "Des campagnes pour prévenir les violences et changer les mentalités.",
      icon: Shield,
      action: () => onOpenModal("community"),
      badge: "Plaidoyer",
    },
  ];

  return (
    <section id="conseils" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-[#C5993F]">
            Nos domaines d'action
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1C1A] mt-2 tracking-tight">
            Informer. Accompagner. Protéger.
          </h2>
        </div>

        {/* 5 Column Grid matching the mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.title}
                onClick={domain.action}
                className="group relative bg-white/70 hover:bg-white rounded-2xl p-6 border border-[#E9E1D2] hover:border-[#D4A346]/60 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col items-center text-center cursor-pointer"
              >
                {/* Icon in delicate ochre circle */}
                <div className="w-14 h-14 rounded-2xl bg-[#FAF5EB] group-hover:bg-[#F4E9D0] flex items-center justify-center text-[#B8882C] group-hover:text-[#976C18] transition-colors mb-4 border border-[#ECE2D0]">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-lg text-[#1E1C1A] mb-2 leading-snug group-hover:text-[#B8882C] transition-colors">
                  {domain.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#665F53] leading-relaxed mb-4 grow">
                  {domain.description}
                </p>

                {/* Subtle trigger link */}
                <div className="text-xs font-semibold text-[#8C8271] group-hover:text-[#1E1C1A] flex items-center gap-1 transition-colors mt-auto">
                  <span>En savoir plus</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
