FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install --filter @snapurl/web

COPY apps/web ./apps/web

WORKDIR /app/apps/web

EXPOSE 3000
CMD ["pnpm", "dev"]
