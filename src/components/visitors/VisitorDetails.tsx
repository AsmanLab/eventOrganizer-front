"use client";

import Image from "next/image";
import { getImageURL } from "../lib/utils";
import { TParticipantDetails } from "shared/types/participant";
import { professionalStatusMap } from "shared/config";

const applicationStatusMap: Record<string, string> = {
  registered: "Зарегистрирован",
  pending: "На проверке",
  // add others if needed...
};

const VisitorDetails = ({ visitor }: { visitor: TParticipantDetails }) => {
  return (
    <div className="text-left overflow-y-scroll no-scrollbar">
      {/* Header with QR Code and Visitor Name */}
      <div className="flex items-center mb-4">
        {visitor.qr_code_url ? (
          <Image
            src={getImageURL(visitor.qr_code_url) || ""}
            alt={`QR-код посетителя ${visitor.first_name}`}
            width={200}
            height={200}
            className="object-contain mr-4"
          />
        ) : (
          <div className="w-[200px] h-[200px] flex items-center justify-center bg-slate-100 mr-4 rounded">
            Нет QR
          </div>
        )}
        <h2 className="text-xl font-bold text-center">
          {visitor.first_name}{" "}
          {visitor.middle_name ? visitor.middle_name + " " : ""}
          {visitor.last_name}
        </h2>
      </div>

      {/* Basic Contact and Other Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Телефон</p>
          <p className="font-medium">{visitor.phone_number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Электронная почта</p>
          <p className="font-medium">{visitor.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Местоположение</p>
          <p className="font-medium">
            {visitor.country}, {visitor.city}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Статус заявки</p>
          <p className="font-medium">
            {visitor.status
              ? applicationStatusMap[visitor.status] || visitor.status
              : "Статус неизвестен"}
            {/* {visitor.status} */}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Профессиональный статус</p>
          <p className="font-medium">
            {professionalStatusMap.get(visitor.professional_status) || "-"}
          </p>
        </div>
      </div>

      {/* Visit Purposes */}
      {visitor.visit_purposes && visitor.visit_purposes.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Цели посещения</p>
          <ul className="list-disc ml-4">
            {visitor.visit_purposes.map((purpose, idx) => (
              <li key={idx} className="text-base text-gray-700">
                {purpose.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Festival */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Мероприятие</p>
        <p className="text-lg font-medium">{visitor.festival}</p>
      </div>
    </div>
  );
};

export default VisitorDetails;
