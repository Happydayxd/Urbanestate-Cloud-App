🏡 UrbanEstate – Cloud Platform Deployment Project

UrbanEstate is a mobile-style web application built with Ionic + Angular, allowing users to browse real-estate properties, add new listings, view property details, and manage user accounts.

For the Cloud Platform Development Continuous Assessment, the project has been adapted into a containerised, cloud-deployable application using Docker and Docker Compose, and integrates with Firebase Authentication and Firestore as managed cloud services.

This project focuses on clarity, correctness, and reproducibility, rather than unnecessary architectural complexity.

☁️ 1. Cloud Architecture Overview

UrbanEstate follows a simple cloud-native architecture:

Architecture Summary

Frontend Container

Ionic + Angular application

Built with Node.js

Served using Nginx in production

External Managed Cloud Services

Firebase Authentication – login & registration

Firestore (NoSQL) – property listings and user data

Container Orchestration

Docker Compose

Deployment Target

Google Cloud Platform (Compute Engine VM)

This demonstrates a hybrid cloud approach:

Containers for the application runtime + managed cloud services for authentication and data storage.

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

Web Server: Nginx

Cloud Provider: Google Cloud Platform (GCP)

📁 3. Project Structure
CA1/
├── docker-compose.yml        # Orchestrates frontend container
├── frontend/                 # Ionic + Angular application
│   ├── Dockerfile            # Multi-stage build (Node → Nginx)
│   ├── nginx.conf            # Angular routing support
│   ├── package.json
│   ├── src/
│   └── ...
├── .dockerignore
└── README.md

Notes

The frontend container is fully self-contained

Firebase & Firestore are external managed services

No backend API or SQL database is required for this CA

✅ 4. Prerequisites
Tool	Version	Check
Git	Latest	git --version
Node.js & npm	20.x (LTS)	node -v
Docker Desktop	Latest	docker version
Docker Compose	Latest	docker compose version

🔑 5. Configuration (Firebase & Google Maps)

Before running the application, the following API keys must be configured manually.

Files requiring configuration:

- `frontend/src/app/app.component.ts` (Google Maps API key)
- `frontend/src/app/service/identity.ts` (Firebase config)
- `frontend/src/app/service/posts/posts.ts` (Firestore config)

Replace the placeholder values:

```ts
apiKey: 'YOUR_FIREBASE_API_KEY'
projectId: 'YOUR_FIREBASE_PROJECT_ID'
googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
```
💻 5.1 Local Development (Without Docker)

Used for frontend development only.

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start Ionic development server
ionic serve

App runs at:

http://localhost:8100

🚀 6. Containerised Deployment (Docker)

6.1 Frontend Dockerfile

The frontend uses a multi-stage Docker build:

Stage 1 – Build

node:20-alpine

Installs dependencies

Builds Ionic/Angular app (npm run build)

Stage 2 – Serve

nginx:alpine

Serves compiled app from /usr/share/nginx/html

Supports Angular/Ionic routing (try_files)

This produces a small, production-ready container image.

6.2 Docker Compose Configuration

docker-compose.yml defines a single service:

services:
  frontend:
    build: ./frontend
    container_name: urbanestate-frontend
    ports:
      - "80:80"
      - "443:443"


The application is available at:

https://localhost

6.3 Build & Run

From the project root (CA1/):

# Build the image
docker compose build

# Run the container
docker compose up -d


To stop:

docker compose down

🔥 7. Firebase & Firestore Integration

UrbanEstate uses Firebase as a managed backend, eliminating the need for a traditional API.

Firebase Authentication

Email & password login

Registration and logout

Used by Login, Register, and Profile tabs

Firestore (NoSQL)

Stores property listings

Stores user profile data

Schema-less document model

Data added dynamically via Add Property form

Configuration Notes

Firebase setup is done manually via Firebase Console

API keys and project IDs are configured directly in the frontend

This approach is acceptable for this assessment

☁️ 8. Google Cloud Deployment

For the Cloud Platform Development CA, UrbanEstate is deployed on Google Cloud Compute Engine using Docker.

Deployment Steps (Summary)

Create a Google Cloud VM

Install Docker & Docker Compose

Open firewall port 80 & 443

Clone this repository

Run:

docker compose up -d


Access the app using the VM’s public IP:

https://<VM_PUBLIC_IP>

🔐 9. Security Notes

Firebase handles authentication securely

Firestore security rules control read/write access

No SQL databases or credentials are exposed

Containers expose only required ports

API keys are used according to Firebase best practices

✨ 10. Summary

This project demonstrates:

✅ Docker containerisation

✅ Cloud deployment on Google Cloud

✅ Use of managed cloud services (Firebase & Firestore)

✅ NoSQL database usage

✅ Simple, reproducible deployment

✅ Clean separation of concerns

UrbanEstate provides a clear, practical, and appropriate demonstration of cloud deployment principles for the Cloud Platform Development module.