import MediaList from "@/components/media/MediaList";
import MediaUploadTabs from "./MediaTab";

export default async function Page(props: {
  searchParams?: Promise<{
    tab?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || "images";

  return (
    <div>
      <MediaUploadTabs />
      <div className="mt-6">
        <MediaList tab={tab} />
      </div>
    </div>
  );
}
