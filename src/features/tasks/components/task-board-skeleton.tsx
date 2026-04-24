import { Skeleton } from "@/components/ui/skeleton";
import { BOARD_COLUMNS,  } from "@/lib/utils/task";

export function TaskBoardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {BOARD_COLUMNS.map((status) => (
        <div key={status} className="flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-center gap-2 px-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-5 rounded-full" />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2 min-h-30 rounded-xl bg-secondary/40 p-2">
            {Array.from({ length: status === "BACKLOG" ? 2 : 1 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-3.5 space-y-2"
              >
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex justify-between pt-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}