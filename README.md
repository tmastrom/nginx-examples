# NGINX Templates and Examples

This repo is a collection of templates and examples for how to use NGINX as a web server, load-balancer, and reverse proxy. Most of these ideas and concepts were learned from [this great tutorial](https://www.youtube.com/watch?v=q8OleYuqntY&ab_channel=TechWorldwithNana).

## Templates

The following templates show the structure of different NGINX configurations but are not actually working files.

- [Web Server Template](./server/)
- [Reverse Proxy Template](./reverse-proxy/)
- [Load Balancer Template](./load-balancer/)
- [HTTPS Redirect Template](./http-to-https/)
- [Caching](./caching/)

## Examples

The following examples can be run locally by editing the `nginx.conf` on your local machine and then reloading the server with `nginx -s reload`. Check out the Go example to see how to run the NGINX proxy and Go server with Docker and Docker Compose.

You can find the location of your nginx install with `nginx -V` and finding the `--conf-path`. For me it is `/opt/homebrew/etc/nginx/nginx.conf`.

### Self-Signed SSL Certificate

For examples using SSL you will also need to generate your own self-signed SSL certificate for access to the server over HTTPS using `openssl`

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt`

x509 certificate type
nodes - do not encrypt the private key with a passphrase
days 365 - certificate is valid for a year
newkey rsa:2048 creates a 2048 bit RSA key pair

### Check out the example code and documentation at the following links

- [Static Site Server Example](./static-site-server/)
- [Reverse Proxy for a Node Server with SSL Example](./node-example/)
- [Reverse Proxy with Multiple Services Example](./docker-compose-multi-container/)
- [Load Balancer for a Vue Frontend and Node Backend Application](./vue-node-example/)
- [Reverse Proxy for Go Server with SSL](./go-example/)
