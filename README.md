# SnapURL — Shorten. Share. Track.

A full-stack URL shortener with real-time analytics, QR code generation, custom aliases, and a clean dashboard. Built as a monorepo with a Next.js frontend and an Express + PostgreSQL + Redis backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running with Docker](#running-with-docker)
  - [Running Locally](#running-locally)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Instant URL shortening** — no account required; paste and go
- **Custom aliases** — choose your own short slug (e.g. `snap.url/launch`)
- **QR code generation** — downloadable QR code for every link
- **Real-time click analytics** — total clicks, referrer, device type, country, and timestamp per link
- **User accounts** — register / log in to save and manage all your links from a dashboard
- **Link management dashboard** — view, copy, delete, and inspect analytics for every link you own
- **Light & dark mode** — system-aware theme with a one-click toggle
- **Rate limiting** — built-in request throttling on the API to prevent abuse
- **OpenGraph image** — rich social preview card for link shares
- **Privacy & Terms pages** — static legal pages included
- **Scroll-to-top button** — appears after scrolling, smooth-scrolls back to the top
- **Fully responsive** — mobile-first layout across all pages

---

## Tech Stack

### Frontend (`apps/web`)

| Tool | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) (App Router) | Framework, SSR, routing |
| [React 18](https://react.dev) | UI library |
| [Tailwind CSS 3](https://tailwindcss.com) | Styling |
| [Motion](https://motion.dev) | Animations |
| [Lucide React](https://lucide.dev) | Icons |
| [Recharts](https://recharts.org) | Analytics charts |
| [qrcode.react](https://github.com/zpao/qrcode.react) | QR code generation |
| [Geist](https://vercel.com/font) | Typography |
| [Axios](https://axios-http.com) | HTTP client |

### Backend (`apps/api`)

| Tool | Purpose |
|---|---|
| [Express 4](https://expressjs.com) | HTTP server |
| [PostgreSQL](https://www.postgresql.org) | Primary database |
| [Prisma 5](https://www.prisma.io) | ORM & migrations |
| [Redis](https://redis.io) | Caching & rate limiting |
| [ioredis](https://github.com/redis/ioredis) | Redis client |
| [JSON Web Tokens](https://jwt.io) | Authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [Zod](https://zod.dev) | Request validation |
| [geoip-lite](https://github.com/bluesmoon/node-geoip) | Country lookup from IP |
| [ua-parser-js](https://github.com/faisalman/ua-parser-js) | Device / browser parsing |
| [Helmet](https://helmetjs.github.io) | HTTP security headers |
| [Morgan](https://github.com/expressjs/morgan) | Request logging |

### Infrastructure

| Tool | Purpose |
|---|---|
| [Docker + Docker Compose](https://www.docker.com) | Containerised local environment |
| [Nginx](https://nginx.org) | Reverse proxy |
| [pnpm workspaces](https://pnpm.io/workspaces) | Monorepo package management |

---

## Project Structure

```
SnapURL/
├── apps/
│   ├── api/                        # Express backend
│   │   ├── prisma/
│   │   │   └── schema.prisma       # Database schema
│   │   ├── src/
│   │   │   ├── config/             # DB & Redis connections
│   │   │   ├── controllers/        # Route handlers (auth, url, analytics)
│   │   │   ├── middleware/         # Auth guard, rate limiter
│   │   │   ├── routes/             # Express routers
│   │   │   └── utils/              # Short code generator, validation, device parser
│   │   └── index.ts                # App entry point
│   │
│   └── web/                        # Next.js frontend
│       └── src/
│           ├── app/                # App Router pages & layouts
│           │   ├── (auth)/         # Login & register pages
│           │   ├── dashboard/      # Link management dashboard
│           │   ├── privacy/        # Privacy policy page
│           │   ├── terms/          # Terms of service page
│           │   ├── layout.tsx      # Root layout (Navbar, theme script)
│           │   ├── page.tsx        # Landing page
│           │   ├── icon.svg        # Favicon
│           │   └── opengraph-image.tsx  # Social OG image
│           ├── components/         # Reusable UI components
│           │   ├── Navbar.tsx
│           │   ├── Footer.tsx
│           │   ├── URLShortener.tsx
│           │   ├── LinkCard.tsx
│           │   ├── AnalyticsModal.tsx
│           │   ├── QRCodeModal.tsx
│           │   ├── AnimatedFeatureGrid.tsx
│           │   ├── HowItWorks.tsx
│           │   ├── WhyChooseUs.tsx
│           │   ├── URLShortenerInfo.tsx
│           │   ├── FAQSection.tsx
│           │   ├── HeroAnimation.tsx
│           │   ├── ScrollToTop.tsx
│           │   └── Providers.tsx
│           └── lib/
│               └── api.ts          # Axios API client
│
├── nginx/
│   └── nginx.conf                  # Reverse proxy config
├── docker-compose.yml              # Full-stack Docker setup
├── .env.example                    # Environment variable template
├── package.json                    # Root workspace config
└── pnpm-workspace.yaml
```

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org)
- [pnpm 9+](https://pnpm.io) — `npm install -g pnpm`
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop) (recommended for local infra)
- [PostgreSQL 15+](https://www.postgresql.org) (if not using Docker)
- [Redis 7+](https://redis.io) (if not using Docker)

---

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://snapurl:snapurl_secret@localhost:5432/snapurl` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | Secret key for signing JWT tokens | — |
| `PORT` | API server port | `3001` |
| `SHORT_URL_BASE` | Base URL prepended to short codes | `http://localhost:3001` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |
| `NODE_ENV` | `development` or `production` | `development` |

The web app also needs its own env file:

```bash
cp apps/web/.env.local.example apps/web/.env.local
```

---

### Running with Docker

The easiest way to run the full stack (PostgreSQL + Redis + API + Web + Nginx) is with Docker Compose:

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Web (Next.js) | http://localhost:3000 |
| API (Express) | http://localhost:3001 |
| Nginx proxy | http://localhost:80 |

---

### Running Locally

**1. Install dependencies**

```bash
pnpm install
```

**2. Start PostgreSQL and Redis**

```bash
docker compose up postgres redis -d
```

**3. Run database migrations**

```bash
cd apps/api
pnpm db:migrate
pnpm db:generate
```

**4. Start the API**

```bash
# from apps/api
pnpm dev
```

**5. Start the web app**

```bash
# from apps/web
pnpm dev
```

The web app will be available at **http://localhost:3000** and the API at **http://localhost:3001**.

---

## API Reference

All API routes are prefixed with `/api`.

### Auth

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Create a new account | No |
| `POST` | `/api/auth/login` | Log in and receive a JWT | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes |

### URLs

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/api/urls` | Create a short URL (optional alias) | No |
| `GET` | `/api/urls` | List all URLs for the authenticated user | Yes |
| `DELETE` | `/api/urls/:id` | Delete a short URL | Yes |
| `GET` | `/:shortCode` | Redirect to the original URL | No |

### Analytics

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `GET` | `/api/analytics/:urlId` | Get click analytics for a specific URL | Yes |

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Returns API status and timestamp |

---

## Database Schema

```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  urls         Url[]
}

model Url {
  id          String          @id @default(uuid())
  originalUrl String
  shortCode   String          @unique
  userId      String?         # null for anonymous links
  clicks      Int             @default(0)
  createdAt   DateTime        @default(now())
  analytics   ClickAnalytic[]
}

model ClickAnalytic {
  id        String   @id @default(uuid())
  urlId     String
  country   String?  # derived from IP via geoip-lite
  device    String?  # parsed from User-Agent
  referrer  String?
  timestamp DateTime @default(now())
}
```

---

## Scripts

Run these from the repo root with `pnpm --filter <package> <script>`, or `cd` into the app directory first.

### Web (`apps/web`)

| Script | Command | Description |
|---|---|---|
| Dev server | `pnpm dev` | Starts Next.js on port 3000 |
| Build | `pnpm build` | Production build |
| Start | `pnpm start` | Serves the production build |
| Lint | `pnpm lint` | ESLint check |

### API (`apps/api`)

| Script | Command | Description |
|---|---|---|
| Dev server | `pnpm dev` | Starts Express with nodemon |
| Build | `pnpm build` | Compiles TypeScript to `dist/` |
| Start | `pnpm start` | Runs the compiled build |
| DB migrate | `pnpm db:migrate` | Runs Prisma migrations |
| DB generate | `pnpm db:generate` | Regenerates Prisma client |
| DB push | `pnpm db:push` | Pushes schema changes without a migration |
| DB studio | `pnpm db:studio` | Opens Prisma Studio GUI |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a pull request

Please keep commits focused and PRs scoped to a single concern.

---

## License

MIT © SnapURL
