import { Metadata } from "next";
import ClipCard from "@/components/home/ClipCard";
import bgPage from "@/assets/bg-championship.png";
import { EVENT_FORMATS } from "@/components/formats/formats-data";

export const metadata: Metadata = {
  title: "Форматы мероприятий",
  description: "Career fair, comic con, экспо и другие мероприятия со стендами на платформе EventPeak (демо).",
};

const FormatsPage = () => {
  return (
    <div
      className="max-container min-h-screen pt-8 pb-10 px-4 sm:px-6 md:px-8 bg-cover bg-top"
      style={{ backgroundImage: `url('${bgPage.src}')` }}
    >
      <div className="w-full flex items-center gap-8 md:gap-6 flex-wrap xl:flex-nowrap">
        <div>
          <h1 className="font-semibold text-5xl md:text-6xl max-w-xl">
            <span className="text-main-red">Любые форматы</span> с бронированием стендов
          </h1>
          <p className="mt-6 max-w-4xl text-slate-500 font-medium">
            Одна платформа для ярмарок вакансий, фестивалей поп-культуры, отраслевых выставок и маркетов:
            схема зала, онлайн-заявки экспонентов, билеты с QR-кодом и админ-панель для организатора.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          {EVENT_FORMATS.map((f) => (
            <div key={f.slug} className="flex flex-col sm:flex-row gap-10">
              <ClipCard imgSrc={f.cover.src} label={f.cardLabel} isBlueType={f.isBlue} link={`/formats/${f.slug}`} />
              <div>
                <h3 className="text-xl font-semibold">{f.cardLabel}</h3>
                <p className="tex-base lg:text-lg text-slate-500 w-full max-w-3xl">{f.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatsPage;
