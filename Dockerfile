# Node version
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# App binds to port 8080 so we use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run the app
CMD [ "node", "dist/app.js" ]
