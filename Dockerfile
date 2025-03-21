FROM node:20

WORKDIR /app

COPY package*.json ./

RUN apt-get update \
    && apt-get remove --purge -y python3.7
RUN apt-get install -y python3.6 \
    && ln -s /usr/bin/python3.6 /usr/bin/python3
RUN python3 -V
RUN apt install python3-rpi.gpio

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
CMD npm run start

# CMD npm run dev
