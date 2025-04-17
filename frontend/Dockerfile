FROM node:18-alpine

WORKDIR /app

COPY package.json .

ARG VITE_API_ADDRESS
ENV VITE_API_ADDRESS=$VITE_API_ADDRESS

RUN yarn

RUN yarn global add serve

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]