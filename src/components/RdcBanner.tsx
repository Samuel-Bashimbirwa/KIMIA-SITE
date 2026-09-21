import React from "react";
import { Users, ArrowRight } from "lucide-react";
import { ModalType } from "../types";
import congoWomanImg from "../assets/images/kimia_congo_woman_1790018892904.jpg";

interface RdcBannerProps {
  onOpenModal: (type: ModalType) => void;
}

export const RdcBanner: React.FC<RdcBannerProps> = ({ onOpenModal }) => {
  return (
    <section id="communaute" className="py-12 lg:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#F6F0E4] border border-[#E7DEC8] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left Photo */}
            <div className="md:col-span-4 h-64 md:h-full relative overflow-hidden">
              <img
                src={congoWomanImg}
                alt="Femme congolaise observant le fleuve Congo à Kinshasa"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F6F0E4]/80 hidden md:block" />
            </div>

            {/* Middle Content */}
            <div className="md:col-span-5 p-8 sm:p-10 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] leading-tight">
                Ensemble pour une RDC <br />
                où chaque femme compte
              </h2>

              <p className="text-[#5E574B] text-sm sm:text-base leading-relaxed">
                De Kinshasa à Lubumbashi, de Goma à Matadi, nos actions soutiennent les femmes
                dans toutes les provinces.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenModal("community")}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#FAF6EE] text-[#1E1C1A] border border-[#D5CBB8] font-semibold text-sm rounded-lg transition-all shadow-xs hover:shadow-sm cursor-pointer group"
                >
                  <Users className="w-4 h-4 text-[#8C6B24]" />
                  <span>Intégrer la communauté</span>
                  <ArrowRight className="w-4 h-4 text-[#1E1C1A] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: RDC Map silhouette with handwritten quote */}
            <div className="md:col-span-3 p-8 flex flex-col items-center justify-center relative select-none">
              {/* Stylized outline of the Democratic Republic of Congo */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-[#EBDDC3] fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Organic silhouette representing DRC */}
                  <path
                    d="M50 35 C65 20, 110 25, 130 40 C145 50, 165 45, 175 65 C185 85, 170 105, 175 130 C180 150, 155 175, 135 180 C115 185, 100 170, 85 175 C65 180, 50 160, 40 145 C30 130, 20 115, 25 90 C30 70, 35 45, 50 35 Z"
                    opacity="0.8"
                  />
                  {/* Subtle province internal lines */}
                  <path
                    d="M50 80 Q100 90 145 75 M70 120 Q110 130 155 125"
                    stroke="#D8C5A2"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    fill="none"
                  />
                </svg>

                {/* Handwritten Calligraphy Text on top of the Map */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                  <p className="font-hand text-[#2B2722] text-2xl sm:text-[28px] font-bold leading-tight rotate-[-4deg]">
                    Toutes, <br />
                    partout, <br />
                    <span className="text-[#A4761E]">plus fortes !</span>
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-medium text-[#8A8172] mt-2">
                26 provinces unies
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
