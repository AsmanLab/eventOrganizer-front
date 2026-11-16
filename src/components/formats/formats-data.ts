import { StaticImageData } from "next/image";
import careerImg from "@/assets/championship-1.png";
import conImg from "@/assets/championship-2.png";
import judge1Img from "@/assets/judge_01.png";
import judge2Img from "@/assets/judge_02.png";
import judge3Img from "@/assets/judge_03.png";
import judge4Img from "@/assets/judge_04.jpg";
import judge5Img from "@/assets/judge_05.jpg";
import judge6Img from "@/assets/judge_06.jpg";
import judge7Img from "@/assets/judge_07.jpg";
import judge8Img from "@/assets/judge_08.jpg";
import judge9Img from "@/assets/judge_09.jpg";
import sponsor1Img from "@/assets/sponsor_01.png";
import sponsor2Img from "@/assets/sponsor_02.jpeg";
import sponsor3Img from "@/assets/sponsor_03.png";
import sponsor4Img from "@/assets/sponsor_04.jpeg";

// Demo data: all people and companies below are fictional.

export type TEventFormat = {
  slug: string;
  title: string;
  titleAccent: string;
  cardLabel: string;
  cover: StaticImageData;
  isBlue: boolean;
  summary: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
  guestsTitle: string;
  guests: { name: string; img: StaticImageData | null; description: string }[];
  partners: { name: string; img: StaticImageData; description: string }[];
  highlightsTitle: string;
  highlights: string[];
};

export const EVENT_FORMATS: TEventFormat[] = [
  {
    slug: "career-fair",
    title: "Career",
    titleAccent: " Fair",
    cardLabel: "Career Fair",
    cover: careerImg,
    isBlue: true,
    summary:
      "Ярмарка вакансий: компании бронируют стенды на схеме зала, студенты и специалисты регистрируются и получают QR-билет.",
    paragraphs: [
      "Работодатели выбирают место на интерактивной схеме зала, указывают нужно ли электричество и оставляют заявку — организатор подтверждает её в админ-панели.",
      "Соискатели регистрируются онлайн, указывают цель визита и получают билет с QR-кодом на почту. На входе — быстрая отметка прихода.",
      "Параллельно идут лекции и карьерные консультации: спикеры подают заявки через сайт, а гости видят расписание и стоимость.",
    ],
    stats: [
      { value: "60+", label: "компаний" },
      { value: "3 000", label: "посетителей" },
      { value: "25", label: "лекций" },
    ],
    guestsTitle: "HR-эксперты и спикеры",
    guests: [
      { name: "Тимур Ногоев", img: judge4Img, description: "HR-директор IT-компании; Ментор карьерных программ; 10 лет в найме." },
      { name: "Айгуль Бекова", img: judge5Img, description: "Карьерный консультант; Автор курса по составлению резюме; Спикер студенческих форумов." },
      { name: "Нурлан Касымалиев", img: judge6Img, description: "Руководитель отдела подбора; Эксперт по employer branding; Организатор стажировок." },
      { name: "Жанна Омурова", img: judge7Img, description: "Основатель рекрутингового агентства; Специалист по executive search." },
      { name: "Руслан Садыков", img: judge8Img, description: "CTO продуктовой компании; Проводит технические собеседования и мок-интервью." },
      { name: "Илья Тарасов", img: judge9Img, description: "Lead Recruiter; Эксперт по найму стажёров и junior-специалистов." },
    ],
    partners: [
      { name: "Summit Tech", img: sponsor1Img, description: "Генеральный партнёр: IT-компания, открывает 40+ вакансий и программу стажировок." },
      { name: "Ala Bank", img: sponsor3Img, description: "Партнёр: банк, проводит карьерные консультации для выпускников." },
    ],
    highlightsTitle: "Итоги прошлого сезона",
    highlights: ["1 200 собеседований на площадке", "350 офферов в течение месяца", "92% компаний вернулись снова"],
  },
  {
    slug: "comic-con",
    title: "Comic",
    titleAccent: " Con",
    cardLabel: "Comic Con",
    cover: conImg,
    isBlue: false,
    summary:
      "Фестиваль поп-культуры: стенды художников и магазинов, косплей, гейм-зона, панели с гостями — с продажей билетов и бронированием мест.",
    paragraphs: [
      "Художники, издательства, магазины и игровые студии бронируют стенды на «аллее» и в экспо-зоне — схема показывает свободные места в реальном времени.",
      "Посетители покупают билеты онлайн и получают QR-код. Фото и видео с прошлых лет — в галерее мероприятия.",
      "Гости и косплееры подают заявки на панели и выступления, организатор управляет программой из админки.",
    ],
    stats: [
      { value: "120", label: "стендов" },
      { value: "8 000", label: "гостей" },
      { value: "30", label: "панелей" },
    ],
    guestsTitle: "Гости и ведущие панелей",
    guests: [
      { name: "Азамат Касымов", img: judge1Img, description: "Иллюстратор и автор комиксов; Ведёт мастер-класс по раскадровке." },
      { name: "Диана Сыдыкова", img: judge2Img, description: "Косплеер; Судья косплей-конкурса; Мастер по крафту костюмов." },
      { name: "Ермек Мамытов", img: judge3Img, description: "Геймдизайнер инди-студии; Спикер панели о создании игр." },
    ],
    partners: [
      { name: "Nomad Studio", img: sponsor2Img, description: "Партнёр гейм-зоны: инди-студия, показывает демо новой игры." },
      { name: "Tunduk Academy", img: sponsor4Img, description: "Образовательный партнёр: курсы по иллюстрации и 3D." },
    ],
    highlightsTitle: "Победители косплей-конкурса",
    highlights: ["1 место — Айбек Демо", "2 место — Тимур Пример", "3 место — команда «Вершина»"],
  },
];

export const getFormat = (slug: string) => EVENT_FORMATS.find((f) => f.slug === slug)!;
