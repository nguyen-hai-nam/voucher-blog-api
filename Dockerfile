# Use an official Node.js runtime as the base image
FROM node:20.5-alpine3.17

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV TOKEN_SECRET=secret
ENV PORT=3000
ENV DATABASE_URL=mysql://root:voucher-blog-secret@db:3306/test
ENV ADMIN_EMAIL=admin@voucher.blog
ENV ADMIN_PASSWORD=admin

# Generate Prisma schema
RUN npx prisma generate

# Expose the port that the app will run on
EXPOSE 3000

# Command to run app
CMD ["npm", "start"]
