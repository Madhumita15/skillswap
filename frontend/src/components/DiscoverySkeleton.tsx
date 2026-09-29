import {
  Card
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DiscoverySkeleton = () => {
  return (
    <Card
      className="
        overflow-hidden
        border-[#52291A]/60
        bg-[#1C1008]
        py-0
      "
    >

      <Skeleton className="h-44 w-full rounded-none bg-[#2A170D]" />

      <div className="space-y-4 p-5">

        <div className="space-y-2">
          <Skeleton className="h-5 w-32 bg-[#2A170D]" />
          <Skeleton className="h-4 w-full bg-[#2A170D]" />
          <Skeleton className="h-4 w-3/4 bg-[#2A170D]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-20 bg-[#2A170D]" />

          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-md bg-[#2A170D]" />
            <Skeleton className="h-6 w-20 rounded-md bg-[#2A170D]" />
            <Skeleton className="h-6 w-14 rounded-md bg-[#2A170D]" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-24 bg-[#2A170D]" />

          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-md bg-[#2A170D]" />
            <Skeleton className="h-6 w-16 rounded-md bg-[#2A170D]" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-lg bg-[#2A170D]" />

      </div>

    </Card>
  );
};


export default DiscoverySkeleton