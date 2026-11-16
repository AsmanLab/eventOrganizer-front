"use client";

import Image from "next/image";
import { useState } from "react";
import { Pin } from "lucide-react";
import { TSponsor } from "shared/types/sponsor";
import { getImageURL } from "../lib/utils";

const SponsorCard: React.FC<{ sponsor: TSponsor }> = ({ sponsor }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <div
      className="bg-white p-4 h-48 rounded-3xl relative group overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-main-blue"
      onClick={toggleDetails}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleDetails();
        }
      }}
    >
      <Image
        alt={sponsor.project_name}
        src={getImageURL(sponsor.logo) || ""}
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{ objectFit: "contain" }}
      />
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white p-3 transition-transform duration-300 z-10
            ${showDetails ? "translate-x-0" : "translate-x-full"}
            group-hover:translate-x-0`}
      >
        <div>
          <h4 className="font-semibold">{sponsor.project_name}</h4>
          <p className="max-w-lg text-sm">{sponsor.description}</p>
        </div>
      </div>
      {showDetails && (
        <span className="absolute z-20 right-4 text-main-blue rotate-[35deg]">
          <Pin size={16} />
        </span>
      )}
    </div>
  );
};

export default SponsorCard;
