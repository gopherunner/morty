FROM node:14

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "nodemon", "server.js" ]
