@echo off

REM Lấy thư mục hiện tại
set "current_dir=%~dp0"

REM Chạy file docker-compose.yml của authenticationService
cd /d "%current_dir%authenticationService"
docker compose -f "docker-compose.yml" up -d --build

REM Chờ một khoảng thời gian để authenticationService khởi động
timeout /t 20

REM Chạy file docker-compose.yml của apiGateway
cd /d "%current_dir%apiGateway"
docker compose -f "docker-compose.yml" up -d --build
