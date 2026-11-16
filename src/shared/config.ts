import {
  Building2,
  Handshake,
  LayoutGrid,
  MicVocal,
  Ticket,
  Users,
} from "lucide-react";

// Features Data
export const features = [
  {
    icon: LayoutGrid,
    text: "Выбрать и забронировать стенд прямо на схеме зала",
  },
  { icon: Building2, text: "Представить свою компанию, студию или продукт" },
  { icon: Handshake, text: "Найти партнёров, клиентов и сотрудников" },
  {
    icon: Ticket,
    text: "Получить электронный билет с QR-кодом за минуту",
  },
  { icon: Users, text: "Попасть на лекции, панели и мастер-классы" },
  {
    icon: MicVocal,
    text: "Выступить спикером или провести свою сессию",
  },
];

// CTA Buttons Data
export const ctaButtons = [
  { text: "Получить билет", bg: "bg-main-red" },
  { text: "Забронировать стенд", bg: "bg-main-blue" },
  { text: "Стать Спикером", bg: "bg-main-red" },
];

export const navLinks = [
  {
    title: "Главная",
    path: "/",
  },
  {
    title: "Форматы",
    path: "/formats",
  },
  {
    title: "Мероприятия",
    path: "/festivals",
  },
  {
    title: "Спикеры",
    path: "/speakers",
  },
  {
    title: "Спонсоры",
    path: "/sponsors",
  },
  {
    title: "Контакты",
    path: "/contacts",
  },
];

export const mobileNavLinks = [
  {
    title: "Главная",
    path: "/",
  },
  {
    title: "Форматы",
    path: "/formats",
  },
  {
    title: "Мероприятия",
    path: "/festivals",
  },
  {
    title: "Спикеры",
    path: "/speakers",
  },
  {
    title: "Спонсоры",
    path: "/sponsors",
  },
  {
    title: "Контакты",
    path: "/contacts",
  },
  {
    title: "Заявки",
    path: "/apply",
  },
];

export const professionalStatusMap = new Map([
  ["pro", "Специалист"],
  ["coffee_lover", "Гость"],
  ["producer", "Студент / соискатель"],
  ["business_owner", "Владелец бизнеса"],
  ["coffee_producer", "Представитель компании"],
  ["related_goods_producer", "Пресса / блогер"],
]);
