import { Button } from "@/components/ui/button";

type ActivityAction = "Product Added" | "Price Changed" | "Stock Updated" | string;

export type ActivityLogItem = {
  id: string;
  dateTime: string;
  user: string;
  action: ActivityAction;
  description: string;
};

type ActivityLogProps = {
  items: ActivityLogItem[];
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
};

const actionStyles: Record<string, string> = {
  "Product Added": "bg-emerald-100 text-emerald-800 border border-emerald-200",
  "Price Changed": "bg-amber-100 text-amber-800 border border-amber-200",
  "Stock Updated": "bg-sky-100 text-sky-800 border border-sky-200",
};

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function ActivityLog({ items, onLoadMore, isLoadingMore = false }: ActivityLogProps) {
  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 id="recent-activity-heading" className="text-lg font-semibold text-foreground sm:text-xl">
          Recent Activity
        </h2>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] border-collapse text-left" role="table">
          <caption className="sr-only">
            Recent admin activity showing date and time, user, action type, and description.
          </caption>
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Date/Time
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                User
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Action
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No activity available.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const badgeClass =
                  actionStyles[item.action] ?? "bg-muted text-foreground border border-border";

                return (
                  <tr key={item.id} className="transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-foreground">
                      <time dateTime={item.dateTime}>{formatDateTime(item.dateTime)}</time>
                    </td>
                    <td className="px-4 py-3 align-top text-sm font-medium text-foreground">{item.user}</td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium leading-5 ${badgeClass}`}
                      >
                        {item.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{item.description}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={onLoadMore}
          disabled={!onLoadMore || isLoadingMore}
          aria-label="Load more recent activity"
          className="min-w-36"
        >
          {isLoadingMore ? "Loading..." : "Load More"}
        </Button>
      </div>
    </section>
  );
}
