FROM node:alpine

COPY package.json .

RUN npm ci

COPY . .

RUN npm run build

CMD [ "pm2", "start", "dist/index.js" ]