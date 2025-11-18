# Doctor Appointment Portal

A simple **React** application to book appointments with doctors and view appointment history. This project demonstrates a basic CRUD flow with a backend API.

---

## Features

- View a list of doctors with their specialization and fees.
- Book an appointment with a doctor.
- See confirmation once an appointment is successfully booked.
- Search and view appointment history by patient name.

---

## Tech Stack

- **Frontend:** React, CSS
- **Backend:** (Assumes a simple REST API server running on `localhost:5000`)  
  - Endpoints:  
    - `GET /doctors` → List of doctors  
    - `POST /appointments` → Book an appointment  
    - `GET /appointments` → List all appointments  
    - `GET /appointments/search?patientName=` → Search appointments by patient name

---

## Installation

1. Clone the repository:

```bash
git clone (https://github.com/Shahid-Momin/Doctor_appointment_portal.git)
cd doctor-appointment-portal

## Running Locally

 ** Backend**
1. Go to the backend folder:  
   ```bash
2.cd backend
 -Install dependencies:
3.npm install
 -Start the server:
4.node server.js
---The backend server will run at http://localhost:5000.

**Frontend**
1.Go to the frontend folder:
2.cd frontend
 -Install dependencies:
3.npm install
 -Start the development server:
4.npm run dev
---The frontend will run at http://localhost:3000 (or a port specified by Vite).

## Project Structure.
DOCTOR_APPOINTMENT_PORTAL/
├─ backend/
│  ├─ node_modules/
│  ├─ appointments.json
│  ├─ data.js
│  ├─ package.json
│  ├─ package-lock.json
│  └─ server.js
├─ frontend/
│  ├─ node_modules/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  ├─ BookAppointment.jsx
│  │  │  ├─ DoctorList.jsx
│  │  │  ├─ Success.jsx
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  └─ style.css
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  └─ vite.config.js
├─ README.md

Usage
Open the app in your browser at http://localhost:3000.
Browse doctors and click Book Appointment.
Fill in your details and confirm the appointment.
Navigate to Appointment History to view previous bookings.
Use the search bar to filter by patient name.
