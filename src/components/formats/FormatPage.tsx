import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/home/SectionTitle";
import SectionDividers from "@/components/SectionDividers";
import FestivalImagesList from "@/components/festivals/FestivalImagesList";
import JudgesList from "@/components/judges/judges-list";
import bgPage from "@/assets/bg-championship.png";
import bgPatternImg from "@/assets/bg-pattern-red.png";
import heroMainImg from "@/assets/hero-main.png";
import { TEventFormat } from "./formats-data";

const FormatPage = ({ format }: { format: TEventFormat }) => {
  return (
    <main
      className="max-container min-h-screen pt-6 w-full bg-cover bg-top overflow-hidden"
      style={{ backgroundImage: `url('${bgPage.src}')` }}
    >
      <section className="pb-14 px-4 sm:px-6 md:px-8 relative">
        <SectionTitle className="text-main-blue text-center">
          {format.title}
          <span className="text-main-red">{format.titleAccent}</span>
        </SectionTitle>
        <div className="mt-6 flex flex-col md:flex-row justify-evenly gap-6">
          <article className="text-slate-500 text-lg max-w-3xl flex flex-col gap-6">
            {format.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="flex flex-wrap gap-4">
              {format.stats.map((s) => (
                <div key={s.label} className="bg-white shadow-custom rounded-xl px-5 py-3">
                  <div className="text-2xl font-bold text-main-blue">{s.value}</div>
                  <div className="text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </article>
          <aside className="flex flex-col gap-4 justify-center font-semibold text-center min-w-max">
            <Link href="/apply/stand" className="bg-main-red text-white shadow-custom rounded-xl p-3 px-6">
              Забронировать стенд
            </Link>
            <Link href="#guests" className="bg-white shadow-custom rounded-xl p-3 px-6">
              Спикеры и гости
            </Link>
            <Link href="#results" className="bg-white shadow-custom rounded-xl p-3 px-6">
              {format.highlightsTitle}
            </Link>
          </aside>
        </div>
        <FestivalImagesList />
        <SectionDividers />
      </section>

      <section id="guests" className="pb-16 px-4 sm:px-6 md:px-8 pt-32 bg-white relative">
        <SectionTitle className="text-3xl sm:text-4xl md:text-5xl">{format.guestsTitle}</SectionTitle>
        <div className="mt-12">
          <JudgesList judges={format.guests} descriptionMaxLength={140} />
        </div>
        <SectionDividers />
      </section>

      <section className="pb-16 px-4 sm:px-6 md:px-8 pt-32 bg-white relative">
        <SectionTitle className="text-3xl sm:text-4xl md:text-5xl">Партнёры</SectionTitle>
        <div className="mt-12 flex justify-around flex-wrap gap-6">
          {format.partners.map((p) => (
            <div key={p.name} className="w-full max-w-lg flex flex-col gap-3">
              <div className="relative p-4 rounded-2xl shadow-custom2 bg-white">
                <div className="relative h-[250px] w-full">
                  <Image src={p.img.src} alt={p.name} fill sizes="100vw" style={{ objectFit: "contain" }} />
                </div>
              </div>
              <div className="text-xl font-medium">{p.name}</div>
              <p className="text-slate-500">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="results"
        className="bg-main-red h-screen max-h-[700px] sm:max-h-[800px] lg:max-h-[1000px] bg-contain bg-center relative px-4 sm:px-6 md:px-8"
        style={{ backgroundImage: `url('${bgPatternImg.src}')` }}
      >
        <SectionTitle className="uppercase text-white pt-16 text-center md:text-left text-3xl sm:text-4xl md:text-5xl">
          {format.highlightsTitle}
        </SectionTitle>
        <div className="text-white text-2xl md:text-3xl mt-10 flex flex-col gap-4 z-10 relative">
          {format.highlights.map((h) => (
            <p key={h}>{h}</p>
          ))}
        </div>
        <div className="absolute right-0 z-0 bottom-0 w-full sm:w-2/3 md:max-w-[55%] flex-shrink-0">
          <Image src={heroMainImg} alt="Иллюстрация мероприятия" className="w-full" />
        </div>
      </section>
    </main>
  );
};

export default FormatPage;
