"use client";

import ErrorFallback from "@/components/error-fallback";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DetailError({ error, reset }: Props) {
  return (
    <div className="min-h-screen bg-pink-50 px-4 py-8 flex items-center justify-center">
      <ErrorFallback message={error.message} onRetry={reset} />
    </div>
  );
}
