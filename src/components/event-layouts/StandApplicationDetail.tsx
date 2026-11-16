"use client";

import { TStandApplication } from "shared/types/types";
import { formatDate } from "../lib/utils";

const standStatusMapping: Record<string, string> = {
  occupied: "занят",
  booked: "забронирован",
  available: "свободен",
};

const StandApplicationDetails = ({
  application,
}: {
  application: TStandApplication;
}) => {
  return (
    <div className="text-left overflow-y-scroll no-scrollbar">
      <h2 className="text-xl font-bold mb-4">
        {application.first_name} {application.middle_name}{" "}
        {application.last_name}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Телефон</p>
          <p className="font-medium">{application.phone_number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Электронная почта</p>
          <p className="font-medium">{application.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Местоположение</p>
          <p className="font-medium">
            {application.city}, {application.country}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Род занятий</p>
          <p className="font-medium">{application.occupation}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Название проекта</p>
          <p className="font-medium">{application.project_name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Стенд</p>
          <p className="font-medium">{application.stand}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Нуждается в электричестве</p>
          <p className="font-medium">
            {application.needs_electricity ? "Да" : "Нет"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">Дата подачи</p>
        <p className="text-lg">
          {formatDate(application.created_at, "ru-RU", true)}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Статус заявки</p>
        <p className="text-lg font-bold">
          {application.is_confirmed ? (
            <span className="text-green-600">Подтвержден</span>
          ) : (
            <span className="text-yellow-600">На рассмотрении</span>
          )}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Статус стенда</p>
        <p className="text-lg font-bold">
          {standStatusMapping[application.stand_status] ||
            application.stand_status}
        </p>
      </div>
    </div>
  );
};

export default StandApplicationDetails;
