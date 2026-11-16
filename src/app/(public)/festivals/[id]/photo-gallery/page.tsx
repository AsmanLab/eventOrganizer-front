import FestivalSidebar from "@/components/sidebar/festivals-sidebar";
import ImageListPublic from "@/components/media/ImageListPublic";

const PhotoGalleryPage = () => {
  return (
    <div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto md:px-4 mt-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: List of entries */}
          <div className="hidden md:block md:w-1/4 space-y-4 bg-white shadow-custom rounded-3xl p-2 overflow-hidden overflow-y-scroll">
            <FestivalSidebar section="photo-gallery" />
          </div>

          {/* Right Column: Masonry Layout */}
          <div className="md:w-3/4">
            <ImageListPublic />

            {/* Load More Button */}
            {/* <div className="flex justify-center mt-6">
              <button className="px-6 py-2 bg-main-red text-white font-semibold rounded-lg hover:bg-main-red/90 transition-colors">
                Больше
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryPage;
