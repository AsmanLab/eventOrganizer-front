import bgImgFestivalsList from "@/assets/bg-festivals-list.png";
import { SpeakerCarousel } from "@/components/header/SpeakerCarousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Спикеры",
  description:
    "Спикеры мероприятия: лекции, мастер-классы и дискуссии (демо-данные).",
};

const SpeakersPage = () => {
  return (
    <div
      className="max-container min-h-screen pt-8 pb-12 w-full px-4 sm:px-6 md:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImgFestivalsList.src})` }}
    >
      <div className="mt-10 lg:mt-16 xl:mt-24 w-full flex items-center justify-center px-10 relative">
        <SpeakerCarousel />
      </div>

      <div className="w-full mt-8 flex justify-center">
        <Link href={"/apply/speaker"}>
          <Button className="h-11 px-8 rounded-xl mx-auto bg-main-red hover:bg-main-red/85 font-semibold">
            Стать Спикером
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SpeakersPage;
