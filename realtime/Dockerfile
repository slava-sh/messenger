FROM node:slim

ENV NODE_ENV production

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app

EXPOSE 80
CMD ["npm", "run", "start"]
