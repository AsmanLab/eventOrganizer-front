import Link from "next/link";
import { cn } from "../lib/utils";
import { ArrowUpRight } from "lucide-react";

const ClipCard = ({
  label,
  imgSrc,
  isBlueType = true,
  link = "#",
}: {
  label: string;
  imgSrc: string;
  isBlueType: boolean;
  link?: string;
}) => {
  return (
    <div className="relative w-max">
      <div
        className="relative w-[300px] h-[200px] sm:w-[450px] sm:h-[300px] card-clip-path bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div
          className={cn(
            "absolute bottom-0 text-center w-full bg-main-red text-xl capitalize text-white py-3 font-medium",
            isBlueType && "bg-main-blue"
          )}
        >
          {label}
        </div>
      </div>
      <div
        className={cn(
          "w-[50px] h-[50px] sm:w-[75px] sm:h-[75px] rounded-full bg-main-red absolute z-[1] right-[10px] top-[10px] sm:right-[15px] sm:top-[15px] text-white transition-all duration-300 ease-in hover:bg-main-blue hover:scale-110 cursor-pointer",
          isBlueType && "bg-main-blue hover:bg-main-red"
        )}
      >
        <Link
          href={link}
          className="w-full h-full flex justify-center items-center"
        >
          <ArrowUpRight className="w-6 sm:w-9 h-6 sm:h-9" />
        </Link>
      </div>
    </div>
  );
};

export default ClipCard;
