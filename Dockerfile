FROM alpine:3.11.3

ENV APP_DIR /opt

WORKDIR $APP_DIR

COPY public $APP_DIR/public
COPY src $APP_DIR/src
COPY views $APP_DIR/views
COPY package.json $APP_DIR
COPY package-lock.json $APP_DIR
COPY app-start $APP_DIR

RUN apk --update --no-cache add nodejs npm && mkdir $APP_DIR/.tmp/

ENTRYPOINT [ "/opt/app-start" ]