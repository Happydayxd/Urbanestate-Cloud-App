# 🏡 UrbanEstate – Cloud Platform Deployment Project

**UrbanEstate** is a mobile-style web application built with **Ionic + Angular**, allowing users to browse real-estate properties, add new listings, view property details, and manage user accounts.

For the **Cloud Platform Development Continuous Assessment**, the project has been adapted into a **containerised, cloud-deployable application** using **Docker** and **Docker Compose**. It integrates with **Firebase Authentication** and **Firestore** as managed cloud services to demonstrate a modern hybrid architecture.

---

## ☁️ 1. Cloud Architecture Overview

UrbanEstate follows a simple, cloud-native architecture that leverages a **Hybrid Cloud** approach:

### Architecture Summary

* **Frontend Container:** Ionic + Angular application built with Node.js and served via **Nginx** in production.
* **External Managed Cloud Services:**
    * **Firebase Authentication:** Handles secure login & registration.
    * **Firestore (NoSQL):** Manages property listings and user data.
* **Container Orchestration:** Docker Compose.
* **Deployment Target:** Google Cloud Platform (Compute Engine VM).

This architecture demonstrates the power of combining portable containers for the runtime with scalable managed services for state and identity.

---

## 🛠️ 2. Tech Stack

### Frontend
* **Framework:** Ionic + Angular
* **Language:** TypeScript
* **Styling:** Custom SCSS (UrbanEstate UI)
* **Authentication:** Firebase Authentication
* **Database:** Firebase Firestore (NoSQL)

### Cloud & DevOps
* **Containerisation:** Docker
* **Orchestration:** Docker Compose
* **Web Server:** Nginx (Alpine)
* **Cloud Provider:** Google Cloud Platform (GCP)

---

## 📁 3. Project Structure

```text
CA1/
├── docker-compose.yml        # Orchestrates the frontend container
├── frontend/                 # Ionic + Angular application
│   ├── Dockerfile            # Multi-stage build (Node → Nginx)
│   ├── nginx.conf            # Angular routing support
│   ├── package.json
│   ├── src/
│   └── ...
├── .dockerignore
└── README.md

    Design Note: The frontend container is fully self-contained. Since Firebase & Firestore are external managed services, no backend API or SQL database container is required for this specific assessment.

✅ 4. Prerequisites
Tool	Version	Check Command
Git	Latest	git --version
Node.js & npm	20.x (LTS)	node -v
Docker Desktop	Latest	docker version
Docker Compose	Latest	docker compose version

🔑 5. Configuration (Firebase & Google Maps)

Before running the application, you must manually configure the API keys. Open the following files and replace the placeholder values:

Files requiring configuration:

    frontend/src/app/app.component.ts (Google Maps API key)

    frontend/src/app/service/identity.ts (Firebase config)

    frontend/src/app/service/posts/posts.ts (Firestore config)

Replace with your keys:
TypeScript

apiKey: 'YOUR_FIREBASE_API_KEY'
projectId: 'YOUR_FIREBASE_PROJECT_ID'
googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'

💻 5.1 Local Development (Without Docker)

This mode is used for rapid frontend development.
Bash

# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start Ionic development server
ionic serve

The app will run at: http://localhost:8100
🚀 6. Containerised Deployment (Docker)
6.1 Frontend Dockerfile

The frontend uses a multi-stage Docker build for optimization:

    Build Stage (node:20-alpine): Installs dependencies and compiles the Ionic/Angular app (npm run build).

    Serve Stage (nginx:alpine): Serves the compiled app from /usr/share/nginx/html and handles Angular routing via nginx.conf.

6.2 Docker Compose Configuration

The docker-compose.yml defines the single service:
YAML

services:
  frontend:
    build: ./frontend
    container_name: urbanestate-frontend
    ports:
      - "80:80"
      - "443:443"

6.3 Build & Run

From the project root (CA1/):
Bash

# Build the image
docker compose build

# Run the container in detached mode
docker compose up -d

To stop the container:
Bash

docker compose down

The application is available at: https://localhost
🔥 7. Firebase & Firestore Integration

UrbanEstate uses Firebase as a managed backend, eliminating the need for a traditional REST API.

    Firebase Authentication: Used for Email/Password login, registration, and logout (Login, Register, and Profile tabs).

    Firestore (NoSQL): Stores property listings and user profile data using a schema-less document model. Data is added dynamically via the "Add Property" form.

    Note: Firebase setup is done manually via the Firebase Console. API keys are configured directly in the frontend, which is standard practice for client-side Firebase apps.

☁️ 8. Google Cloud Deployment

For the Cloud Platform Development CA, UrbanEstate is deployed on Google Cloud Compute Engine.

Deployment Summary:

    Create a Google Cloud VM (Compute Engine).

    Install Docker & Docker Compose on the VM.

    Configure Firewall rules to allow traffic on ports 80 & 443.

    Clone this repository.

    Run docker compose up -d.

Access the live app: https://<VM_PUBLIC_IP>
🔐 9. Security Notes

    Authentication: Managed securely by Firebase.

    Data Access: Controlled via Firestore Security Rules.

    Exposure: No SQL databases or sensitive backend credentials are exposed.

    Network: Containers only expose strictly necessary ports.

✨ 10. Summary

This project demonstrates:

    ✅ Docker containerisation

    ✅ Cloud deployment on Google Cloud

    ✅ Use of managed cloud services (Firebase & Firestore)

    ✅ NoSQL database usage

    ✅ Simple, reproducible deployment

    ✅ Clean separation of concerns