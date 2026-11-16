import Image from "next/image";
import img1 from "@/assets/festival_img_01.png";
import img2 from "@/assets/festival_img_02.png";
import img3 from "@/assets/festival_img_03.png";
import img4 from "@/assets/festival_img_04.png";
import img5 from "@/assets/festival_img_05.png";

const imageList = [img1, img2, img3, img4, img5];

const FestivalImagesList = () => {
  return (
    <div className="page-container mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {imageList.map((item, index) => (
        <div key={`festivals-images-${index}`}>
          <Image
            src={item.src}
            alt={`Фото мероприятия ${index + 1}`}
            width={400}
            height={250}
            className="rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default FestivalImagesList;
