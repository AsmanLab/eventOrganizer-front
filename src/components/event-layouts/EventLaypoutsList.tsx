import { TEventLayoutDto } from "shared/types/event-layout";
import { Button } from "../ui/button";
import Link from "next/link";

const EventLayoutsList = ({ data }: { data: TEventLayoutDto[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-dashed border-main-blue hover:shadow-custom2 transition-shadow p-4 md:p-6 relative overflow-hidden cursor-pointer"
          >
            {/* {item.bg_image && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
                style={{ backgroundImage: `url(${getImageURL(item.bg_image)})` }}
              />
            )} */}
            <div className="relative z-10">
              <h4 className="text-lg font-medium text-admin-primary">
                {item.festival_title}
              </h4>
              {/* <p className="text-sm text-gray-600">Мероприятие: {item.festival}</p> */}
              <p className="text-sm text-gray-600">
                Размер: {item.width} x {item.height}
              </p>
              <p className="text-sm text-gray-600">
                Количество стендов: {item.stands?.length || 0}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Link href={`/dashboard/event-layouts/${item.festival}`}>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="bg-transparent border-admin-primary text-admin-primary hover:bg-admin-primary/5 hover:text-admin-primary"
                >
                  Детали
                </Button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          Нет схем мероприятий
        </div>
      )}
    </div>
  );
};

export default EventLayoutsList;
