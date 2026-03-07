"use client";

import ErrorFallback from "@/components/error-fallback";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  return <ErrorFallback message={error.message} onRetry={reset} />;
}
