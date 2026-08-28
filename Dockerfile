# syntax=docker/dockerfile:1

FROM node:18-bookworm-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
ARG VITE_DEMO_MODE=true
ARG VITE_API_URL=
ENV VITE_DEMO_MODE=$VITE_DEMO_MODE
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:18-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV DEMO_MODE=true
ENV CRM_PROVIDER=demo
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-server ./dist-server
RUN mkdir -p /app/data
EXPOSE 8080
CMD ["node", "dist-server/index.js"]
