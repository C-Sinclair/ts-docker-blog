FROM node:10.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

ARG port=80

EXPOSE $port

COPY . ./

CMD yarn start