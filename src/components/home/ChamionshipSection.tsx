import SectionTitle from "./SectionTitle";
import ClipCard from "./ClipCard";
import { EVENT_FORMATS } from "@/components/formats/formats-data";

const ChampionshipSection = () => {
  return (
    <section className="page-container px-4 sm:px-8 md:px-10 pt-16 pb-24">
      <SectionTitle className="text-main-blue">Форматы</SectionTitle>

      <div className="flex justify-evenly flex-wrap gap-8 md:gap-4 mt-10">
        {EVENT_FORMATS.map((f) => (
          <ClipCard key={f.slug} link={`/formats/${f.slug}`} imgSrc={f.cover.src} label={f.cardLabel} isBlueType={f.isBlue} />
        ))}
      </div>
    </section>
  );
};

export default ChampionshipSection;
