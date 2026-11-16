import { arkhip } from "app/fonts";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import heroMainImg from "@/assets/hero-main.png";
import SectionDividers from "../SectionDividers";
import { BRAND } from "shared/brand";

const HeroSection = () => {
  return (
    <section className="h-screen max-h-[800px] md:max-h-[700px] relative w-full pb-10 pt-12 md:pt-16">
      {/* Hero Content */}
      <div className="page-container px-4 sm:px-8 md:px-10 flex flex-col md:flex-row items-center">
        {/* Left Side: Text Content */}
        <div className="w-full text-center md:text-left">
          <h1
            className={`${arkhip.className} text-main-red text-4xl sm:text-5xl md:text-6xl w-full`}
          >
            {BRAND.heroTitleTop}{" "}
            <span className="text-main-blue block">{BRAND.heroTitleBottom}</span>
          </h1>
          <p className="text-gray-700 md:text-lg md:max-w-[600px] pt-6">
            {BRAND.description}
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div className="flex items-center bg-main-blue text-white px-4 py-2 rounded-xl">
              <Calendar size={18} className="mr-2" /> {BRAND.dates}
            </div>
            <div className="flex items-center bg-main-red text-white px-4 py-2 rounded-xl">
              <MapPin size={18} className="min-w-[18px] min-h-[18px] mr-2" /> {BRAND.venue}
            </div>
          </div>
        </div>

        {/* Right Side: Hero Image */}
        <div className="flex-[0.5] w-full sm:w-2/3 md:max-w-[55%] absolute right-0 bottom-0">
          <Image
            src={heroMainImg}
            alt="Иллюстрация мероприятия"
            className="w-full"
            priority
          />
        </div>
      </div>

      {/* Section Dividers */}
      <SectionDividers />
    </section>
  );
};

export default HeroSection;
