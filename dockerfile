FROM node:14
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Expose the port on which your app is listening
EXPOSE 3000

# Set the name and tag for the image
LABEL image.name="lifx-light-teams-presence"
LABEL image.tag="1"

# Start the app
CMD ["node", "index.js"]