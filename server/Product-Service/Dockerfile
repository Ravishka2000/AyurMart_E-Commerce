FROM node:14.16.0-alpine3.13

WORKDIR /app/AYURMART-Microservice/Server/Product-Service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7005

CMD ["npm", "start"]