FROM node:12.6.0
WORKDIR /app
COPY package.json ./
RUN npm install

COPY ./ ./

ARG REACT_APP_FACEBOOK_APP_ID
ARG REACT_APP_NOTE_KEEPER_API

RUN npm build

CMD [ "npm", "start" ]
