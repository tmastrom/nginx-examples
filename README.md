# NGINX

This repo is a collection of templates and examples for how to use NGINX as a web server, load-balancer, and reverse proxy. Most of these ideas and concepts were learned from [this great tutorial](https://www.youtube.com/watch?v=q8OleYuqntY&ab_channel=TechWorldwithNana)

# NGINX Templates

The following templates show the structure of different NGINX configurations to illustrate the structure but are not actually working files.

## Basic Web Server Template

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

## Basic Reverse Proxy Template

NGINX can be used as a [reverse proxy](reverse-proxy/nginx.conf) to sit in front of your services and route traffic. The advantage of this is it reduces the attack surface of your application and allows you to focus on the security of a single entry point.

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

## Load Balancing Template

Extending the idea of using NGINX as a reverse proxy, we can use it as a load balancer. We can run multiple replicas of our services and use NGINX to distribute traffic between them for better reliability. NGINX also allows you to specify different algorithms for balancing the load like choosing the server with the least connections.

```sh
# nginx.conf
http {
    # 3 instances of the same app running
    upstream myapp1 {
        # choose the load balancing algo - default: round_robin
        # least_conn;
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            # proxy all requests to the myapp1 server group
            proxy_pass http://myapp1/;
        }
    }
}
```

## HTTPS Redirect Template

When it comes to security we want to serve our application on HTTPS. We also want to redirect HTTP requests to HTTPS for a good user experience. This [HTTPS redirect template](http-to-https/nginx.conf) shows how to set this up.

Define one server to listen on port 80 (default HTTP port) and redirect traffic to HTTPS with a 301 code. The next server listens on port 443 (default HTTPS port), loads the SSL certificates and serves the application.

```sh
# nginx.conf
server {
    listen 80;
    server_name: example.com www.example.com;

    # Redirect HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name: example.com www.example.com;

    # Configure SSL
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem
    ssl_certificate_key /etc/letsencrypt/live/example.com/privatekey.pem

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; include_subdomains always;"

	location / {
		root /var/www/example.com;
		index index.html index.htm;
	}
}
```

# Examples

The following examples can be run locally by editing the `nginx.conf` on your local machine and then reloading the server with `nginx -s reload`.

You can find the location of your nginx install with `nginx -V` and finding the `--conf-path`. For me it is `/opt/homebrew/etc/nginx/nginx.conf`.

## Serving a Static Site Example

With [this example](./docker-compose-static/) we use the NGINX docker image and docker compose to host a static website. This idea can be used to host an SPA by simply putting the built distribution of your application in the expected directory for static hosting.

The NGINX base image looks something like the first server template above and is configured to serve files from `/usr/share/nginx/html` by default. We use docker compose to bind our folder containing an html file to the expected location in the container.

The base image also listens on port 80 by default. We can use docker compose to bind any port we like to send traffic port 80. I chose 8089 here.

```yml
# docker-compose.yaml
services:
  nginx:
    image: nginx:1-alpine
    ports:
      - 8089:80
    volumes:
      - ./static/:/usr/share/nginx/html
```

Test it out by running `docker compose up` from the `/docker-compose-static` directory and then going to `localhost:8089` in your browser. You should see a basic hello world page.

## Reverse Proxy for a Node Server with SSL Example

The code can be found in the [node-example](./node-example/) directory.

### Node Servers and Containerization

This example shows how to create a simple node server, put it in a docker container, and run 3 instances of it using docker compose.

Run these servers using `docker compose up`

### NGINX Proxy Server

Next, use the `nginx.conf` file to run the nginx server which proxies and load balances traffic to the node servers.

You will need to add the `nginx.conf` to your local installation of nginx and restart the server.

### Self-Signed SSL Certificate

You should also generate your own self-signed SSL certificate for access to the server over HTTPS using `openssl`

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt`

x509 certificate type
nodes - do not encrypt the private key with a passphrase
days 365 - certificate is valid for a year
newkey rsa:2048 creates a 2048 bit RSA key pair

### Check out the server

The basic `hello world` html page is now being served on `https://localhost:443` and traffic from `http://localhost` will also be redirected there.

## Reverse Proxy with Multiple Services Example

Create an NGINX reverse proxy for two different node services using docker compose
[code](./docker-compose-multi-container/)

## Load Balancer for a Vue Frontend and Node Backend Application

[code](./vue-node-example/)

TODO: consolidate into a single docker-compose

## Go Server Reverse Proxy with SSL

[code](./go-example/)
