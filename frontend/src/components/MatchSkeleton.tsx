import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const MatchSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border-[#52291A]/70 bg-[#1C1008]">
      <CardHeader>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Skeleton className="h-[58px] w-[58px] rounded-2xl bg-[#2A180D]" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-[#2A180D]" />
              <Skeleton className="h-3 w-36 bg-[#2A180D]" />
            </div>

          </div>

          <Skeleton className="h-8 w-14 bg-[#2A180D]" />

        </div>

        <Skeleton className="mt-5 h-2 w-full bg-[#2A180D]" />

      </CardHeader>

      <CardContent className="space-y-5">

        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-20 rounded-xl bg-[#2A180D]" />
          <Skeleton className="h-20 rounded-xl bg-[#2A180D]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-28 bg-[#2A180D]" />

          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full bg-[#2A180D]" />
            <Skeleton className="h-6 w-20 rounded-full bg-[#2A180D]" />
            <Skeleton className="h-6 w-14 rounded-full bg-[#2A180D]" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32 bg-[#2A180D]" />

          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full bg-[#2A180D]" />
            <Skeleton className="h-6 w-16 rounded-full bg-[#2A180D]" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-xl bg-[#2A180D]" />

      </CardContent>
    </Card>
  );
};

export default MatchSkeleton