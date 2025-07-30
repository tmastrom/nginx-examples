# Basic Web Server Template

NGINX is a web server technology wher the main config file is named "nginx.conf" and is usually placed in the `/etc/nginx/` folder.

The following is a [basic template](./server/nginx.conf) for a web server. The file defines a server listening on port 80 and serves the index.html file for any route.

```sh
# nginx.conf
server {
	listen 80;
	server_name example.com www.example.com;

	location / {
		root /var/www/example.com;
		index index.html index.htm;
	}
}
```
