🏡 UrbanEstate – Cloud Platform Deployment Project

UrbanEstate is a mobile-style web application built with Ionic + Angular, allowing users to browse real-estate properties, add new listings, view property details, and manage user accounts.

For the Cloud Platform Development Continuous Assessment, this project has been transformed into a containerised, cloud-native application capable of both VM-based deployment and serverless automated deployment using Google Cloud Run.
☁️ 1. Cloud Architecture Overview

UrbanEstate follows a hybrid cloud architecture, combining portable containers with scalable managed backend services.

Architecture Summary
Component	Technology	Description
Frontend Container	Ionic + Angular	Built with Node.js, served via Nginx (Alpine).
Auth Service	Firebase Auth	Handles secure user login & registration (External).
Database	Firestore (NoSQL)	Stores property listings & user profiles (External).
CI/CD Pipeline	Cloud Build	Automates testing, building, and deploying.
Hosting	Cloud Run / GCE	Serverless container hosting (Auto-scaling).
🛠️ 2. Tech Stack
Frontend & App

    Framework: Ionic + Angular

    Language: TypeScript

    Styling: Custom SCSS (UrbanEstate UI)

    External Services: Firebase Authentication, Firestore

Cloud & DevOps

    Containerisation: Docker (Multi-stage builds)

    Orchestration: Docker Compose (Local/VM) & Cloud Build (Cloud)

    Infrastructure: Google Cloud Run (Serverless) & Compute Engine (VM)

    Secret Management: Cloud Build Substitutions

📁 3. Project Structure
Plaintext

CA1/
├── cloudbuild.yaml           # CI/CD Pipeline definition for Google Cloud
├── docker-compose.yml        # Orchestration for local/VM testing
├── frontend/
│   ├── Dockerfile            # Multi-stage build (Node → Nginx)
│   ├── nginx.conf            # Angular routing support
│   ├── package.json
│   ├── src/
│   └── ...
├── .dockerignore
└── README.md

🔥 4. Firebase Setup Guide (Required)

Before deploying (manually or automatically), you must set up a Firebase project to generate the required API keys.
4.1 Create a Firebase Project

    Go to the Firebase Console.

    Click Add project and name it (e.g., urbanestate-ca).

    Disable Google Analytics (not required).

    Click Create Project.

4.2 Enable Authentication

    Go to Build → Authentication.

    Click Get Started.

    Select Email/Password and enable the toggle.

    Click Save.

4.3 Enable Firestore Database

    Go to Build → Firestore Database.

    Click Create Database.

    Select a region (e.g., eur3 for Europe).

    Security Rules: Select Start in test mode (allows read/write for development).

4.4 Generate API Keys

    Click the Gear Icon (Project Settings).

    Scroll to Your apps.

    Click the Web icon (</>) and register the app.

    Copy the apiKey and projectId. You will need these for deployment.

🚀 5. Automated Deployment (Cloud Run + Cloud Build)

Recommended for Production & CI/CD

This project includes a cloudbuild.yaml pipeline that automates the entire deployment process. It securely injects API keys, builds the Docker container, and deploys it to Google Cloud Run without exposing secrets in the code.
5.1 Prerequisites

    A Google Cloud Project with billing enabled.

    APIs Enabled: Cloud Build API, Cloud Run API, Artifact Registry API.

5.2 Deployment Steps

You can deploy directly from the Google Cloud SDK Shell without manually editing any files.

1. Navigate to the Project Directory Ensure you are in the root folder containing CA1/cloudbuild.yaml.
Bash

cd path/to/Urbanestate-Cloud-App

2. Run the Build & Deploy Command Replace the values below with your actual Firebase and Google Maps keys. This command submits the build to Google Cloud, injects your secrets, and deploys the app.
Bash

gcloud builds submit . \
  --config=CA1/cloudbuild.yaml \
  --project=YOUR_GOOGLE_CLOUD_PROJECT_ID \
  --region=europe-west1 \
  --substitutions=_FIREBASE_API_KEY="AIzaSy...YOUR_KEY",_FIREBASE_PROJECT_ID="your-firebase-id",_MAPS_API_KEY="AIzaSy...YOUR_MAPS_KEY"

5.3 What Happens Next?

    Secret Injection: Cloud Build searches for placeholder text (e.g., YOUR_FIREBASE_API_KEY) in identity.ts, posts.ts, and app.component.ts and replaces them with the real keys provided in the command.

    Docker Build: It builds the container image.

    Push: The image is stored in Google Artifact Registry.

    Deploy: The new image is released to Cloud Run.

    Live URL: The terminal will output a secure HTTPS URL (e.g., https://urbanestate-frontend-xyz.a.run.app) where the app is live.

💻 6. Manual Deployment (Compute Engine VM)

Alternative method using standard Docker & VM

Follow these steps if you prefer to manage a Virtual Machine manually.
6.1 Create the VM

    Open Google Cloud Console → Compute Engine.

    Create an Instance (Ubuntu 24.04 LTS, e2-micro).

    Firewall: Check ☑️ Allow HTTP and ☑️ Allow HTTPS.

6.2 Install Docker on VM

SSH into your VM and run:
Bash

# Install Docker & Compose
sudo apt update && sudo apt install -y docker.io docker-compose-v2
sudo usermod -aG docker $USER
newgrp docker

6.3 Clone & Configure
Bash

git clone https://github.com/Happydayxd/Urbanestate-Cloud-App.git
cd Urbanestate-Cloud-App

⚠️ Important: For manual deployment, you must manually edit the configuration files to add your keys.
Bash

nano frontend/src/app/service/identity/identity.ts
# Replace 'YOUR_FIREBASE_API_KEY' with your real key.

6.4 Build & Launch
Bash

docker compose build
docker compose up -d

Access the app at http://<VM_PUBLIC_IP>.
🔐 7. Security Notes

    Secret Management: In the Automated Deployment (Section 5), API keys are never committed to GitHub. They are injected only during the build process using Cloud Build substitutions.

    Authentication: Handled securely by Firebase; no user passwords are stored on the server.

    Container Security: The container uses a multi-stage build, ensuring the final image contains only the production Nginx server and compiled static assets, minimizing the attack surface.

✨ 8. Summary

This project demonstrates a production-ready approach to cloud development:

    ✅ Containerisation: Efficient multi-stage Docker builds.

    ✅ CI/CD Automation: Zero-touch deployment using Cloud Build.

    ✅ Serverless Hosting: Auto-scaling deployment on Cloud Run.

    ✅ Hybrid Architecture: Leveraging managed services (Firebase) alongside custom containers.