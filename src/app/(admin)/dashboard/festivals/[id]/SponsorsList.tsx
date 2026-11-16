import { getImageURL } from "@/components/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TSponsor } from "shared/types/sponsor";

type TierMap = { [key: string]: TSponsor[] };

const SponsorsList = ({ sponsors }: { sponsors: TSponsor[] }) => {
  const tierMap: TierMap = sponsors.reduce((acc, sponsor) => {
    const tier = sponsor.status || "Others";
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(sponsor);
    return acc;
  }, {} as TierMap);

  return (
    <div className="w-full space-y-6 mt-4">
      {Object.entries(tierMap).map(([tier, sponsors]) => (
        <div key={tier} className="">
          <h3 className="text-lg font-medium mb-2 text-gray-500">{tier}</h3>
          <div className="flex flex-wrap gap-6">
            {sponsors.map((sponsor, index) => (
              <Link
                href={`/dashboard/sponsors/${sponsor.id}`}
                key={index}
                className="flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-10 h-10 bg-gray-300 relative">
                  {sponsor.logo && (
                    <Image
                      src={getImageURL(sponsor.logo) || ""}
                      alt={sponsor.first_name + " " + sponsor.project_name}
                      className="w-full h-full object-contain"
                      width={40}
                      height={40}
                    />
                  )}
                </div>
                {/* <span className="text-admin-primary">{sponsor.}</span> */}
              </Link>
            ))}
          </div>
          <hr className="mt-2" />
        </div>
      ))}
    </div>
  );
};

export default SponsorsList;
