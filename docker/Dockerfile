# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using a lightweight web server (e.g., nginx)
FROM nginx:alpine

# Copy the custom NGINX configuration file
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy the build output to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]