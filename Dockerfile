FROM node:20-alpine

EXPOSE 3000

WORKDIR /app

RUN if [ -d "node_modules" ]; then rm -rf node_modules; fi

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:nodemon"]