const EventSpotStatusBar = ({ isAdmin = false }: { isAdmin: boolean }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-2 items-center justify-between">
          <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p>Свободно</p>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <div className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
          <p>Забронировано</p>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <p>Занято</p>
        </div>
      </div>

      {isAdmin && <div className="flex flex-col gap-2 border p-2 rounded">
        <p className="font-bold text-sm">Формат именования стендов:</p>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-mono">StandName-StandID</div>
          <p className="text-xs text-slate-500">
            (Стенд создан — отображается имя и уникальный ID)
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-mono">StandName-*</div>
          <p className="text-xs text-slate-500">(Стенд ещё не сохранён)</p>
        </div>
      </div>}
    </div>
  );
};

export default EventSpotStatusBar;
