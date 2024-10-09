FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN apk add openjdk8-jre
RUN apk add libreoffice

CMD [ "npm", "run", "start:dev" ]
