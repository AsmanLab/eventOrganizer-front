import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonFestivalSelect = () => {
  return (
    <div className="flex">
      <Skeleton className="h-[40px] w-[215px] rounded-lg" />
    </div>
  );
};

export const SkeletonDataTable = () => {
  const columns = 5;
  const rows = 4;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-8 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonSponsorsList = () => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Skeleton
          key={`skeleton-${item}`}
          className="self-stretch w-full h-48 rounded-3xl"
        />
      ))}
    </div>
  );
};

export const SkeletonForm = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-11 w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
      <Skeleton className="h-11 w-full rounded-lg" />
      <Skeleton className="h-11 w-full rounded-lg" />
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
};

export const SkeletonImageGrid = ({ count = 6 }) => (
  <div className="columns-2 md:columns-3 gap-4 space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="mb-4 break-inside-avoid rounded-md overflow-hidden"
      >
        <Skeleton className="h-[200px]" />
      </div>
    ))}
  </div>
);

export const SkeletonVideoList = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="lg:col-span-2 lg:row-span-2">
      <Skeleton className="h-[400px] rounded-2xl" />
    </div>
    {[...Array(4)].map((_, index) => (
      <Skeleton key={index} className="h-[200px] rounded-2xl" />
    ))}
  </div>
);
