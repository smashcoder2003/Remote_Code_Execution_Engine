FROM ubuntu:latest
LABEL authors="bunty"

# Install required packages
RUN apt-get update \
    && apt-get install -y curl python3 npm nodejs

# Set the working directory inside the container
WORKDIR /engine_api

# Copy the entire current directory (including subdirectories) to /engine_api in the container
COPY ./api/src /engine_api
COPY ./package.json ./package-lock.json /engine_api/
COPY ./my_engine_data/ ./my_engine_data
# Change to the correct directory and install Node.js dependencies
RUN npm install

# Set the command to run the Node.js application
CMD node /engine_api/app.js
