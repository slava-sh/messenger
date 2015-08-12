FROM node:slim

RUN apt-get update \
    && apt-get install -y apt-utils --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update \
    && apt-get install -y python3 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3000
CMD ["node", "."]
