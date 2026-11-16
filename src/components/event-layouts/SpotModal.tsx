"use client";

import { useRouter } from "next/navigation";

import { TSpotStatus, TStand } from "shared/types/event-layout";
import { StandDetails, TStandDetails } from "./StandDetails";
import { Button } from "../ui/button";

interface SpotModalProps {
  spot: TStand;
  isAdmin: boolean;
  onClose: () => void;
  onUpdateStatus: (status: TSpotStatus) => void;
  onDelete: () => void;
}

const SpotModal: React.FC<SpotModalProps> = ({
  spot,
  isAdmin,
  onClose,
  onUpdateStatus,
  onDelete,
}) => {
  const router = useRouter();
  const isOccupied = spot.status === "occupied";

  const removeDialogStandParam = (standId: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("dialogstand");
      url.searchParams.set("stand", standId);
      router.replace(url.pathname + url.search);
    }
  };

  const handleChoose = () => {
    removeDialogStandParam(String(spot.id));
    onClose();
  };
  return (
    <div className="fixed z-[51] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded bg-white p-4 relative">
        <h2 className="mb-2 text-xl font-bold">
          {spot.name} (ID:{spot.id})
        </h2>

        {isAdmin ? (
          <div className="mb-4 mt-2 space-y-2">
            <div>
              {spot.width} x {spot.height}
            </div>
            <Button
              size={"lg"}
              onClick={() => onUpdateStatus("available")}
              className="w-full rounded bg-green-500 hover:bg-green-500 py-2 text-white"
            >
              Пометить как доступный
            </Button>
            <Button
              size={"lg"}
              onClick={() => onUpdateStatus("booked")}
              className="w-full rounded bg-yellow-500 hover:bg-yellow-500 py-2 text-white"
            >
              Пометить как забронированный
            </Button>
            <Button
              size={"lg"}
              onClick={() => onUpdateStatus("occupied")}
              className="w-full rounded bg-red-500 hover:bg-red-500 py-2 text-white"
            >
              Пометить как занятый
            </Button>
            <Button
              size={"lg"}
              onClick={onDelete}
              className="w-full rounded bg-gray-500 hover:bg-gray-500 py-2 text-white"
            >
              Удалить место
            </Button>
          </div>
        ) : (
          <>
            <StandDetails stand={spot as TStandDetails} />
            <Button
              size={"lg"}
              onClick={handleChoose}
              disabled={isOccupied}
              className="mt-6 w-full rounded bg-main-blue hover:bg-main-blue/85 py-2 text-white"
            >
              Выбрать этот стенд
            </Button>
          </>
        )}
        <div className="pt-4">
          <Button
            size={"lg"}
            onClick={onClose}
            variant={"outline"}
            className="w-full rounded py-2"
          >
            Закрыть
          </Button>
          <Button
            onClick={onClose}
            className="w-8 h-8 absolute top-2 right-2 bg-white text-black shadow-none text-xl hover:bg-white"
          >
            x
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpotModal;
