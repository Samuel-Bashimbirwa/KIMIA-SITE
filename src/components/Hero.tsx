import React from "react";
import { BookOpen, Users, ArrowRight } from "lucide-react";
import { ModalType } from "../types";
import heroWomanImg from "../assets/images/kimia_hero_woman_1790018867435.jpg";

interface HeroProps {
  onOpenModal: (type: ModalType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section id="accueil" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-7 z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EDE2] border border-[#E5DCcb] text-[#696154] text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A346]" />
              <span>Pour des femmes plus fortes, plus informées, plus protégées</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#1E1C1A] leading-[1.12] tracking-tight">
              Connaître ses droits <br />
              <span className="text-[#C5993F] font-normal italic">
                c'est mieux
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-[#595247] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              MALK'ia est une initiative dédiée à l'information, à l'accompagnement et à la défense des
              femmes en République Démocratique du Congo. Découvrez le livre « L'ABC des Violences Basées sur le Genre » par NGOIE WA NGOIE et notre guide complet sur les droits des femmes face aux violences et aux abus.
            </p>

            {/* 2 Main Buttons matching the mockup */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenModal("book")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D4A346] hover:bg-[#C29337] text-[#1E1C1A] font-semibold text-base rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <BookOpen className="w-5 h-5 text-[#1E1C1A]" />
                <span>Procurez-vous le livre</span>
                <ArrowRight className="w-4 h-4 text-[#1E1C1A] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenModal("community")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-[#F8F5EE] text-[#24211D] border border-[#DDD5C5] font-semibold text-base rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <Users className="w-5 h-5 text-[#595247]" />
                <span>Intégrer la communauté</span>
              </button>
            </div>

            {/* 3 Key Metrics Banner */}
            <div className="pt-8 border-t border-[#EAE3D5] grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A]">
                  +10 000
                </div>
                <div className="text-xs sm:text-sm text-[#736B5E] mt-0.5">
                  femmes informées
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A]">
                  26
                </div>
                <div className="text-xs sm:text-sm text-[#736B5E] mt-0.5">
                  lois décryptées
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A]">
                  1 objectif
                </div>
                <div className="text-xs sm:text-sm text-[#736B5E] mt-0.5">
                  Zéro femme seule
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inspiring Photography with artistic script annotation */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Soft decorative background glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#EEDDC0]/40 to-transparent rounded-3xl -z-10 blur-xl" />

              {/* Main Portrait Frame */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl border border-[#EDE4D4] bg-[#FAF5EB]">
                <img
                  src={heroWomanImg}
                  alt="Femme congolaise forte et digne, protégée par ses droits"
                  className="w-full h-auto object-cover object-center max-h-[540px] transform hover:scale-[1.02] transition-transform duration-700"
                  loading="eager"
                />

                {/* Gradient vignette for legibility of handwritten quote */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                {/* Handwritten Calligraphy Quote matching mockup */}
                <div className="absolute bottom-6 right-6 text-right select-none">
                  <p className="font-hand text-white text-2xl sm:text-3xl md:text-[34px] leading-tight drop-shadow-md rotate-[-2deg] tracking-wide">
                    « Une femme informée <br />
                    <span className="text-[#FFDE8A]">est une femme libre !</span> »
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
