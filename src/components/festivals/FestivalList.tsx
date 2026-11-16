import { TFestival } from "shared/types/festivals";
import FestivalCard from "./FestivalCard";

const FestivalList = ({ festivals }: { festivals: TFestival[] }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {festivals.map((festival) => (
        <FestivalCard key={festival.id} festival={festival} />
      ))}
    </div>
  );
};

export default FestivalList;
