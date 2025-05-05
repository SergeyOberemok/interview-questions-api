FROM node:22 AS ui

WORKDIR /usr/src/app

COPY ./interview-questions-ui/package*.json ./
COPY ./interview-questions-ui ./

RUN npm install
RUN npm install rimraf --save-dev

ENV PATH=/usr/src/app/node_modules/.bin:$PATH

RUN npm run build



FROM node:22

WORKDIR /usr/src/app

COPY --from=ui /usr/src/app/dist ./client

COPY ./interview-questions-api/package*.json ./
COPY ./interview-questions-api ./

RUN npm install

ENV NODE_ENV=prod

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

