import { TSpeaker } from "shared/types/speaker";
import { formatDate } from "../lib/utils";

interface SpeakerDetailsProps {
  speaker: TSpeaker;
  isAdmin?: boolean;
}

const SpeakerDetails: React.FC<SpeakerDetailsProps> = ({
  speaker,
  isAdmin = false,
}) => {
  return (
    <div className="text-left overflow-y-scroll no-scrollbar">
      <h2 className="text-xl font-bold mb-4">
        {speaker.first_name} {speaker.middle_name} {speaker.last_name}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Телефон</p>
          <p className="font-medium">{speaker.phone_number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Электронная почта</p>
          <p className="font-medium">{speaker.email}</p>
        </div>
        {isAdmin && (
          <div>
            <p className="text-sm text-gray-500">Местоположение</p>
            <p className="font-medium">
              {speaker.city}, {speaker.country}
            </p>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-500">Род занятий</p>
          <p className="font-medium">{speaker.occupation}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Цена билета</p>
          <p className="font-medium">{speaker.ticket_price}</p>
        </div>
        {isAdmin && (
          <div>
            <p className="text-sm text-gray-500">ID мероприятия</p>
            <p className="font-medium">{speaker.festival}</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">Тема</p>
        <p className="text-xl">{speaker.topic}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Достижения</p>
        <p className="text-lg">{speaker.achievements}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Длительность выступления</p>
          <p className="text-lg">{speaker.speech_duration}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Время выступления</p>
          <p className="text-lg">{speaker.preferred_time}</p>
        </div>
      </div>

      {isAdmin && (
        <>
          {speaker.equipment_needed && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Необходимое оборудование</p>
              <p className="text-lg">{speaker.equipment_needed}</p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-sm text-gray-500">Дата регистрации</p>
            <p className="text-lg">
              {formatDate(speaker.created_at, "ru-RU", true)}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">Статус заявки</p>
            <p className="text-lg font-bold">
              {speaker.is_confirmed ? (
                <span className="text-green-600">Подтвержден</span>
              ) : (
                <span className="text-red-600">Не подтвержден</span>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SpeakerDetails;
