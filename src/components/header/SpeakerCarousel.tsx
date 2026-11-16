"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SpeakerCard from "../speakers/SpeakerCard";
import { useSpeakers } from "api/speaker/queries";
import Loading from "../loading";

export function SpeakerCarousel() {
  const { data: speakers, isLoading, error } = useSpeakers();

  if (isLoading) {
    return <Loading />;
  }

  if (error && !speakers) {
    return <div>{error.message}</div>;
  }

  const filtredSpeakers = speakers?.filter((speaker) => speaker.is_confirmed);

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {filtredSpeakers?.map((speaker, index) => (
          <CarouselItem
            key={index}
            className="pl-2 sm:pl-4 lg:pl-6 xl:pl-8 md:basis-1/2 lg:basis-1/3 flex justify-center items-stretch"
          >
            <SpeakerCard speaker={speaker} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-10 w-10 text-main-red hover:text-main-red border-main-red" />
      <CarouselNext className="h-10 w-10 text-main-red hover:text-main-red border-main-red" />
    </Carousel>
  );
}
