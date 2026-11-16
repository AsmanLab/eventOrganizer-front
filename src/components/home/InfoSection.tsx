import SectionTitle from "./SectionTitle";
import bgBluePatternImg from "assets/bg-pattern-blue.png";
import { cn } from "../lib/utils";
import pieSvg from "@/assets/pie.svg";
import chatSvg from "@/assets/chat.svg";
import listSvg from "@/assets/list.svg";
import likeSvg from "@/assets/like.svg";
import profileSvg from "@/assets/profile.svg";
import zvezdaSvg from "@/assets/zvezda.svg";
import Image from "next/image";

const BENEFITS_DATA = [
  {
    title: "Забронировать стенд онлайн",
    description:
      "Интерактивная схема зала: свободные, забронированные и занятые места видны сразу.",
    className: "text-main-blue bg-white",
    icon: likeSvg,
    iconSize: 50,
  },
  {
    title: "Найти клиентов и партнёров",
    description:
      "Тысячи посетителей с понятными целями визита — от соискателей до закупщиков.",
    className: "text-main-blue bg-white",
    icon: profileSvg,
    iconSize: 50,
  },
  {
    title: "Нанять сотрудников",
    description:
      "Формат career fair: знакомьтесь с кандидатами вживую и собирайте контакты.",
    className: "text-main-blue bg-white",
    icon: listSvg,
    iconSize: 50,
  },
  {
    title: "Получить статистику по мероприятию",
    description:
      "Посетители, заявки, спикеры и партнёры — всё в одной админ-панели.",
    className: "text-main-blue bg-white",
    icon: pieSvg,
    iconSize: 60,
  },
  {
    title:
      "Показать продукт широкой и заинтересованной аудитории",
    description:
      "Comic con, экспо, ярмарки и конференции: аудитория сама приходит к вашему стенду.",
    className: "text-main-blue bg-white lg:col-span-2 md:flex-row md:p-8",
    icon: chatSvg,
    iconSize: 80,
  },
  {
    title: "Выступить на сцене или провести панель",
    description:
      "Подайте заявку спикера — организатор подтвердит её в пару кликов.",
    className: "text-main-blue bg-white lg:col-span-2 md:flex-row md:p-8",
    icon: zvezdaSvg,
    iconSize: 90,
  },
];

export default function InfoSection() {
  return (
    <section
      className="max-container text-white bg-main-blue py-24 px-6 bg-cover"
      style={{ backgroundImage: `url(${bgBluePatternImg.src})` }}
    >
      <div className="page-container px-4 sm:px-8 md:px-10">
        <SectionTitle className="text-center lg:text-left">
          Экспоненты смогут
        </SectionTitle>

        <div className="grid grid-cols-1 grid-rows-6 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-4  gap-8 mt-10 items-stretch">
          {BENEFITS_DATA.map((benefit, index) => (
            <div
              key={`benefit-${index}`}
              className={cn(
                "bg-white text-black p-6 rounded-3xl flex flex-col relative",
                benefit.className
              )}
            >
              {/* Content section that will grow */}
              <div className="text-left flex-1 z-10">
                <h4 className="text-lg font-semibold max-w-md leading-5">
                  {benefit.title}
                </h4>
                <p className="max-w-sm text-xs mt-2">{benefit.description}</p>
              </div>

              {/* Icon section */}
              <div className="hidden lg:block text-2xl flex-end absolute right-5 bottom-5 z-0">
                <Image
                  src={benefit.icon.src}
                  alt=""
                  width={benefit.iconSize}
                  height={benefit.iconSize}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
