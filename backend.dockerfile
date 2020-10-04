FROM node:14

WORKDIR /usr/src/app

COPY backend/main source/backend/main
COPY common source/common

RUN cd source/backend/main && yarn install
RUN cd source/backend/main && yarn build
RUN mv source/backend/main/dist .
RUN mv source/backend/main/package.json .
RUN mv source/backend/main/node_modules .
RUN rm -rf source

EXPOSE 5000

CMD yarn start:prod
