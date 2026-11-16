"use client";

import SectionTitle from "@/components/home/SectionTitle";
import Loading from "@/components/loading";
import { useFestivalById } from "api/festivals/queries";
import { use } from "react";
import FestivalNav from "./FestivalNav";
import { FestivalInfoProvider } from "@/components/providers/FestivalInfoProvider";

type Params = Promise<{ id: string }>;

const FestivalLayout = ({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) => {
  const { id } = use(params);
  const { data, isLoading, error } = useFestivalById(id);

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  if (error || !data) {
    return <div>{error?.message}</div>;
  }

  const { festival } = data;

  return (
    <div className="max-container w-full min-h-screen px-4 sm:px-6 md:px-8 py-2 mb-10">
      <SectionTitle className="text-main-blue text-center mt-8 mb-6">
        {festival.title}
      </SectionTitle>
      <FestivalNav />
      <FestivalInfoProvider festival={festival}>
        {children}
      </FestivalInfoProvider>
    </div>
  );
};

export default FestivalLayout;
