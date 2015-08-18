FROM node:slim

RUN apt-get update \
    && apt-get install -y apt-utils --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update \
    && apt-get install -y python3 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "run", "start"]
