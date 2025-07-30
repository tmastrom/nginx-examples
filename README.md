# NGINX Templates and Examples

This repo is a collection of templates and examples for how to use NGINX as a web server, load-balancer, and reverse proxy. Most of these ideas and concepts were learned from [this great tutorial](https://www.youtube.com/watch?v=q8OleYuqntY&ab_channel=TechWorldwithNana).

## Templates

The following templates show the structure of different NGINX configurations to illustrate the structure but are not actually working files.

- [Web Server Template](./server/)
- [Reverse Proxy Template](./reverse-proxy/)
- [Load Balancer Template](./load-balancer/)
- [HTTPS Redirect Template](./http-to-https/)
- [Caching](./caching/)

## Examples

The following examples can be run locally by editing the `nginx.conf` on your local machine and then reloading the server with `nginx -s reload`.

You can find the location of your nginx install with `nginx -V` and finding the `--conf-path`. For me it is `/opt/homebrew/etc/nginx/nginx.conf`.

- [Static Site Server Example](./static-site-server/)
- [Reverse Proxy for a Node Server with SSL Example](./node-example/)
- [Reverse Proxy with Multiple Services Example](./docker-compose-multi-container/)
- [Load Balancer for a Vue Frontend and Node Backend Application](./vue-node-example/)
- [Reverse Proxy for Go Server with SSL](./go-example/)
