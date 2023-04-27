FROM node:14.16.0-alpine3.13

WORKDIR /app/AYURMART-Microservice/Server/Coupon-Service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7003

CMD ["npm", "start"]