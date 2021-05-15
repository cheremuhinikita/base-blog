FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i -g @nestjs/cli

RUN npm run build

EXPOSE ${API_PORT}
CMD [ "npm", "run", "start:prod" ]