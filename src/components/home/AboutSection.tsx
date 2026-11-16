import { features } from "shared/config";
import SectionTitle from "./SectionTitle";
import bgBluePatternImage from "assets/bg-pattern-blue.png";
import bgRedPatternImage from "assets/bg-pattern-red.png";
import { MoveUpRight } from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";

const APPLICATION_LINKS = [
  {
    to: "/apply",
    title: "Получить билет",
    className: "bg-main-red rounded-2xl sm:rounded-none sm:rounded-l-2xl",
    bgPattern: bgRedPatternImage,
  },
  {
    to: "/apply/stand",
    title: "Забронировать стенд",
    className: "bg-main-blue rounded-2xl sm:rounded-none",
    bgPattern: bgBluePatternImage,
  },
  {
    to: "/apply/speaker",
    title: "Стать Спикером",
    className: "bg-main-red rounded-2xl sm:rounded-none sm:rounded-r-2xl",
    bgPattern: bgRedPatternImage,
  },
];

const AboutSection = () => {
  return (
    <section className="page-container px-4 sm:px-8 md:px-10 mt-36 mb-20">
      <SectionTitle className="text-main-blue text-center lg:text-left">
        На <span className="text-main-red">мероприятии</span> вы сможете
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-14 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4">
            <span>
              <feature.icon size={48} className="text-main-blue" />
            </span>
            <p className="md:text-lg text-left lg:max-w-[260px] font-medium">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 sm:mx-4 md:mx-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
        {APPLICATION_LINKS.map((item) => (
          <Link href={item.to} key={item.title} className="w-full">
            <div
              className={cn(
                "min-h-36 flex-1 p-4 flex justify-between text-white bg-contain hover:scale-105 transition-transform hover:cursor-pointer",
                item.className
              )}
              style={{ backgroundImage: `url(${item.bgPattern.src})` }}
            >
              <p className="text-xl self-end font-semibold">{item.title}</p>
              <span>
                <MoveUpRight size={28} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
