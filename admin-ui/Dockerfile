FROM oven/bun:canary-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .
ARG API_URL
ENV VITE_API_URL=$API_URL
RUN bun run build
FROM nginx:alpine AS runner

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .

CMD ["nginx", "-g", "daemon off;"]
