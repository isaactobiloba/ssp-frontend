FROM node:latest

# Create app directory
RUN mkdir -p /usr/src

WORKDIR /usr/src

# Installing dependencies
COPY package*.json .

RUN npm install

# Copying source files
COPY . .

EXPOSE 3000

# Running the app
CMD "npm" "start"