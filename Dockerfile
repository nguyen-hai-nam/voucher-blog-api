# Use an official Node.js runtime as the base image
FROM node:20-alpine3.17

# Set the working directory in the container to /app
WORKDIR /app

# Copy all of the application code to the container
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Command to run app
CMD ["npm", "start"]
