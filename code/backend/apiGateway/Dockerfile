FROM alpine:latest as builder
RUN apk add --no-cache git
RUN mkdir /authPlugin
COPY ./authPlugin /authPlugin

FROM kong:3.3.0-alpine
USER root
RUN mkdir /usr/local/share/lua/5.1/kong/plugins/authPlugin
COPY --from=builder  /authPlugin /usr/local/share/lua/5.1/kong/plugins/authPlugin
USER kong