FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci -no-audit --no-fund
# Копируем исходный код и собираем приложение
COPY . ./
RUN npm run build

FROM node:16-alpine AS backend
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund \
 && npm i -g pm2
# Копируем исходный код и собираем приложение
COPY --from=builder /app/src/data ./data/
COPY --from=builder /app/dist ./dist
COPY . ./ecosystem.config.js ./
ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js" ]