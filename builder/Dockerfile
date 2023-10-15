# Use the Alpine Linux base image
FROM alpine:latest

LABEL authors="bunty"

# Install required packages
RUN apk update && apk add --no-cache curl python3 npm nodejs

# Set the working directory inside the container
WORKDIR /engine_api

# Copy the entire current directory (including subdirectories) to /engine_api in the container
COPY ./api/src /engine_api
COPY ./package.json ./package-lock.json /engine_api/
COPY ./my_engine_data/ /engine_api/my_engine_data

# Change to the correct directory and install Node.js dependencies
RUN npm install

# Set the command to run the Node.js application
CMD node /engine_api/app.js
