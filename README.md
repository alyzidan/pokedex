# Pokédex

A Next.js 16 application that browses the PokéAPI with two list modes (pagination and infinite scroll) and a server-rendered detail route.

**Live Demo:** https://pokedex-4gp9cx3mm-alyzidans-projects.vercel.app/

---

## Architectural Highlights

**Next.js App Router with React Server Components**
The detail route (`/pokemon/[id]`) is a full RSC — the page shell is server-rendered and the data fetch runs on the client via React Query, avoiding the SSL handshake failures common with server-side fetches to third-party APIs in constrained environments.

**React Query for all server state**
- Paginated list: `useQuery` with key `["pokemon", "list", page]`
- Infinite list: `useInfiniteQuery` with key `["pokemon", "infinite"]`
- Detail: `useQuery` with key `["pokemon", "detail", id]`

Switching between views unmounts the inactive component; React Query's cache survives the unmount, so returning to a previously visited view is instant with no re-fetch.

**Zustand for UI state only**
A single store holds `viewMode: "pagination" | "infinite"`. No server data lives in Zustand. The separation between server state (React Query) and UI state (Zustand) is intentional and strict.

**Sprite URL construction**
The PokéAPI list endpoint returns only `name` and `url` — no sprites. Rather than firing 20 individual detail requests per page, the sprite URL is derived from the Pokémon ID extracted from the `url` field:
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
```

**Tailwind CSS**
All styling uses Tailwind utility classes. No external component library. Custom design tokens are not required — the full palette is covered by Tailwind defaults.

---

## Features

- **Paginated view** — 20 Pokémon per page, ellipsis pagination controls, page counter footer, background switches to blue-50
- **Infinite scroll view** — Load More button appends the next 20, spinner during fetch, running count footer, background switches to green-50
- **Detail page** — gradient header, official artwork sprite, base stats with proportional fill bars, type badges with per-type colour mapping, abilities (hidden ability labelled), height/weight in metric units, base experience
- **Error handling** — route-level error boundaries (`app/error.tsx`, `app/pokemon/[id]/error.tsx`) plus inline React Query error states with retry callbacks in both list views
- **Loading states** — `app/loading.tsx` renders a skeleton grid; `app/pokemon/[id]/loading.tsx` renders a detail skeleton matching the page layout

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Server state | TanStack React Query v5 |
| UI state | Zustand v5 |
| Styling | Tailwind CSS v3 |
| Testing | Vitest + Testing Library |
| Runtime | Node.js 20 |
| Package manager | pnpm |

---

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

**Other scripts**

```bash
pnpm build      # production build
pnpm test       # run unit tests (vitest)
pnpm test:watch # watch mode
```

---

## Project Structure

```
app/
├── layout.tsx                  # root layout, mounts QueryProvider
├── page.tsx                    # list page shell (RSC)
├── error.tsx                   # root error boundary
├── loading.tsx                 # root suspense skeleton
└── pokemon/[id]/
    ├── page.tsx                # detail page shell (RSC)
    ├── error.tsx               # detail error boundary
    └── loading.tsx             # detail suspense skeleton

components/
├── pokemon-grid.tsx            # client boundary, owns bg colour + view switch
├── paginated-view.tsx          # mounts usePokemonList
├── infinite-view.tsx           # mounts usePokemonInfinite
├── pokemon-card.tsx            # card + next/image sprite
├── pokemon-detail-view.tsx     # client wrapper around detail data fetch
├── pokemon-detail-card.tsx     # pure presentational detail layout
├── pagination-controls.tsx     # prev/next + ellipsis page numbers
├── view-toggle.tsx             # reads/writes Zustand viewMode
├── load-more-button.tsx        # infinite scroll trigger
├── stat-bar.tsx                # proportional stat fill bar
├── type-badge.tsx              # per-type colour pill
├── back-link.tsx               # ← Back to List
├── error-fallback.tsx          # shared error UI with retry
└── skeleton/
    ├── card-skeleton.tsx
    └── detail-skeleton.tsx

hooks/
├── use-pokemon-list.ts         # useQuery — paginated
├── use-pokemon-infinite.ts     # useInfiniteQuery — infinite
└── use-pokemon-detail.ts       # useQuery — detail

lib/
├── api.ts                      # fetch helpers + response mappers
├── types.ts                    # shared TypeScript interfaces
└── constants.ts                # PAGE_SIZE, API_BASE

store/
└── ui-store.ts                 # Zustand — viewMode only

providers/
└── query-provider.tsx          # QueryClientProvider client boundary

__tests__/
├── components/                 # pokemon-card, pagination-controls, view-toggle, error-fallback
├── hooks/                      # use-pokemon-list
└── lib/                        # api
```

---

## Tests

```bash
pnpm test
```

42 tests across 6 files covering: API URL construction, `totalPages` calculation, `extractIdFromUrl` parsing, `getPageNumbers` ellipsis logic, component rendering, store mutations, and error/retry behaviour.
