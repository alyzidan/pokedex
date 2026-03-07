import DetailSkeleton from "@/components/skeleton/detail-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-pink-50 px-4 py-8">
      <div className="mx-auto mb-6 max-w-4xl">
        <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
      </div>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <DetailSkeleton />
      </div>
    </div>
  );
}
