# Basic SSL Reverse Proxy and Load Balancer

## Node Servers and Containerization

This example shows how to create a simple node server, put it in a docker container, and run 3 instances of it using docker compose.

Run these servers using `docker compose up`

## NGINX Proxy Server

Next, use the `nginx.conf` file to run the nginx server which proxies and load balances traffic to the node servers.

You will need to add the `nginx.conf` to your local installation of nginx and restart the server.

## Self-Signed SSL Certificate

You should also generate your own self-signed SSL certificate for access to the server over HTTPS using `openssl`

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt`

x509 certificate type
nodes - do not encrypt the private key with a passphrase
days 365 - certificate is valid for a year
newkey rsa:2048 creates a 2048 bit RSA key pair

## Check out the server

The basic `hello world` html page is now being served on `https://localhost:443` and traffic from `http://localhost` will also be redirected there.
