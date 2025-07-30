# Static Site Server

With this example we use the NGINX docker image and docker compose to host a static website. This idea can be used to host an SPA by simply putting the built distribution of your application in the expected directory for static hosting.

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
