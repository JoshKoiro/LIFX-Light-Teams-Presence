#!/bin/bash
node updateEnv.js
sudo docker-compose down\
&& docker image rm lifx-light-teams-presence:latest\
&& docker build -t lifx-light-teams-presence .\
&& docker compose up -d