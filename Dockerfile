FROM node:8.10.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production --no-progress

COPY ./dist .

USER node

ENV NODE_ENV production

EXPOSE 3001