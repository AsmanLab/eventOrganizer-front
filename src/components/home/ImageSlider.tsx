"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";
import festival1 from "@/assets/festival_01.jpeg";
import festival2 from "@/assets/festival_02.jpeg";
import festival3 from "@/assets/festival_03.jpeg";
import festival4 from "@/assets/festival_04.jpeg";
import festival5 from "@/assets/festival_05.jpeg";
import festival6 from "@/assets/festival_06.jpeg";
import festival7 from "@/assets/festival_07.jpeg";
import festival8 from "@/assets/festival_08.jpeg";
import { useIsMobile } from "../hooks/use-mobile";

const images = [
  { src: festival2.src, alt: "Career fair" },
  { src: festival3.src, alt: "Панельная дискуссия" },
  { src: festival4.src, alt: "Гейм-зона" },
  { src: festival6.src, alt: "Фотозона" },
  { src: festival5.src, alt: "Стенды экспонентов" },

  { src: festival1.src, alt: "Гости мероприятия" },
  { src: festival7.src, alt: "Арт-аллея" },
  { src: festival8.src, alt: "Tech-зона" },
];

// Helper: chunk array into groups of n
function chunkArray<T>(array: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function ImageSlider() {
  const imagesPerSlide = useIsMobile() ? 1 : 8;
  const slides = chunkArray(images, imagesPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCurrentSlide(0);
  }, [imagesPerSlide]);

  const totalSlides = slides.length;

  // Go to next slide (with wrap-around)
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Go to previous slide (with wrap-around)
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Slider wrapper */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, slideIdx) => (
              <div key={slideIdx} className="min-w-full">
                {/* Desktop Layout */}
                <div className="hidden md:grid gap-4 md:grid-cols-5 md:grid-rows-2">
                  {slide.map((img, idx) => (
                    <div
                      key={idx}
                      // For example, let the second cell span two rows
                      className={cn(
                        "relative overflow-hidden",
                        idx === 1 || idx === 3 ? "row-span-2" : "aspect-square"
                      )}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Mobile Layout: Show only the first image of the slide */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {slide.slice(0, 1).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[16/11] overflow-hidden rounded-lg"
                    >
                      <Image
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        fill
                        sizes="100vw"
                        className="object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-main-red rounded-full p-2 shadow-lg hover:bg-main-red/80 transition-colors"
          aria-label="Previous slides"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-main-red rounded-full p-2 shadow-lg hover:bg-main-red/80 transition-colors"
          aria-label="Next slides"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* "View Gallery" button */}
      {/* <div className="flex justify-center mt-8">
        <Button className="bg-main-blue hover:bg-main-blue/90 text-white px-8 py-2 rounded-md">
          Просмотреть галерею
        </Button>
      </div> */}
    </div>
  );
}
