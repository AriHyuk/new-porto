export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header Skeleton */}
        <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded mb-4 animate-pulse" />
        <div className="h-6 w-96 bg-gray-200 dark:bg-zinc-800 rounded mb-12 animate-pulse" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 h-[400px] animate-pulse"
            >
              <div className="h-48 bg-gray-200 dark:bg-zinc-800" />
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded" />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
