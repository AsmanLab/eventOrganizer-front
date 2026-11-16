import { TSponsor } from "shared/types/sponsor";
import { formatDate, getImageURL } from "../lib/utils";
import Image from "next/image";

const SponsorDetails = ({ sponsor }: { sponsor: TSponsor }) => {
  return (
    <div className="text-left overflow-y-scroll no-scrollbar">
      {/* Header with Logo and Sponsor Name */}
      <div className="flex items-center mb-4">
        <Image
          src={getImageURL(sponsor.logo) || ""}
          alt={`Логотип проекта ${sponsor.project_name}`}
          width={64}
          height={64}
          className="object-contain mr-4"
        />
        <h2 className="text-xl font-bold">
          {sponsor.first_name} {sponsor.middle_name} {sponsor.last_name}
        </h2>
      </div>

      {/* Basic Contact and Project Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Телефон</p>
          <p className="font-medium">{sponsor.phone_number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Электронная почта</p>
          <p className="font-medium">{sponsor.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Страна / Город</p>
          <p className="font-medium">
            {sponsor.country}, {sponsor.city}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Род занятий</p>
          <p className="font-medium">{sponsor.occupation}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Название проекта</p>
          <p className="font-medium">{sponsor.project_name}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Предложение помощи</p>
        <p className="font-medium">{sponsor.help_offer}</p>
      </div>

      {/* Optional Description */}
      {sponsor.description && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Описание</p>
          <p className="font-medium">{sponsor.description}</p>
        </div>
      )}

      {/* Social Network Links */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Ссылки на соцсети</p>
        <a
          href={sponsor.social_network_links}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {sponsor.social_network_links}
        </a>
      </div>

      {/* Registration Date */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Дата регистрации</p>
        <p className="">{formatDate(sponsor.created_at, "ru-RU", true)}</p>
      </div>

      {/* Status */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Статус</p>
        <p className="font-bold">
          {sponsor.is_confirmed ? (
            <span className="text-green-600">Подтвержден</span>
          ) : (
            <span className="text-red-600">Не подтвержден</span>
          )}
        </p>
      </div>

      {/* Festival */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Мероприятие</p>
        <p className="text-lg font-medium">{sponsor.festival}</p>
      </div>
    </div>
  );
};

export default SponsorDetails;
