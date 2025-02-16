FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 2999

CMD ["npm", "start", "--", "--host"]