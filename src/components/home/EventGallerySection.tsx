import ImageSlider from "./ImageSlider";
import SectionTitle from "./SectionTitle";
import { BRAND } from "shared/brand";

const EventGallerySection = () => {
  return (
    <section className="page-container px-4 sm:px-8 md:px-10 my-24">
      <SectionTitle className="text-main-blue">
        {BRAND.name}<span className="text-main-red">{BRAND.year}</span>
      </SectionTitle>
      <ImageSlider />
    </section>
  );
};

export default EventGallerySection;
