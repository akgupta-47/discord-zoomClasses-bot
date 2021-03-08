FROM node:15.11.0-alpine3.10

EXPOSE 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package.json package.json

RUN npm install && npm cache clean --force

COPY . .
CMD npm run start
