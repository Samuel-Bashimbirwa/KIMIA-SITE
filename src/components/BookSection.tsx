import React from "react";
import { CheckCircle2, BookOpen, ArrowRight, Eye } from "lucide-react";
import { ModalType } from "../types";
import bookImg from "../assets/images/book_cover_malkia_1790028433830.jpg";

interface BookSectionProps {
  onOpenModal: (type: ModalType) => void;
}

export const BookSection: React.FC<BookSectionProps> = ({ onOpenModal }) => {
  const checkpoints = [
    "Lois congolaises et internationales",
    "Cas pratiques et exemples concrets",
    "Conseils d'experts (juristes, psychologues, activistes)",
    "Ressources utiles et contacts",
  ];

  return (
    <section id="notre-livre" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Information & Key Bullet Points */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#C5993F]">
                Le livre de référence
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E1C1A] mt-2 leading-tight">
                L'ABC des Violences Basées sur le Genre
              </h2>
              <p className="text-sm font-semibold text-[#8B6E30] mt-1 tracking-wide">
                par NGOIE WA NGOIE
              </p>
            </div>

            <p className="text-[#595247] text-base sm:text-lg leading-relaxed font-normal">
              Un ouvrage complet qui regroupe les lois congolaises et internationales sur les
              violences et les abus, expliqué de manière simple et accessible à toutes.
            </p>

            {/* Checkpoints list */}
            <div className="space-y-3.5 pt-2">
              {checkpoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4A346] shrink-0 mt-0.5 fill-[#FAF4E8]" />
                  <span className="text-[#36322D] text-base font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenModal("book")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D4A346] hover:bg-[#C29337] text-[#1E1C1A] font-semibold text-base rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <BookOpen className="w-5 h-5 text-[#1E1C1A]" />
                <span>Procurez-vous le livre</span>
                <ArrowRight className="w-4 h-4 text-[#1E1C1A] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenModal("book")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[#544D42] hover:text-[#1E1C1A] font-medium text-sm rounded-lg hover:bg-[#F2ECE1] transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Consulter le sommaire</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Book Visual & Handwritten Quote */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center">
            <div className="relative w-full max-w-md">
              {/* Handwritten Quote placed elegantly next to the book */}
              <div className="absolute -top-6 -right-2 sm:-right-8 z-20 select-none text-right max-w-xs">
                <p className="font-hand text-[#2B2722] text-2xl sm:text-3xl leading-snug rotate-[4deg] drop-shadow-xs">
                  « L'information <br />
                  est une arme puissante <br />
                  <span className="text-[#B8882C]">contre la violence.</span> »
                </p>
              </div>

              {/* Realistic 3D Book Display */}
              <div className="relative pt-8 pb-4 flex justify-center">
                <div className="relative group transition-transform duration-500 hover:-translate-y-2 hover:rotate-1">
                  {/* Subtle Book shadow underneath */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/15 blur-lg rounded-full" />

                  {/* Standing Book Mockup */}
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#E3DAC8] bg-white max-w-[320px] sm:max-w-[360px]">
                    <img
                      src={bookImg}
                      alt="L'ABC des Violences Basées sur le Genre par NGOIE WA NGOIE - MALK'ia"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Quick distribution hint */}
              <div className="text-center mt-3 text-xs text-[#7A7264]">
                Disponible en édition papier dans toute la RDC et en version numérique PDF
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
