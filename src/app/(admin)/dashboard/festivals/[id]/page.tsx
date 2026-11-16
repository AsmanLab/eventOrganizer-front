"use client";

import { formatDate, getImageURL } from "@/components/lib/utils";
import { useFestivalById } from "api/festivals/queries";
import { Clock, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import SponsorsList from "./SponsorsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/loading";
import FestivalReport from "@/components/festivals/FestivlaRecord";
import DeleteFestivalButton from "@/components/festivals/delete-festival-button";
import CreateEventlayoutForm from "@/components/forms/event-layout/CreateEventLayoutForm";
import { UDialogControlled } from "@/components/u-dialog";

const markdownit = require("markdown-it");

const md = markdownit();

type Params = Promise<{ id: string }>;

const FestivalDetail = ({ params }: { params: Params }) => {
  const { id } = use(params);
  const { data, isLoading, error } = useFestivalById(id);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <div className="bg-white border rounded-lg p-4 md:-6">
        {error?.message}
      </div>
    );
  }

  const { festival } = data;

  const parsedContent = md.render(festival.description);

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center sm:text-left">
        {festival.title}
      </h1>
      <div className="mt-6 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10 flex-wrap">
        {/* Image Container */}
        <div className="relative w-full max-w-[600px] h-[360px] rounded-3xl overflow-hidden bg-admin-primary/10 flex-shrink-0">
          {festival.image && (
            <Image
              src={getImageURL(festival.image) || ""}
              alt={festival.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>

        {/* Details Container */}
        <div className="flex-1 flex flex-col gap-6 items-center md:items-start">
          <div className="flex gap-4">
            <Link href={`${id}/edit`} passHref>
              <Button
                size={"lg"}
                variant={"outline"}
                className="border-admin-primary text-admin-primary hover:text-admin-primary"
              >
                <Pencil size={24} />
                Изменить
              </Button>
            </Link>
            <DeleteFestivalButton id={id} />
          </div>
          <ul className="text-lg space-y-4 text-gray-500 font-medium">
            <li className="flex items-center gap-2 whitespace-nowrap">
              <Clock size={20} />
              {formatDate(festival.start_date)} -{" "}
              {formatDate(festival.end_date)}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={20} />
              {festival.location}
            </li>
            <li>
              {data.event_layout ? (
                <Link href={`/dashboard/event-layouts/${festival.id}`}>
                  <Button size="lg">Просмотреть план мероприятия</Button>
                </Link>
              ) : (
                <UDialogControlled
                  isOpen={open}
                  onOpenChange={setOpen}
                  title="Создать план мероприятия"
                  triggerElement={
                    <Button size="lg">Создать план мероприятия</Button>
                  }
                >
                  <CreateEventlayoutForm
                    festivalId={festival.id}
                    handleCloseModal={() => setOpen(false)}
                  />
                </UDialogControlled>
              )}
            </li>
            <li className="text-2xl font-semibold text-gray-700">
              <FestivalReport report={festival.report} />
            </li>
          </ul>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 md:mt-8 max-w-4xl text-balance">
        {parsedContent ? (
          <article
            className="prose max-w-4xl break-all"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className="no-result">Детали не предоставлены</p>
        )}
      </div>

      {/* Sponsors list */}
      <h2 className="mt-10 text-2xl font-medium">Спонсоры мероприятия</h2>
      <div>
        {data.sponsors && data.sponsors.length > 0 ? (
          <SponsorsList sponsors={data.sponsors} />
        ) : (
          <div>В настоящее время спонсоров нет</div>
        )}
      </div>

      {/* MediaFiles list */}
      <h2 className="mt-10 text-2xl font-medium mb-2">Медиа файлы</h2>
      <Link
        href={`${festival.id}/media-files`}
        className="text-main-blue border border-main-blue rounded-lg px-3 py-2 "
      >
        Просмотреть медиа файлы
      </Link>
    </div>
  );
};

export default FestivalDetail;
