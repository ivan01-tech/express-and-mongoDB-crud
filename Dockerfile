FROM node:17-alpine3.15

WORKDIR /app

COPY .  .

RUN npm install

EXPOSE  3500

CMD  ["node","server.js"]
