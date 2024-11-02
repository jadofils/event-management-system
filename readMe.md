# Event Management System

An advanced Event Management System built with Next.js, Prisma, and Node.js, designed to help users seamlessly manage events, bookings, and schedules. The system provides a dynamic dashboard based on user roles, including features like event creation, updates, deletions, and user activity monitoring.

## Project Status

> **Note**: This project is currently under development to incorporate more features and enhancements. Some features might not be fully functional yet, but are expected to be working in a few days.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [User Roles and Access](#user-roles-and-access)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Project Overview

**Event Management System** is a tool designed to manage events, handle bookings, and organize event schedules effectively. The platform supports role-based access, with each role granting specific permissions for actions like viewing, creating, updating, and deleting events. Users can explore events, book them, and track their statuses, while admins can manage users, bookings, and ticketing.

## Features

- **User Authentication**: Role-based login with automatic session expiration after one hour.
- **Event Management**: Full CRUD operations (create, read, update, delete) on events.
- **Role-Based Dashboard**: Navigation and actions adapt based on user roles (e.g., Admin, Manager, User).
- **Booking System**: Users can book events, and admins can approve or reject bookings.
- **Admin Controls**: Admins can view all user activities and manage users, bookings, and tickets.
- **Dynamic Navbar**: The landing page includes a navbar with options for login, registration, and a theme toggle (dark/light mode).
- **Event Carousel**: Automatically sliding events section on the landing page.
- **Mobile Responsive Design**: Adapts seamlessly to all screen sizes.

## Technologies

- **Frontend**: [Next.js](https://nextjs.org/), Tailwind CSS
- **Backend**: Node.js, Next.js API routes (using JavaScript and TypeScript)
- **Database**: PostgreSQL (managed by Prisma)
- **Hosting**: [Vercel](https://event-management-system-s4fy-jsk01pcjl-jadofils-projects.vercel.app/)

## Project Structure


eventmanagement/
├── app/                   # Main application code
│   ├── api/               # Backend API endpoints
│   ├── components/        # Reusable components
│   ├── pages/             # Next.js page routing
├── prisma/                # Prisma database schema and client
├── public/                # Static assets (images, icons)
├── .env                   # Environment variables
├── README.md              # Project documentation
└── package.json           # Project metadata and dependencies
Installation
Prerequisites
Ensure you have the following installed on your machine:

Node.js (v14 or later)
PostgreSQL or another Prisma-supported database
Prisma CLI (npm install -g prisma)
Steps
Clone the Repository


git clone https://github.com/jadofils/event-management-system.git
cd eventmanagement
Install Dependencies


npm install
Configure Environment Variables

Create a .env file in the project root and add your database credentials:

env
Copy code
DATABASE_URL="DATABASE_URL="postgresql://postgres.sehgclzcrtcbmewmyhrz:YxxKp8Hzya6xqIPY@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
"
Run Prisma Migrations


npx prisma migrate dev --name init
Generate Prisma Client

npx prisma generate
Start the Development Server

npm run dev
The application will be available at http://localhost:3000.

Usage
Register/Login: Register or log in based on your role (e.g., admin, manager, user).
Session Management: Sessions expire after one hour of inactivity.
Admin and User Actions:
Users can view and book events.
Admins have extended permissions to manage users, bookings, tickets, and more.
Dynamic Content: Landing page features a random event carousel and sections showcasing popular event hosts.
API Endpoints
Route	Description
/api/users	POST to create a user; GET to fetch all users
/api/users/[id]	Perform actions requiring a user ID parameter
/api/bookings	GET to view bookings; POST to create a new booking
/api/bookings/[id]	View bookings for a specific user and event
/api/events	Register a new event; GET all events
/api/events/[id]	Update, delete, or view event details based on event ID
User Roles and Access
Upon login, the system redirects users based on their roles stored in the database:

Admin: Full access to all resources, including user and booking management.
Manager: Limited administrative functions (customizable per project requirements).
User: Limited to viewing and booking events.
Default Admin User

Role: Admin
Email: jd.fils.codinghidden@gmail.com
Password: Salim@12
Screenshots
Include screenshots here to showcase your application’s interface, dashboard, and key features. Upload images to the public/ folder and use the following markdown:


![Dashboard](public/screenshots/dashboard.png)
![Event Carousel](public/screenshots/event-carousel.png)



Author
Jado Fils Sezikeye

Email: jadofilsgeeksforcoding@gmail.com
GitHub: jadofils
