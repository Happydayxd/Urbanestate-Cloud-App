# 🏡 UrbanEstate Cloud App

UrbanEstate is a **mobile-style web application** built with **Ionic + Angular** that lets users browse property listings, save favourites, and manage viewings.

This project has been extended for the Cloud Platforms CA into a **containerised, cloud-ready stack** using **Docker** and **Docker Compose**, providing a modern, scalable deployment solution.

---

## ☁️ Cloud Architecture Overview

The application is deployed as a multi-container stack orchestrated by Docker Compose, with key services leveraging external managed cloud resources.



* **Frontend Container:** Ionic/Angular app, built and served efficiently by **Nginx**.
* **API Container:** **Node/Express** backend that interfaces with the database.
* **Database Container:** **PostgreSQL** for persistent data storage.
* **External Services:** **Firebase Authentication** and **Firestore** are used for user accounts and flexible data storage, demonstrating a hybrid cloud approach.

---

## 🛠️ 2. Tech Stack

### Frontend
* **Framework:** Ionic + Angular 20
* **Styling:** Custom SCSS UI (UrbanEstate design)
* **Auth:** Firebase Authentication
* **External DB:** Firestore

### Backend API
* **Runtime:** Node.js 20 (Alpine image)
* **Framework:** Express.js
* **DB Client:** `pg` (PostgreSQL client)

### Database
* **Platform:** PostgreSQL 16 (Alpine image)
* **Persistence:** Named Docker volume for persistent data

### Containerization & DevOps
* **Orchestration:** Docker Compose
* **Containerization:** Docker
* **Optimization:** Multi-stage Docker builds (Node → Nginx for the frontend)

---

## 📁 1. Project Structure

The project root (`CA1/`) contains the orchestration and service directories:

```text
CA1/
├── docker-compose.yml        # Orchestrates frontend, API and DB services
├── frontend/                 # Ionic + Angular app (UrbanEstate)
│   ├── Dockerfile            # Multi-stage build (Node -> Nginx)
│   ├── package.json
│   ├── src/
│   └── ...
└── api/                      # Node/Express backend API
    ├── Dockerfile            # Node 20-alpine image
    ├── package.json
    └── index.js

    frontend/: The Ionic/Angular application. Runs with ionic serve in development mode, and is built and served by Nginx in a container for deployment.

    api/: A simple Express API connecting to PostgreSQL, exposing endpoints like /health and /properties.

    db service: PostgreSQL 16 (official Docker image), defined only inside docker-compose.yml.

✅ 3. Prerequisites

You must have the following tools installed before attempting to run the full containerised stack:
Tool	Recommended Version	Check Command
Git	Latest	git --version
Node.js + npm	LTS (20.x)	node -v / npm -v
Docker Desktop	Latest	docker version / docker compose version
Ionic CLI	Optional (for dev mode)	npm install -g @ionic/cli

Once these are in place, you can choose between running the app in normal development mode or the full containerised stack.

💻 4. Local Development (Without Docker)

This method uses the Angular development server and is intended for front-end development only.
Bash

# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies (only needed the first time)
npm install

# 3. Start the Angular dev server
ionic serve
# OR
npm start

The app will be available at: http://localhost:8100

🚀 5. Containerised Deployment (Docker + Docker Compose)

The full stack is defined and orchestrated using docker-compose.yml.
5.1. Dockerfiles

    Frontend (frontend/Dockerfile): Uses a multi-stage build:

        Build Stage: Node 20-alpine builds the Ionic/Angular app. Includes npm install --legacy-peer-deps to resolve an Angular 20 vs @angular/google-maps@21 peer dependency conflict.

        Serve Stage: A small Nginx container serves the static build output (www/ folder) from /usr/share/nginx/html. Result: A production-style, small-footprint static hosting container.

    API (api/Dockerfile): Uses Node 20-alpine. Installs dependencies with npm install --omit=dev. Exposes port 3000 and runs npm start.

5.2. Docker Compose (docker-compose.yml)

The file defines three core services and manages networking/volumes:
YAML

services:
  frontend:
    build: ./frontend
    container_name: urbanestate-frontend
    ports:
      - "8080:80"             # Access at http://localhost:8080
    depends_on:
      - api
    networks:
      - urban-net
  
  api:
    build: ./api
    container_name: urbanestate-api
    environment:
      - DB_HOST=db            # Uses internal Docker service name
      # ... other DB variables
    ports:
      - "3000:3000"           # Access at http://localhost:3000
    depends_on:
      - db
    networks:
      - urban-net

  db:
    image: postgres:16-alpine
    container_name: urbanestate-db
    environment:
      # ... POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB
    volumes:
      - db_data:/var/lib/postgresql/data # Persistence
    networks:
      - urban-net

networks:
  urban-net:

volumes:
  db_data:

    frontend talks to api via the internal Docker network urban-net.

    api talks to the PostgreSQL container using the internal hostname db.

    db_data volume ensures PostgreSQL data is persistent across container restarts.

5.3. Build & Run the Full Stack

From the CA1 root folder (where docker-compose.yml is):
Bash

# 1. Build all service images (from their respective Dockerfiles)
docker compose build

# 2. Start all services in the foreground
docker compose up

# 3. Start all services in the background (recommended)
docker compose up -d

Access Points:
Service	Address
Frontend	http://localhost:8080
API Health	http://localhost:3000/health
Postgres	Internal Docker network

Stopping the Stack:
Bash

# Stop and remove containers, networks, and images
docker compose down

# Stop and remove containers, networks, images, AND the database volume (⚠️ DANGER: Deletes all DB data)
docker compose down -v

🗄️ 6. Database Notes (PostgreSQL)
Connecting to the DB Container

You can connect to the running PostgreSQL container using the following command:
Bash

docker exec -it urbanestate-db psql -U urbanestate -d urbanestate_db

Example Usage

The API's /properties endpoint relies on a properties table. Here is the example DDL and DML:
SQL

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  city TEXT NOT NULL
);

INSERT INTO properties (title, city)
VALUES ('Test Property 1', 'Drogheda'),
       ('Test Property 2', 'Dublin');

Test Endpoint: GET http://localhost:3000/properties → returns a JSON list of properties.

🔥 7. Firebase Integration

The frontend integrates directly with Firebase Authentication and Firestore as external, managed cloud services.

    Firebase configuration is stored in the Angular environment files (frontend/src/environments/).

    Since Firebase is accessed securely via HTTPS directly from the browser, it is not run inside Docker.

This setup demonstrates a hybrid architecture: containers for the core application/API/DB combined with external managed services for specialized functions.

✨ 8. Summary

This repository provides a fully working, containerised version of the UrbanEstate Ionic/Angular application, ready for local development and cloud deployment:

    ✅ Web frontend in a robust Nginx container

    ✅ Node/Express API container

    ✅ PostgreSQL database container with persistence

    ✅ Firebase Auth + Firestore as external cloud services

    ✅ One-command startup with docker compose up

This stack is a practical demonstration of Docker, Docker Compose, and cloud integration principles for the Cloud Platforms module.