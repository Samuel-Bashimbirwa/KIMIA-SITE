import React from "react";

interface KimiaLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export const KimiaLogo: React.FC<KimiaLogoProps> = ({
  className = "",
  showSubtitle = true,
  size = "md",
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const subSizes = {
    sm: "text-[9px]",
    md: "text-[11px]",
    lg: "text-[12px]",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Woman Silhouette with Headwrap Icon */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-full flex items-center justify-center bg-[#FAF4E8] text-[#1E1C1A] border border-[#E8DEC8] shadow-xs`}
        title="MALK'ia - Défense des droits des femmes"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 text-[#1E1C1A]"
        >
          {/* Stylized African woman profile with turban/gele */}
          <path
            d="M24 6C17 6 12 11 12 17C12 21.5 14.5 24 16 26C15 28 14 31 14 35C14 41 18 43 24 43C30 43 34 41 34 35C34 31 33 28 32 26C33.5 24 36 21.5 36 17C36 11 31 6 24 6Z"
            fill="#1E1C1A"
          />
          {/* Turban fold accents in golden ochre */}
          <path
            d="M17 11C20 8.5 28 8.5 31 11C29 14 26 15 24 15C22 15 19 14 17 11Z"
            fill="#D4A346"
          />
          <path
            d="M15 16C19 14 29 14 33 16C31 18.5 27 19.5 24 19.5C21 19.5 17 18.5 15 16Z"
            fill="#E8C576"
          />
          {/* Graceful neck and earring */}
          <circle cx="28.5" cy="27.5" r="2.2" fill="#D4A346" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-tight text-[#1E1C1A] leading-tight ${textSizes[size]}`}
        >
          MALK'ia
        </span>
        {showSubtitle && (
          <span
            className={`text-[#736B5E] font-medium tracking-normal leading-none mt-0.5 ${subSizes[size]}`}
          >
            Connaître ses droits, c'est mieux
          </span>
        )}
      </div>
    </div>
  );
};
