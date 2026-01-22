FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server.js ws-server.mjs ./

ENV NODE_ENV=production
EXPOSE 1234

CMD ["node", "server.js"]
