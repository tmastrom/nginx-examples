# Load Balancer Template

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
