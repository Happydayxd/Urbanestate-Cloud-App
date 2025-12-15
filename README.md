# 🏡 UrbanEstate – Cloud Platform Deployment Project

**UrbanEstate** is a mobile-style web application built with **Ionic + Angular**, allowing users to browse real-estate properties, add new listings, view property details, and manage user accounts.

For the **Cloud Platform Development Continuous Assessment**, the project has been adapted into a **containerised, cloud-deployable application** using **Docker** and **Docker Compose**. It integrates with **Firebase Authentication** and **Firestore** as managed cloud services to demonstrate a hybrid cloud architecture.

---

## ☁️ 1. Cloud Architecture Overview

UrbanEstate follows a simple, cloud-native architecture focused on clarity rather than complexity.



[Image of Hybrid Cloud Architecture Diagram]


### Architecture Summary

* **Frontend Container:** Ionic + Angular application built with Node.js and served via **Nginx** in production.
* **External Managed Cloud Services:**
    * **Firebase Authentication:** Handles secure user login & registration.
    * **Firestore (NoSQL):** Manages property listings and user data.
* **Container Orchestration:** Docker Compose.
* **Deployment Target:** Google Cloud Platform (Compute Engine VM).

This approach demonstrates how containers can be combined with fully managed cloud services without requiring a traditional backend server.

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

    Design Note:

        Firebase & Firestore are external managed services and are not containerised.

        No backend API or SQL database is required for this assessment.

✅ 4. Prerequisites
Tool	Version	Check Command
Git	Latest	git --version
Node.js & npm	20.x (LTS)	node -v
Docker	Latest	docker version
Docker Compose	Latest	docker compose version
🔑 5. Configuration (Firebase & Google Maps)

This project uses client-side Firebase, which is standard practice. Before running the app, replace placeholder API keys manually.
Files requiring configuration

    frontend/src/app/app.component.ts (Google Maps API key)

    frontend/src/app/service/identity/identity.ts (Firebase Authentication config)

    frontend/src/app/service/posts/posts.ts (Firestore config)

Example
TypeScript

apiKey: 'YOUR_FIREBASE_API_KEY',
projectId: 'YOUR_FIREBASE_PROJECT_ID',
googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'

    🔹 Note: Firebase API keys are public by design and protected via Firebase Security Rules.

💻 6. Local Development (Without Docker)

Used for development and testing.
Bash

cd frontend
npm install
ionic serve

Application runs at: 👉 http://localhost:8100
🚀 7. Containerised Deployment (Docker)
7.1 Frontend Dockerfile

A multi-stage build is used:

    Build stage: Node.js installs dependencies and compiles the Ionic/Angular app.

    Serve stage: Nginx serves the static build and supports Angular routing via nginx.conf. Result: A small, production-ready image.

7.2 Docker Compose Configuration
YAML

services:
  frontend:
    build: ./frontend
    container_name: urbanestate-frontend
    ports:
      - "80:80"
      - "443:443"

7.3 Build & Run Locally

From the project root:
Bash

docker compose build
docker compose up -d

Stop the container:
Bash

docker compose down

Application access:

    http://localhost

    https://localhost

☁️ 8. Google Cloud Deployment (Compute Engine)

This section satisfies the Cloud Platform CA deployment requirement.
8.1 Create a Google Cloud VM

    Open Google Cloud Console.

    Enable Compute Engine API.

    Create a VM:

        OS: Ubuntu 22.04 LTS

        Machine type: e2-micro (sufficient)

        Firewall: Allow HTTP & HTTPS traffic

8.2 Install Docker on the VM
Bash

sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
logout

Reconnect to apply group permissions.
8.3 Clone the Repository on the VM
Bash

git clone [https://github.com/Happydayxd/Urbanestate-Cloud-App.git](https://github.com/Happydayxd/Urbanestate-Cloud-App.git)
cd Urbanestate-Cloud-App

8.4 Configure API Keys

Edit the frontend files and insert your Firebase & Google Maps keys:
Bash

nano frontend/src/app/app.component.ts
nano frontend/src/app/service/identity/identity.ts
nano frontend/src/app/service/posts/posts.ts

8.5 Deploy the Application
Bash

docker compose build
docker compose up -d

8.6 Access the Live Application

Open a browser:

    http://<VM_PUBLIC_IP>

    https://<VM_PUBLIC_IP>

🔐 9. Security Notes

    Authentication: Firebase Authentication handles identity securely.

    Database: Firestore Security Rules control database access.

    Exposure: No SQL databases or backend secrets are exposed.

    Network: Containers expose only ports 80 & 443.

    Secrets: No credentials are stored inside Docker images.

✨ 10. Summary

This project demonstrates:

    ✅ Docker containerisation

    ✅ Cloud deployment on Google Cloud

    ✅ Managed cloud services (Firebase & Firestore)

    ✅ NoSQL data storage

    ✅ Reproducible deployment with Docker Compose

    ✅ Clean separation between app runtime and data services

UrbanEstate provides a clear, practical demonstration of cloud deployment principles, aligned with the Cloud Platform Development module requirements.