FROM node:14.16.0-alpine3.13

WORKDIR /app/AYURMART-Microservice/Server/Seller-Service

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 7004

CMD ["npm","start"]