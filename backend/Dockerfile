FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["npm", "run", "start:prod"]