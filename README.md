# UrbanEstate – Mobile & Social Computing (CA1 & CA2)

UrbanEstate is a mobile application developed using **Ionic and Angular** for the
**Mobile and Social Computing** module.

The project covers both **CA1** (core application development) and **CA2**
(Firebase database integration and map features).

## 1. Project Description

UrbanEstate is a real-estate mobile application that allows users to:

- Register and log in using Firebase Authentication
- Browse property listings stored in Firebase Firestore
- Add new properties using a form
- View booking-related content
- View property locations using a Map tab

The application follows a **tab-based navigation structure** similar to examples
shown during lectures, adapted for a real-estate use case.

## 2. Assessment Coverage

### CA1 – Core Application
- Ionic + Angular setup
- Tab-based navigation
- Reusable components (Post, Header, Content, Comments, Actions)
- Responsive layout and styling
- Structured post data

### CA2 – Firebase & Extensions
- Firebase Authentication (Login & Register)
- Firestore integration:
  - Load property listings
  - Add new property listings
- Add Property form
- Map feature

## 3. Main Features

### Authentication
- Email & password login
- Email & password registration
- Implemented using Firebase Authentication
- Logic handled in a dedicated `Identity` service

### Properties (Tab 2)
- Property listings loaded dynamically from Firestore
- Each property includes:
  - Agent information
  - Property image
  - Listing details
  - Location details
  - Buyer notes
- Displayed using reusable post components

### Add Property (CA2)
- Dedicated form page
- Writes property data directly to Firestore
- Basic validation of required fields
- Redirects back to the Properties tab

### Bookings (Tab 3)
- Booking layout demonstrating potential viewing management
- Structured for future Firestore integration

### Map Feature (CA2)
- Separate Map tab
- Demonstrates how property locations can be visualised
- Integrated as an Ionic page

## 4. Firebase & Firestore Usage

### Firebase Authentication
- Initialised using `initializeApp`
- Login and registration via `signInWithEmailAndPassword` and `createUserWithEmailAndPassword`
- Implemented in the `Identity` service

### Firestore Database
- Managed through the `Posts` service
- Key functions:
  - `getAllPosts()` – Reads property documents from Firestore
  - `addPost(post)` – Writes new property documents
- Uses Promise-based logic aligned with lecture examples

## 5. Project Structure

src/
├── app/

│ ├── tabs/ // Tab navigation

│ ├── tab1/ // Home

│ ├── tab2/ // Properties

│ ├── tab3/ // Bookings

│ ├── tab4/ // Profile

│ ├── login/ // Login page

│ ├── register/ // Register page

│ ├── add-property/ // Add Property form (CA2)

│ ├── maps/ // Map feature (CA2)

│ ├── components/ // Reusable UI components

│ ├── service/

│ │ ├── posts/ // Firestore logic

│ │ └── identity/ // Firebase Authentication

│ └── app.routes.ts // Application routing

## 6. Git Version Control

The project uses a structured Git workflow:

- `main` – Stable submission branch
- `develop` – Integration branch
- `feature/*` – Feature development branches

This workflow demonstrates correct use of version control and incremental development.

## 7. How to Run the Project
npm install
ionic serve


Ensure Firebase configuration is valid and Firestore rules allow
read/write access for development.

## 8. Author
- Student: Jonathan Granados
- Course: BSc in Computing
- Module: Mobile and Social Computing
- Assessment: CA1 & CA2

## 9. Status
- ✔ CA1 completed
- ✔ CA2 completed
- ✔ Firebase integrated
- ✔ Firestore database operations implemented
- ✔ Map feature added
- ✔ Ready for submission

