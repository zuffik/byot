# React apps only

FROM node:14

WORKDIR /usr/src/app

ARG BUILD_PROJECT

COPY frontend/common source/frontend/common
COPY frontend/web/common source/frontend/web/common
COPY frontend/web/tsconfig.json source/frontend/web/tsconfig.json
COPY "frontend/$BUILD_PROJECT" source/"frontend/$BUILD_PROJECT"
COPY common source/common
COPY frontend/package.json source/frontend/package.json
COPY frontend/yarn.lock source/frontend/yarn.lock

RUN yarn global add serve
RUN cd source/frontend && yarn --frozen-lockfile
RUN cd "source/frontend/$BUILD_PROJECT" && yarn build
RUN mkdir build
RUN mv "source/frontend/$BUILD_PROJECT/build" .
RUN rm -rf source

EXPOSE 5000

CMD serve -s build
