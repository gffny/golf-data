FROM node:lts-alpine
RUN apk add bash bash-doc bash-completion curl

ARG NPMJS_TOKEN

WORKDIR /app
COPY ./ ./

RUN echo "//registry.npmjs.org/:_authToken=$NPMJS_TOKEN" > .npmrc && \
    npm install && \
    rm -f .npmrc   

EXPOSE 3000
CMD ["node", "./bin/www"]
