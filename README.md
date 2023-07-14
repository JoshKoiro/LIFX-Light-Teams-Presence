# LIFX-Light-Teams-Presence
An application that controls a LIFX light based on your Microsoft Teams presence status

This application may be run virtually as a docker container or locally by configuring a .env file in the application directory to for configuration.

## Local Installation

clone the repository and run `npm install` to install the dependencies

after installing the dependencies you must create a file called .env to define environment variables that the application expects.

The following format should be used:
```
GRAPH_API_KEY=
LIFX_API_KEY=
COLOR_CHANGE_SPEED=
LIGHT_BRIGHTNESS=
AVAILABLE_COLOR=
BUSY_COLOR=
DO_NOT_DISTURB_COLOR=
AWAY_COLOR=
BE_RIGHT_BACK_COLOR=
OFFLINE_COLOR=
REFRESH_RATE=
```
You may refer to the docker-compose.yaml file for more information about the format of each of these environment variables and what is expected.

After building the .env file you may execute the application using `npm start`

## Installing in Docker

clone the repository to a machine where docker is installed and run `npm install` to install the dependencies.

Next, create a docker image using the `dockerfile` in the project directory. This can be done using the following command:

```
docker build -t lifx-light-teams-presence
```

you can check the image has been successfully added by running

```
docker image ls
```

If you see the image `lifx-light-teams-presence` listed, then it is time to create the container.

run the following command in the project directory executing the code written in the docker-compose.yaml file.

```
docker compose up -d
```