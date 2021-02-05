FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY backend/package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

WORKDIR /usr/src/app/backend

CMD [ "npm", "start"]
