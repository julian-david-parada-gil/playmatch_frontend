FROM node:lts-alpine

WORKDIR /src/main/webapp

COPY . .
COPY package*.json ../../../

RUN npm install

ENV PLAYMATCH_USERFRONTEND=true

EXPOSE 9060

CMD ["npm", "start"]