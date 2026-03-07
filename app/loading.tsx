import CardSkeleton from "@/components/skeleton/card-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mx-auto h-9 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto mt-2 h-4 w-64 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="mx-auto mb-8 h-9 w-64 animate-pulse rounded-full bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
