# Basic Reverse Proxy Template

NGINX can be used as a reverse proxy to sit in front of your services and route traffic. The advantage of this is it reduces the attack surface of your application and allows you to focus on the security of a single entry point.

In this example we define a server and then define a backend service where we want all traffic to be forwarded to

```sh
# nginx.conf
server {
	listen 80
	server_name api.example.com;

	location / {
		proxy_pass http://backend_server_address/;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwared-Proto $scheme;
	}
}
```

NOTE: it is very important to have the trailing `/` on the proxy address!
