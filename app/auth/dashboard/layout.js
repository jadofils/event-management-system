// app/dashboard/layout.js
"use client";

import { useState } from 'react';
import Sidebar from '../../components/layout/SideBar';
import AdminNavBar from '../../components/layout/AdminNavBar';
import UsersTable from '../../components/ui/UsersTable';
import EventsTable from '../../components/ui/events'
import BookingsTable from '../../components/ui/bookings'
import RejectedEvents from '../../components/ui/rejected'
import ApprovedBookings from '../../components/ui/approvedBookings';
import pendingEvents from '../../components/ui/pending';
import PendingBookings from '../../components/ui/pending';



export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('events');

  const sectionContent = {
    users: (
      <>
        <p>Manage your users here.</p>
        <UsersTable />
      </>
    ),
    events: (
      <>
        <p>Manage your events here.</p>
        <EventsTable/>
      </>
    ),
    approvedEvents:  ( <>
      <p>Manage your events here.</p>
      <ApprovedBookings/>,
    </>),
    pendingEvents:  ( <>
      <p>Manage your events here.</p>
      <PendingBookings/>
      </>
    ),

    bookings: ( <>
    <p>Manage your events here.</p>
    <BookingsTable/>,
  </>),
    rejectedEvents: ( <>
      <p>Manage your events here.</p>
      <RejectedEvents/>,
    </>),
    settings: <p>Settings options go here.</p>,
    admin: <p>Admin-specific content here.</p>,
    user: <p>User-specific content here.</p>,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <AdminNavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-gray-800 text-white pt-4 ml-0 mt-[5vh] rounded">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
          <div>{sectionContent[activeSection]}</div>
        </main>
      </div>
    </div>
  );
}
