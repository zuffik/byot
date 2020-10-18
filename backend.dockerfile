FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY . .
RUN apk update && apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python && npm install --quiet node-gyp -g && npm install --quiet && apk del native-deps && rm -rf /var/cache/apk/*
RUN cd backend/main && yarn --frozen-lockfile && yarn build && rm -rf node_modules

FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/backend/main/.env* ./
COPY --from=BUILD_IMAGE /usr/src/app/backend/main/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/backend/main/package.json ./package.json
COPY --from=BUILD_IMAGE /usr/src/app/backend/main/yarn.lock ./yarn.lock
RUN yarn --frozen-lockfile --production=true

EXPOSE 5000

CMD node ./dist/main.js
