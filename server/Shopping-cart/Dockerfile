FROM node:14.16.0-alpine3.13

WORKDIR /app/AYURMART-Microservice/Server/Shopping-cart

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 7001

CMD ["npm","start"]