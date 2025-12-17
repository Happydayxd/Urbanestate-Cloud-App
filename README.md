# 🏡 UrbanEstate – Cloud Platform Deployment Project

**UrbanEstate** is a mobile-style web application built with **Ionic + Angular**, allowing users to browse real-estate properties, add new listings, view property details, and manage user accounts.

For the **Cloud Platform Development Continuous Assessment**, this project has been adapted into a **containerised, cloud-deployable application** using **Docker** and **Docker Compose**, integrating with **Firebase Authentication** and **Firestore** as managed cloud services.

---

## ☁️ 1. Cloud Architecture Overview

UrbanEstate follows a **simple hybrid cloud architecture**, combining portable containers with scalable managed backend services.



[Image of Hybrid Cloud Architecture Diagram]


### Architecture Summary

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Container** | Ionic + Angular | Built with Node.js, served via **Nginx** (Alpine). |
| **Auth Service** | Firebase Auth | Handles secure user login & registration (External). |
| **Database** | Firestore (NoSQL) | Stores property listings & user profiles (External). |
| **Orchestration** | Docker Compose | Manages the container lifecycle. |
| **Infrastructure** | Google Cloud (GCP) | Hosted on a Compute Engine VM (Ubuntu). |

> **Design Note:** The frontend container is fully self-contained. Because Firebase and Firestore are accessed directly from the client via HTTPS, **no backend API container or SQL database** is required for this specific architecture.

---

## 🛠️ 2. Tech Stack

### Frontend & App
* **Framework:** Ionic + Angular
* **Language:** TypeScript
* **Styling:** Custom SCSS (UrbanEstate UI)
* **External Services:** Firebase Authentication, Firestore

### Cloud & DevOps
* **Containerisation:** Docker (Multi-stage builds)
* **Orchestration:** Docker Compose
* **Web Server:** Nginx (Alpine Linux)
* **Cloud Provider:** Google Cloud Platform (Compute Engine)

---

## 📁 3. Project Structure

```text
CA1/
├── docker-compose.yml        # Orchestrates the frontend container
├── frontend/
│   ├── Dockerfile            # Multi-stage build (Node → Nginx)
│   ├── nginx.conf            # Angular routing support
│   ├── package.json
│   ├── src/
│   └── ...
├── .dockerignore
└── README.md

🔥 4. Firebase Setup Guide (Required)

Before deploying, you must set up a Firebase project to generate the required API keys.
4.1 Create a Firebase Project

    Go to the Firebase Console.

    Click Add project.

    Name it (e.g., urbanestate-ca).

    Disable Google Analytics (not required for this CA).

    Click Create Project.

4.2 Enable Authentication (Email/Password)

    In the left sidebar, go to Build → Authentication.

    Click Get Started.

    Select the Sign-in method tab.

    Click Email/Password.

    Enable the "Email/Password" toggle.

    Click Save.

4.3 Enable Firestore Database

    In the left sidebar, go to Build → Firestore Database.

    Click Create Database.

    Location: Select a region (e.g., eur3 for Europe).

    Security Rules: Select Start in test mode (allows read/write access for development).

    Click Create.

4.4 Generate API Keys

    Click the Gear Icon (Project Settings) next to "Project Overview".

    Scroll down to the Your apps section.

    Click the Web icon (</>).

    Register the app (e.g., nickname: "UrbanEstate Web").

    You will see a configuration object. Copy the following values:

        apiKey

        projectId

    You will need these values for Section 6: Configuration.

☁️ 5. Installation Guide (Google Cloud)

<em>Deployment Target: Compute Engine</em> </div>

Follow these steps to deploy the application from scratch on a new VM.
5.1 Create the VM

    Open Google Cloud Console → Compute Engine → VM Instances.

    Click Create Instance.

    OS: Ubuntu Server 24.04 LTS (x86/64).

    Machine type: e2-micro or e2-small.

    Firewall: Check ☑️ Allow HTTP traffic and ☑️ Allow HTTPS traffic.

    Click Create.

5.1.1 Configure Host Firewall (UFW)

Once SSH'd into the VM via the Google Cloud Console, secure the host by configuring the UFW (Uncomplicated Firewall) to strictly allow only web traffic.
Bash

# 1. Allow HTTP (Web)
sudo ufw allow 80/tcp

# 2. Allow HTTPS (Secure Web)
sudo ufw allow 443/tcp

# 3. Enable the firewall
sudo ufw enable

# 4. Verify status
sudo ufw status

    Note: Google Cloud's browser-based SSH console for administrative access.

5.2 Install Docker on the VM

SSH into your new VM and run the following commands to install Docker and Docker Compose:

# Update and install prerequisites
sudo apt update
sudo apt install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL [https://download.docker.com/linux/ubuntu/gpg](https://download.docker.com/linux/ubuntu/gpg) | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] [https://download.docker.com/linux/ubuntu](https://download.docker.com/linux/ubuntu) \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Enable Docker for the current user (avoids using sudo for docker commands)
sudo usermod -aG docker $USER
newgrp docker

Verify the installation:
Bash

docker version
docker compose version

5.3 Clone the Repository
Bash

git clone [https://github.com/Happydayxd/Urbanestate-Cloud-App.git](https://github.com/Happydayxd/Urbanestate-Cloud-App.git)
cd Urbanestate-Cloud-App

🔑 6. Configuration (Crucial Step)

This project uses client-side Firebase. You must manually inject the keys generated in Section 4 before building the Docker image.

⚠️ You need to edit the following files using nano:

    frontend/src/app/app.component.ts (Google Maps)

    frontend/src/app/service/identity/identity.ts (Firebase Auth)

    frontend/src/app/service/posts/posts.ts (Firestore)

Example:
TypeScript

// Replace placeholders with your actual values from Firebase Console
apiKey: 'AIzaSyDOC...',              // Your Firebase API Key
projectId: 'urbanestate-ca',         // Your Firebase Project ID
googleMapsApiKey: 'AIzaSyMaps...'    // Your Google Maps API Key

🚀 7. Build & Launch
7.1 Understanding the Docker Setup

    Dockerfile: Uses a Multi-stage build.

        Build Stage: Node 20-alpine installs dependencies and compiles the Angular app.

        Serve Stage: Nginx-alpine serves the static files and handles routing.

    Docker Compose: Maps port 80 inside the container to port 80 on the VM.

7.2 Run the Deployment

From the root of the project folder:
Bash

# Build the image
docker compose build

# Start the container in detached mode (background)
docker compose up -d

7.3 Access the Application

Open your browser and navigate to your VM's Public IP:

    http://<VM_PUBLIC_IP>

    https://<VM_PUBLIC_IP>

🔐 8. Security Notes

    Authentication: Handled securely by Firebase; no user passwords are stored on the server.

    Database: Firestore access is strictly controlled via Cloud Security Rules.

    Exposure: The container only exposes ports 80/443. No internal Node.js process is exposed directly to the internet.

✨ 9. Summary

This project demonstrates a production-ready approach to cloud development:

    ✅ Containerisation: Efficient multi-stage Docker builds.

    ✅ Orchestration: Simple management with Docker Compose.

    ✅ Cloud Deployment: Live hosting on Google Cloud Compute Engine.

    ✅ Hybrid Architecture: Leveraging managed services (Firebase) alongside custom containers.