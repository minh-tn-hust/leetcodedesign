#!/bin/bash

# Chạy file docker-compose.yml của authenticationService
docker compose -f "authentiactionService/docker-compose.yml" up -d --build

# Chờ một khoảng thời gian để authenticationService khởi động
sleep 1

# Chạy file docker-compose.yml của apiGateway
docker compose -f "apiGateway/docker-compose.yml" up -d --build
