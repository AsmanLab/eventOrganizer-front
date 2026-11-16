export type TStandDetails = {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: string;
  description: string;
  electricity?: boolean;
  water?: boolean;
  occupied_by: string | null;
};

export const StandDetails = ({ stand }: { stand: TStandDetails }) => {
  return (
    <>
      {/* <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Позиция:</span> ({stand.x}, {stand.y}) |
        Размер: {stand.width}×{stand.height}
      </p> */}
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Статус:</span>{" "}
        {stand.status === "booked" ? (
          <span className="text-yellow-500">Занят</span>
        ) : stand.status === "occupied" ? (
          <span className="text-red-600">Забронирован</span>
        ) : (
          <span className="text-green-600">Свободен</span>
        )}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Описание:</span> {stand?.description}
      </p>

      {/* {stand.occupied_by && (
        <p className="text-sm text-gray-600">
          <span className="font-medium">Занят кем:</span> {stand.occupied_by}
        </p>
      )} */}
    </>
  );
};
