import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-gray-200
                 bg-white px-4 py-2 text-sm text-gray-700
                 transition-colors hover:bg-gray-50"
    >
      ← Back to List
    </Link>
  );
}
