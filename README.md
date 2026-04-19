# GlossBook - Salon Booking Management App 💇‍♀️💅

A modern, full-stack MERN (MongoDB, Express, React, Node.js) application designed for salons to easily manage their services, client bookings, and revenue.

## 🌟 Features

### For Clients (Users)
* **Secure Authentication**: Register and log in securely using JWT.
* **Service Selection**: Browse available salon services with clear pricing in Indian Rupees (₹).
* **Intuitive Booking System**: Pick a date and view available time slots in a user-friendly 12-hour (AM/PM) format.
* **Instant Notifications**: Receive instant on-screen toast notifications and native browser alerts upon successful booking.
* **Email Confirmations**: Automated email confirmations sent straight to your inbox with appointment details.
* **Booking History**: View past and upcoming appointments with statuses.

### For Salon Owners (Admin)
* **Admin Dashboard**: A comprehensive overview of total revenue and total bookings.
* **Manage Appointments**: Filter bookings by date and status. Cancel or update appointments as needed.
* **Manage Services**: Dynamically add new services, set prices (₹), and specify duration (in minutes). Or delete outdated services.
* **Role-Based Access Control**: Secure routes ensuring only admins can access the dashboard.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, React Router DOM, React Toastify, Axios, CSS3 (Modern UI)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
* **Email Service**: Nodemailer (Gmail SMTP)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v14 or higher)
* MongoDB account (or local MongoDB server)
* A Gmail account (with an App Password generated for sending emails)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/salon-booking-management.git
cd salon-booking-management
```

### 2. Backend Setup (Server)

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```
*(Note: To send emails via Nodemailer, you must generate an "App Password" in your Google Account settings > Security > 2-Step Verification).*

**Seed the Admin Account:**
Run the built-in script to generate your default Admin user.
```bash
node seedAdmin.js
```
*Default Admin Credentials:*
* **Email**: `admin@salon.com`
* **Password**: `admin123`

Start the server:
```bash
npm run dev
# or
npm start
```
*The server runs on `http://localhost:5000`*

### 3. Frontend Setup (Client)

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the React app:
```bash
npm start
```
*The client runs on `http://localhost:3000`*

---

## 📱 Usage

1. Open your browser and go to `http://localhost:3000`.
2. **As an Admin**: Log in using the seeded credentials (`admin@salon.com` / `admin123`). Go to the Admin Dashboard to add some initial services (e.g., "Haircut - ₹500").
3. **As a User**: Create a new account, log in, navigate to the Booking page, select a service, date, and an available AM/PM time slot to book your appointment!

---

## ☁️ Deployment

* **Frontend**: Deployed on Vercel. Ensure `api.js` points to your deployed backend URL.
* **Backend**: Deployed on Render / Heroku. Ensure environment variables are set in the hosting dashboard.
* **Database**: Hosted on MongoDB Atlas.

---

## 📄 License

This project is licensed under the MIT License.
