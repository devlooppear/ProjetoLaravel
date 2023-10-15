# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install npm
RUN apt-get update && apt-get install -y npm

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Install react-scripts globally
RUN npm install -g react-scripts

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port on which your Node.js application runs (e.g., 3000)
EXPOSE 3000

# Define the command to start your Node.js application
CMD ["npm", "start"]
