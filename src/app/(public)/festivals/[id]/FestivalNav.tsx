"use client";

import SectionNav from "@/components/SectionNav";
import { useParams } from "next/navigation";

const navLinks = [
  {
    name: "Обзор",
    link: "",
  },
  {
    name: "Фотогалерея",
    link: "photo-gallery",
  },
  {
    name: "Видеогалерея",
    link: "video-gallery",
  },
];

const FestivalNav = () => {
  const { id } = useParams();

  const links = navLinks.map((item) => {
    const href = `/festivals/${id}/${item.link}`;
    return { ...item, link: href };
  });
  return <SectionNav navLinks={links} />;
};

export default FestivalNav;
