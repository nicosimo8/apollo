FROM node:20

WORKDIR /app

COPY package*.json ./

RUN sudo apt-get install python3-pip
RUN pip3 install rpi.gpio --break-system-packages
RUN sudo apt install python3-rpi.gpio

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
CMD npm run start

# CMD npm run dev
