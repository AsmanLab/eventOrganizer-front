import { Skeleton } from "@/components/ui/skeleton";

const SkeletonEventLayout = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-[400px] w-[500px] rounded-xl" />
    </div>
  );
};

export default SkeletonEventLayout;
