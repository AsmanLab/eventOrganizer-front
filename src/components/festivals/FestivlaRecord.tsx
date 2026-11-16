import { TFestivalReport } from "shared/types/festivals";

const FestivalReport = ({ report }: { report: TFestivalReport }) => {
  const reports = [
    { label: "Посетители", count: report.visitor_count },
    { label: "Спикеры", count: report.speakers },
    { label: "Спонсоры", count: report.sponsors },
    { label: "Заявки на стенды", count: report.stand_applications },
  ];

  return (
    <div className="w-full grid gap-2 grid-cols-2 sm:grid-cols-4 lg:grid-cols-2">
      {reports.map((item) => (
        <div
          key={item.label}
          className="flex flex-col p-2 bg-white rounded-xl text-center border"
        >
          <p className="text-base font-medium text-main-blue text-nowrap text-ellipsis">
            {item.label}
          </p>
          <span className="text-main-blue">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

export default FestivalReport;
