export default function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm animate-pulse">
      <div className="bg-gray-200 p-6">
        <div className="mx-auto h-28 w-28 rounded-lg bg-gray-300" />
      </div>
      <div className="space-y-2 px-4 py-3">
        <div className="mx-auto h-3 w-3/4 rounded bg-gray-200" />
        <div className="mx-auto h-2.5 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
}
