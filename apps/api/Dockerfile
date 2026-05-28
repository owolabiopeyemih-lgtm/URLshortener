FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace root files
COPY pnpm-workspace.yaml package.json ./

# Copy api package.json
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --filter @snapurl/api

# Copy api source
COPY apps/api ./apps/api

# Generate Prisma client
RUN pnpm --filter @snapurl/api db:generate

WORKDIR /app/apps/api

EXPOSE 3001
CMD ["pnpm", "dev"]
