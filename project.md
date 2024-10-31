Project Folder Structure
plaintext
Copy code
event-management-system/
├── prisma/
│   ├── schema.prisma          # Prisma schema for database structure
├── public/
│   ├── assets/                # Images, icons, and other assets
├── src/
│   ├── components/            # Reusable components
│   │   ├── AdminPanel.js      # Admin dashboard panel
│   │   ├── EventList.js       # List of events view for users
│   │   ├── EventBooking.js    # Event booking component for users
│   ├── pages/
│   │   ├── api/               # API routes for backend logic
│   │   │   ├── auth/          # Authentication-related routes
│   │   │   │   └── login.js   # Login route for admin
│   │   │   ├── events/        # Event management routes
│   │   │   │   ├── index.js   # Route to fetch all events
│   │   │   │   ├── [id].js    # Route to fetch, update, or delete a specific event
│   │   │   │   └── book.js    # Route to handle seat booking for an event
│   │   └── admin/             # Admin pages
│   │   │   ├── index.js       # Admin login page
│   │   │   └── dashboard.js   # Admin dashboard to manage events
│   │   └── events/            # User pages for viewing and booking events
│   │       └── index.js       # Main events page
│   ├── lib/                   # Utility functions and database client setup
│   │   └── prisma.js          # Prisma client instance
│   ├── styles/                # Custom CSS and styling files
│   ├── pages/                 # Next.js default pages
│       └── _app.js            # Custom app component to load global styles
│       └── index.js           # Home page (redirect to /events)
├── .env                       # Environment variables (database URL, etc.)
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
Routes and API Endpoints
Admin Routes

Login: /api/auth/login.js - Handles authentication for admins.
Admin Dashboard: /admin/dashboard.js - Interface for admins to add, edit, and delete events.
Event Management Routes

Create Event: /api/events/index.js - POST request to create a new event (admin only).
Update Event: /api/events/[id].js - PUT request to edit an event based on its ID.
Delete Event: /api/events/[id].js - DELETE request to delete an event by its ID.
User Routes

View Events: /api/events/index.js - GET request to fetch all events.
Book Event: /api/events/book.js - POST request to book seats for an event. Includes seat availability updates.
Pages

Admin Login: /admin/index.js - Page for admin login.
Admin Dashboard: /admin/dashboard.js - Page to create, update, and delete events.
User Events Page: /events/index.js - Public-facing page to view and book events.