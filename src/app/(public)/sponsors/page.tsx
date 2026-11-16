import Image from "next/image";
import SectionTitle from "@/components/home/SectionTitle";
import trapezaImg from "@/assets/trapeza_logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SponsorsList from "@/components/sponsor/SponsorsList";
import { Metadata } from "next";
import { BRAND } from "shared/brand";

export const metadata: Metadata = {
  title: "Спонсоры",
  description:
    `Спонсоры и партнёры ${BRAND.name} (демо-данные).`,
};

const SponsorsPage = () => {
  return (
    <div className="max-container min-h-screen pt-6 pb-12 w-full px-4 sm:px-6 md:px-8 bg-slate-100">
      <div className="page-container">
        <SectionTitle className="text-main-blue text-center">
          Спонсоры
        </SectionTitle>
        {/* Main Sponsor Section */}
        <div className="rounded-3xl p-6 flex flex-col md:flex-row gap-4 bg-white mt-6">
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={trapezaImg.src}
              width={400}
              height={200}
              alt={`${BRAND.organizer} logo`}
            />
          </div>
          <div className="flex-1 self-center">
            <h4 className="text-lg font-semibold">Генеральный спонсор</h4>
            <p className="max-w-lg">
              Организатор мероприятия и оператор площадки — компания «{BRAND.organizer}» (вымышленная).
            </p>
          </div>
        </div>

        {/* Festival Sponsors */}
        <SponsorsList />

        {/* Link to Application for Sponsor */}
        <div className="w-full mt-6 flex justify-center">
          <Link href={"/apply/sponsor"}>
            <Button className="h-11 px-8 rounded-xl mx-auto bg-main-red hover:bg-main-red/85 font-semibold">
              Стать Спонсором
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;
