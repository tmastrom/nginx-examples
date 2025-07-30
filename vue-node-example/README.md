# Load Balancer for a Vue Frontend and Node Backend Application

In separate terminals, run `docker compose up --build` in both the `server` and `vue-project` directories. Then run the `nginx.conf` from your local machine to create a reverse proxy for both applications. You will be able to access them from `localhost` and `localhost/api/`.

TODO: consolidate into a single docker-compose
