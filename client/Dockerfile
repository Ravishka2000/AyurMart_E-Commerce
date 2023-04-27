FROM node:14.16.0-alpine3.13

WORKDIR /app/AYURMART-Microservice/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]