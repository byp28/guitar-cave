FROM node:26-alpine

WORKDIR /app

COPY package*.json .

COPY ts*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run" , "dev"]

