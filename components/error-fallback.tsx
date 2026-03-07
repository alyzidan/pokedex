"use client";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorFallback({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="text-4xl">😵</div>
      <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
      <p className="max-w-md text-sm text-gray-500">{message}</p>
      <button
        onClick={onRetry}
        className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white
                   transition-colors hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  );
}
