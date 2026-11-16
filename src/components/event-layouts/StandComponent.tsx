import { MouseEvent } from "react";
import { TStand } from "shared/types/event-layout";

export interface StandComponentProps {
  stand: TStand;
  //   onDrag: (id: string, newX: number, newY: number) => void;
  onResize: (id: number, newWidth: number, newHeight: number) => void;
  onMouseDown: (
    e: MouseEvent<HTMLDivElement>,
    stand: TStand,
    isResize?: boolean
  ) => void;
  onClick: (spot: TStand) => void;
  isAdmin: boolean;
}

const StandComponent: React.FC<StandComponentProps> = ({
  stand,
  onMouseDown,
  onClick,
  isAdmin,
}) => {
  const standStyle = {
    left: stand.x,
    top: stand.y,
    width: stand.width,
    height: stand.height,
    backgroundColor:
      stand.status === "available"
        ? "#16C47F"
        : stand.status === "booked"
        ? "#FCD34D"
        : "#F93827",
  };

  return (
    <div
      className="absolute select-none cursor-pointer border border-main-blue"
      style={standStyle}
      onClick={() => onClick(stand)}
      onMouseDown={(e) => {
        if (isAdmin) {
          onMouseDown(e, stand);
        }
      }}
    >
      <span className="absolute top-0 left-0.5 text-sm text-black">
        {stand.name}
      </span>
      <span className="absolute bottom-0 left-0.5 text-xs text-gray-800">
        {stand.id < 0 ? `*` : stand.id}
      </span>
      {isAdmin && (
        <div
          className="absolute bottom-0 right-0 h-3 w-3 cursor-nwse-resize bg-gray-400"
          onMouseDown={(e) => onMouseDown(e, stand, true)}
        />
      )}
    </div>
  );
};

export default StandComponent;
