FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

COPY --chown=node:node . .

RUN npm install

RUN npx knex migrate:latest 

EXPOSE 2082

CMD [ "npm", "start"]