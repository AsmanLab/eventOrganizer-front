"use client";

import { useSponsors } from "api/sponsors/queries";
import SponsorCard from "./SponsorCard";
import { SkeletonSponsorsList } from "../skeletons/skeletons";

const SponsorsList = () => {
  const { data: sponsors, isLoading, error } = useSponsors();
  const filtredSponsors = sponsors?.filter((sponsor) => sponsor.is_confirmed);
  return (
    <>
      {isLoading ? (
        <SkeletonSponsorsList />
      ) : error && !sponsors ? (
        <div>{error?.message}</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtredSponsors?.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor || []} />
          ))}
        </div>
      )}
    </>
  );
};

export default SponsorsList;
