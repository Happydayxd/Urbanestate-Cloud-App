🏡 UrbanEstate Cloud App

UrbanEstate is a mobile-style web application built with Ionic + Angular that allows users to browse real-estate properties, save favourites, book viewings, and add new property listings.

For the Cloud Platform Development CA, the project has been adapted into a containerised, cloud-deployable application using Docker and Docker Compose, and integrates with Firebase Authentication and Firestore as managed cloud services.

☁️ 1. Cloud Architecture Overview

UrbanEstate follows a simple cloud-native architecture, focusing on clarity rather than complexity.

Architecture summary:

Frontend Container: Ionic + Angular application built and served using Nginx

External Cloud Services:

Firebase Authentication – user login & registration

Firestore (NoSQL) – property listings and application data

Container Orchestration: Docker Compose

Deployment Target: Google Cloud VM (Compute Engine)

This demonstrates a hybrid cloud approach, where containers are used for the application runtime while Firebase provides fully managed backend services.

🛠️ 2. Tech Stack
Frontend

Framework: Ionic + Angular

Language: TypeScript

Styling: Custom SCSS (UrbanEstate UI)

Authentication: Firebase Authentication

Database: Firebase Firestore (NoSQL)

Cloud & DevOps

Containerisation: Docker

Orchestration: Docker Compose

Web Server: Nginx (production-style static hosting)

Cloud Provider: Google Cloud Platform

📁 3. Project Structure

The project root (CA1/) is organised as follows:

CA1/
├── docker-compose.yml        # Orchestrates the frontend container
├── frontend/                 # Ionic + Angular application
│   ├── Dockerfile            # Multi-stage build (Node -> Nginx)
│   ├── nginx.conf            # Nginx config for Angular routing
│   ├── package.json
│   ├── src/
│   └── ...
├── .dockerignore
└── README.md


Key notes:

The frontend container is fully self-contained.

Firebase & Firestore are external managed cloud services and are not containerised.

No backend API or SQL database is required for this version of the project.

✅ 4. Prerequisites

The following tools are required to run or deploy the project:

Tool	Recommended Version	Check Command
Git	Latest	git --version
Node.js & npm	LTS (20.x)	node -v / npm -v
Docker Desktop	Latest	docker version
Docker Compose	Latest	docker compose version

💻 5. Local Development (Without Docker)

This mode is intended for frontend development only.

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run Ionic development server
ionic serve
# OR
npm start


The app will be available at:

http://localhost:8100

🚀 6. Containerised Deployment (Docker + Docker Compose)
6.1 Frontend Dockerfile

The frontend uses a multi-stage Docker build:

Stage 1 – Build

Uses node:20-alpine

Installs dependencies

Builds the Ionic/Angular app (npm run build)

Stage 2 – Serve

Uses nginx:alpine

Serves the compiled app from /usr/share/nginx/html

Uses try_files for Angular/Ionic routing support

This results in a small, production-ready container image.

6.2 Docker Compose Configuration

docker-compose.yml defines a single service:

services:
  frontend:
    build: ./frontend
    container_name: urbanestate-frontend
    ports:
      - "8080:80"


The app is accessible at http://localhost:8080

Firebase services are accessed securely over HTTPS

6.3 Build & Run the Container

From the project root (CA1/):

# Build the Docker image
docker compose build

# Run the container
docker compose up -d


Access the application at:

http://localhost:8080


To stop the container:

docker compose down

🔥 7. Firebase & Firestore Integration

UrbanEstate uses Firebase as a managed backend, removing the need for a traditional server-side API.

Firebase Authentication

Email/password authentication

Used for login and registration

Firestore (NoSQL Database)

Stores property listings

Flexible, schema-less document model

Data is created dynamically via the “Add Property” form

Important:
Firebase is configured manually via the Firebase Console, which is acceptable for this assessment and clearly documented.

☁️ 8. Google Cloud Deployment

For the Cloud Platform CA, the application is deployed on Google Cloud Compute Engine using Docker.

Deployment Steps (Summary)

Create a Google Cloud VM

Install Docker & Docker Compose

Clone this GitHub repository

Run:

docker compose up -d


Open firewall port 8080

Access the app using the VM’s public IP

This satisfies the requirement to deploy a containerised application in the cloud.

🔐 9. Security Notes

Firebase handles authentication securely

Firestore security rules control read/write access

No secrets are hard-coded inside Docker images

Containers expose only required ports

✨ 10. Summary

This repository demonstrates:

✅ Containerisation with Docker

✅ Cloud deployment on Google Cloud

✅ Use of managed cloud services (Firebase & Firestore)

✅ Separation of application and data layers

✅ Simple, reproducible deployment using Docker Compose

UrbanEstate provides a clear and practical demonstration of cloud deployment concepts suitable for the Cloud Platform Development module.