FROM alpine:latest as builder
RUN apk add --no-cache git
RUN mkdir /custom-authen
COPY . /custom-authen

FROM kong:3.3.0-alpine
USER root
RUN mkdir /usr/local/share/lua/5.1/kong/plugins/custom-authen
COPY --from=builder  /custom-authen /usr/local/share/lua/5.1/kong/plugins/custom-authen
USER kong
