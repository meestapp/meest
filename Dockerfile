FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/meest
WORKDIR /usr/src/meest

# Install dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

# Exports
EXPOSE 3000
CMD [ "npm", "run", "dev" ]