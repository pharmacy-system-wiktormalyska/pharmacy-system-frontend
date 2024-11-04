# Etap budowania
FROM node:latest AS build
WORKDIR /react-docker
COPY package.json package-lock.json* /react-docker/
RUN npm install
RUN npm install serve -g
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "dev" ]