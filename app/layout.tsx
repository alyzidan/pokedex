import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Discover and explore Pokémon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
