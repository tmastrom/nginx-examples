# HTTPS Redirect Template

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
