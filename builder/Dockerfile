# Use the ubuntu:latest base image
FROM ubuntu:20.04

LABEL authors="bunty"

ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt update && \
    apt install -y curl python3 python3-pip nodejs npm r-base&& \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /engine_api

# Copy the entire current directory (including subdirectories) to /engine_api in the container
COPY ./api/src /engine_api
COPY ./package.json ./package-lock.json /engine_api/
COPY ./my_engine_data/ ./my_engine_data
COPY ./public ./public
COPY ./.env ./.env

# Install Node.js dependencies
RUN npm install && \
    chmod -R +x ./my_engine_data/packages

#RUN pip3 install numpy scipy pandas seaborn matplotlib scikit-learn

# Install the R package 'runit'
RUN R -e "install.packages('RUnit', dependencies=TRUE, repos='https://cran.rstudio.com/')"
# Set the command to run.sh the Node.js application
CMD node  /engine_api/app.js
