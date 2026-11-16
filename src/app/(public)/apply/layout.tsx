"use client";

import SectionNav from "@/components/SectionNav";
import patternImg from "@/assets/bg-pattern-white.png";
import { usePathname } from "next/navigation";
import { useFestivals } from "api/festivals/queries";
import Loading from "@/components/loading";
import { FestivalProvider } from "@/components/providers/FestivalProvider";
import { TFestival } from "shared/types/festivals";
import { BRAND } from "shared/brand";

type TFestivalOption = {
  value: string;
  label: string;
};

const navLinks = [
  // {
  //   name: "Заявка на посещение",
  //   link: "/apply",
  // },
  {
    name: "Заявка на стенды",
    link: "/apply/stand",
  },
  // {
  //   name: "Заявка спикера",
  //   link: "/apply/speaker",
  // },
  // {
  //   name: "Стать спонсором",
  //   link: "/apply/sponsor",
  // },
];

const titleMap: { [key: string]: string } = {
  // "/apply": "Получить Билет На Мероприятие",
  "/apply/stand": "Стать Участником Выставки",
  // "/apply/speaker": "Стать Спикером",
  // "/apply/sponsor": "Стать Спонсором",
};

const ApplyLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const title = titleMap[pathname] || "Заявка";
  const { data: festival = [], isLoading, error } = useFestivals();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const now = new Date();

  const festivalOptions: TFestivalOption[] = festival
    .filter((festival: TFestival) => {
      return new Date(festival.end_date) >= now;
    })
    .map((festival: TFestival) => ({
      value: `${festival.id}`,
      label: festival.title,
    }));

  return (
    <div className="max-container w-full min-h-screen pt-10 relative">
      <SectionNav navLinks={navLinks} />
      <div className="text-center px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p className="font-medium text-gray-500 max-w-3xl mx-auto pt-6 text-pretty">
          Для подачи заявки на участие в выставке заполните анкету и нажмите
          кнопку «Отправить». После получения заявки наши менеджеры обязательно
          свяжутся с Вами, предоставят всю необходимую информацию и ответят на
          любые интересующие Вас вопросы.
        </p>
        <p className="font-medium text-gray-500 max-w-3xl mx-auto pt-4">
          В случае затруднений обращайтесь по телефону:{" "}
          <a href={BRAND.phoneHref} className="text-main-red font-semibold">
            {BRAND.phone}
          </a>
        </p>
      </div>

      <div
        className="relative w-full min-h-[800px] bg-main-red flex"
        style={{
          backgroundImage: `url("${patternImg.src}")`,
        }}
      >
        <div className="flex-grow h-full overflow-hidden relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 300"
            className="absolute z-0"
          >
            <path
              fill="#FFFFFF"
              fillOpacity="1"
              d="M0,192L34.3,208C68.6,224,137,256,206,250.7C274.3,245,343,203,411,181.3C480,160,549,160,617,165.3C685.7,171,754,181,823,197.3C891.4,213,960,235,1029,224C1097.1,213,1166,171,1234,176C1302.9,181,1371,235,1406,261.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>

          <div className="flex items-center justify-center h-full px-4 md:px-6 my-10 mb-24">
            <div className="bg-white shadow-custom rounded-lg p-6 w-[800px] mx-auto z-10">
              <FestivalProvider festivalOptions={festivalOptions}>
                {children}
              </FestivalProvider>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-[-30%] z-10 w-full h-[500px]">
        <Image
          src={cloudImg}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </div> */}
    </div>
  );
};

export default ApplyLayout;
