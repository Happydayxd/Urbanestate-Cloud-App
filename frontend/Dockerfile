# Stage 1: Build the Ionic/Angular app
FROM node:20-alpine AS build

# Work directory inside the container
WORKDIR /app

# Copy package.json / package-lock.json first for better cache
COPY package*.json ./

# Install dependencies
# Use --legacy-peer-deps to bypass @angular/google-maps (21) vs Angular 20 conflict
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend project
COPY . .

# Build the app using "build" script from package.json (ng build)
RUN npm run build

# Stage 2: Nginx to serve the built app
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Your angular.json says outputPath.base = "www"
# So build output ends up in /app/www in the build stage
COPY --from=build /app/www /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]