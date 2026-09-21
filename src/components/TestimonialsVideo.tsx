import React, { useState, useRef } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, ShieldCheck, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "../data/kimiaData";
import { ModalType } from "../types";
import solidarityImg from "../assets/images/kimia_women_solidarity_1790018882299.jpg";

interface TestimonialsVideoProps {
  onOpenModal: (type: ModalType) => void;
}

export const TestimonialsVideo: React.FC<TestimonialsVideoProps> = ({ onOpenModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeTestimony = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Handle cursor hover or touch start to play like a GIF
  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleTouchToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
      videoRef.current?.pause();
    } else {
      setIsPlaying(true);
      videoRef.current?.play().catch(() => {});
    }
  };

  return (
    <section id="a-propos" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Interactive Video Element (Plays like a GIF on hover/touch) */}
          <div className="lg:col-span-6">
            <div
              className="relative group rounded-2xl overflow-hidden shadow-lg border border-[#E5DCcb] bg-black aspect-16/10 cursor-pointer select-none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchToggle}
              onClick={() => onOpenModal("video")}
              title="Cliquez pour voir la vidéo intégrale ou survolez pour animer"
            >
              {/* HTML5 Video element with silent loop, loaded with royalty-free video or animated solidarity stream */}
              <video
                ref={videoRef}
                poster={solidarityImg}
                muted
                playsInline
                loop
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  isPlaying ? "opacity-100" : "opacity-90"
                }`}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              />

              {/* Poster fallback image when not playing or video loading */}
              {!isPlaying && (
                <img
                  src={solidarityImg}
                  alt="Femmes congolaises solidaires et écoutées"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300"
                />
              )}

              {/* Dark subtle overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity" />

              {/* Central Play/Pause Button indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl ${
                    isPlaying
                      ? "bg-[#D4A346]/90 text-white scale-90"
                      : "bg-white/80 text-[#1E1C1A] hover:bg-white scale-100 group-hover:scale-110"
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  )}
                </div>
              </div>

              {/* Active playback badge */}
              {isPlaying && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#E5B54F]" />
                  <span>Lecture en cours (GIF actif)</span>
                </div>
              )}

              {/* Bottom Card Labels matching mockup */}
              <div className="absolute bottom-5 left-0 right-0 px-6 text-center text-white">
                <p className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-md">
                  Découvrir leurs témoignages
                </p>
                <p className="text-xs sm:text-sm text-[#E7DEC8] mt-1 flex items-center justify-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A346]" />
                  <span>
                    {isPlaying
                      ? "Vidéo en lecture • Cliquez pour le plein écran avec son"
                      : "Survolez ou touchez pour lire la vidéo"}
                  </span>
                </p>
              </div>
            </div>

            {/* Micro reassurance under video */}
            <div className="flex items-center justify-between text-xs text-[#7A7264] mt-3 px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4A346]" />
                Témoignages authentiques et protégés
              </span>
              <button
                onClick={() => onOpenModal("video")}
                className="hover:text-[#1E1C1A] underline cursor-pointer"
              >
                Ouvrir le lecteur complet
              </button>
            </div>
          </div>

          {/* Right Column: Copy & Testimonial Carousel */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#C5993F]">
                Témoignages
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1C1A] mt-2 leading-tight">
                Elles ont osé parler, <br />
                Elles ont été écoutées
              </h2>
            </div>

            <p className="text-[#5E574B] text-base leading-relaxed">
              Découvrez les histoires vraies de femmes qui, grâce à l'information et à
              l'accompagnement, ont pu se relever, faire valoir leurs droits et reprendre le
              contrôle de leur vie.
            </p>

            {/* Testimonial Quote Card */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E8E1D2] shadow-xs relative transition-all">
              <div className="font-serif text-4xl text-[#D4A346] leading-none mb-2 select-none">
                “
              </div>
              <blockquote className="text-[#2C2925] text-base sm:text-lg font-medium leading-snug italic">
                « {activeTestimony.quote} »
              </blockquote>
              <p className="text-[#635B4E] text-sm mt-3 leading-relaxed">
                {activeTestimony.story}
              </p>

              <div className="mt-5 pt-4 border-t border-[#F1EBE0] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-semibold text-sm text-[#1E1C1A]">
                    {activeTestimony.name}
                  </div>
                  <div className="text-xs text-[#8C8373]">
                    {activeTestimony.city} • Référence : {activeTestimony.lawTopic}
                  </div>
                </div>

                <span className="text-[11px] font-semibold bg-[#FAF4E8] text-[#8A6720] border border-[#ECDDBF] px-2.5 py-1 rounded-md">
                  Témoignage vérifié
                </span>
              </div>
            </div>

            {/* Carousel Navigation: Dots & Arrow Buttons */}
            <div className="flex items-center justify-between pt-2">
              {/* Pagination Dots */}
              <div className="flex items-center space-x-2">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? "w-8 bg-[#D4A346]"
                        : "w-2.5 bg-[#DDD5C5] hover:bg-[#B3A996]"
                    }`}
                    aria-label={`Voir témoignage ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows matching the mockup */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#D5CDBF] bg-white hover:bg-[#F6F1E6] text-[#2D2A26] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#D5CDBF] bg-white hover:bg-[#F6F1E6] text-[#2D2A26] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
