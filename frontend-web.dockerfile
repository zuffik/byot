# React apps only

FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

ARG BUILD_PROJECT

COPY . .

RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*
RUN cd frontend && yarn --frozen-lockfile && cd "$BUILD_PROJECT" && yarn build && cd ../.. && rm -rf **/node_modules/**

FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE "/usr/src/app/frontend/$BUILD_PROJECT/build" ./build
RUN yarn global add serve

EXPOSE 5000

CMD serve -s build
