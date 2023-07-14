#!/bin/bash
sudo docker-compose down\
&& git pull origin main\
&& docker image rm lifx-light-teams-presence:latest\
&& docker build -t lifx-light-teams-presence .\
&& docker compose up
