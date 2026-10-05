import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card
          key={index}
          className="border-[#251A10] bg-[#0B0804]"
        >
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <Skeleton className="h-11 w-11 rounded-xl bg-white/10" />
              <Skeleton className="h-9 w-12 bg-white/10" />
            </div>

            <div className="mt-5 space-y-2">
              <Skeleton className="h-4 w-32 bg-white/10" />
              <Skeleton className="h-3 w-44 bg-white/10" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSkeleton