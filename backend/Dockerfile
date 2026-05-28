# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to cache layers
COPY package*.json ./

# Install only production dependencies for a smaller, secure container image
RUN npm install --production

# Copy the rest of the backend source files
COPY . .

# Expose port 5000 to match the server port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
