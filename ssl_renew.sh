#!/bin/bash

COMPOSE="sudo /usr/local/bin/docker-compose --no-ansi -f prod-docker-compose.yml"
DOCKER="sudo /usr/bin/docker"

cd /home/ubuntu/thursdayReport/
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP webserver
$DOCKER system prune -af