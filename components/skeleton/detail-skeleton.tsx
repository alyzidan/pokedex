export default function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-24 bg-gradient-to-r from-purple-300 to-pink-300" />
      <div className="grid gap-8 p-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-6">
          <div className="h-52 w-52 rounded-full bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-4">
            <div className="h-20 rounded-lg bg-gray-100" />
            <div className="h-20 rounded-lg bg-gray-100" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 rounded bg-gray-100" />
            ))}
          </div>
          <div className="h-5 w-20 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-gray-100" />
            <div className="h-6 w-24 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
