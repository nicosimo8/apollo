FROM node:23.5

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run build

CMD npm run start
