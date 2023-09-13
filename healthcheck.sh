#!/bin/sh

# Try to get a response from the service
checkHealth=$(curl -s http://localhost:3000/health)

# check if $checkHealth returns an error
response=$(echo "$checkHealth" | grep -i "error")

# notification endpoint
notify="http://host.docker.internal:8081/LIFX-Status"

# if response is true then send notification
if [ -n "$response" ]; then
    # send notification using $notify
    # check if notification has already been sent
    if [ -f /tmp/error ]; then
        exit 1
    fi
    curl -H ta:warning -d "Container Unhealthy!" $notify
    # create sentinel file
    touch /tmp/error
    # check if /tmp/running exists
    if [ -f /tmp/running ]; then
    rm /tmp/running
    fi
    exit 1
fi

# if response is false then send notification
if [ -z "$response" ]; then
    # send notification using $notify
    # check if notification has already been sent
    if [ -f /tmp/running ]; then
        exit 0
    fi
    curl -H ta:white_check_mark -d "Container Healthy!" $notify
    # create sentinel file
    touch /tmp/running
    # check if /tmp/error exists
    if [ -f /tmp/error ]; then
        rm /tmp/error
    fi
    exit 0
fi