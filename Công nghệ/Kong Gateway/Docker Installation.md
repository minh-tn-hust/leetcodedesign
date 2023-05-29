# Kong
Chạy KongGateway
```shell
docker run -d --name kong-dbless \
 --network=kong-net \
 -v "$(pwd):/kong/declarative/" \
 -e "KONG_DATABASE=off" \
 -e "KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml" \
 -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
 -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
 -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
 -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
 -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
 -p 8000:8000 \
 -p 8443:8443 \
 -p 127.0.0.1:8001:8001 \
 -p 127.0.0.1:8444:8444 \
 kong:3.3.0
```

>Cổng 8000: Dành cho Route
>Cổng 8001: 


# Admin API Kong Gateway
## Port 8001 : Admin API
### localhost:8001/services
Kiểm trả các service hiện tại đang hoạt động bên trong `Kong`, các Serivce này được thực hiện config thông qua kong.yml

### localhost:8001/routes
Kiểm tra các route sử dụng để định hướng tới các service

## Port 8000 : Route






