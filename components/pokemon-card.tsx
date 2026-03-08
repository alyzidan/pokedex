"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  spriteUrl: string;
}

export default function PokemonCard({ id, name, spriteUrl }: Props) {
  return (
    <Link
      href={`/pokemon/${id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow
                 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 p-6"
    >
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <Image
          src={spriteUrl}
          alt={name}
          width={120}
          height={120}
          className="h-32 w-32 sm:h-28 sm:w-28 object-contain transition-transform duration-200
                     group-hover:scale-110"
        />
      </div>
      <div className="px-4 py-3 text-center">
        <h3 className="text-sm font-semibold capitalize text-gray-900">{name}</h3>
        <p className="text-xs text-gray-400">#{String(id).padStart(3, "0")}</p>
      </div>
    </Link>
  );
}
