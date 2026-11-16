import { TSpeaker } from "shared/types/speaker";
import { truncateText } from "../lib/utils";
import { Button } from "../ui/button";
import { UDialog } from "../u-dialog";
import SpeakerDetails from "./SpeakerDetails";

function formatPrice(price: string) {
  return price.slice(0, -3);
}

const SpeakerCard = ({ speaker }: { speaker: TSpeaker }) => {
  return (
    <div className="p-6 bg-white rounded-3xl w-full flex flex-col justify-between transition duration-300">
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold text-main-blue">
          {speaker.first_name}{" "}
          {speaker.middle_name ? speaker.middle_name + " " : ""}
          {speaker.last_name}
        </h3>

        {/* Тема Выступления */}
        <div className="flex items-center gap-3">
          {/* <Mic2 size={24} className="text-blue-600 min-w-[24px]" /> */}
          <div>
            <p className="text-sm text-gray-600">Тема Выступления:</p>
            <p className="text-lg text-gray-800 font-medium">{speaker.topic}</p>
          </div>
        </div>

        {/* Время */}
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm text-gray-600">Время:</p>
            <p className="text-lg text-gray-800 font-medium">
              {speaker.preferred_time}
            </p>
          </div>
        </div>

        {/* Полная информация */}
        <div>
          <p className="text-sm text-gray-600">О спикере:</p>
          <p className="text-base text-gray-700 font-medium line-clamp-3">
            {truncateText(speaker.achievements || "", 150)}
          </p>
        </div>
      </div>

      {/* Ticket Price */}
      <div className="mt-4 flex justify-between">
        <UDialog
          title="Спикер"
          className="max-w-[600px]"
          triggerElement={
            <Button variant={"link"} className="pl-0 text-blue-700">
              Подробнее
            </Button>
          }
        >
          <SpeakerDetails speaker={speaker} />
        </UDialog>

        <div>
          <span className="text-3xl font-semibold text-main-blue">
            {formatPrice(speaker.ticket_price)}
          </span>
          <span className="text-lg font-medium text-gray-600"> сом</span>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
