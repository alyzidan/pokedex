interface Props {
  label: string;
  value: number;
}

export default function StatBar({ label, value }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gray-900 transition-all duration-500"
          style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
