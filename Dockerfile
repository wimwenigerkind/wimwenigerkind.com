FROM ghcr.io/gohugoio/hugo:v0.170.1 AS build

COPY --chown=hugo:hugo . .

RUN hugo --minify

FROM caddy:2.11.9 AS caddy

FROM gcr.io/distroless/static-debian13:nonroot@sha256:aafe993665bf6200db38a02c11a9351e782a84b6a45e7f33b6695638c88e3931

COPY --from=caddy /usr/bin/caddy /caddy
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /project/public /srv

EXPOSE 8080

ENTRYPOINT ["/caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
