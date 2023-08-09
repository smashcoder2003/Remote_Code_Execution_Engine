# Use the ubuntu:latest base image
FROM ubuntu:latest

LABEL authors="bunty"

# Install required packages
RUN apt-get update && \
    apt-get install -y curl python3 nodejs npm openjdk-11-jdk && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /engine_api

# Copy the entire current directory (including subdirectories) to /engine_api in the container
COPY ./api/src /engine_api
COPY ./package.json ./package-lock.json /engine_api/
COPY ./my_engine_data/ ./my_engine_data

# Install Node.js dependencies
RUN npm install && \
    chmod -R +x ./my_engine_data/packages

# Set the command to run.sh the Node.js application
CMD node /engine_api/app.js
