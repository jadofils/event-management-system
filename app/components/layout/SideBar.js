import { FaUser, FaCalendarAlt, FaCheck, FaClock, FaTimesCircle, FaCogs, FaUserShield, FaTicketAlt } from 'react-icons/fa';

export default function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { key: 'users', label: 'Users', icon: <FaUser /> },
    { key: 'events', label: 'Events', icon: <FaCalendarAlt /> },
    { key: 'approvedEvents', label: 'Approved Events', icon: <FaCheck /> },
    { key: 'pendingEvents', label: 'Pending Events', icon: <FaClock /> },
    { key: 'bookings', label: 'Bookings', icon: <FaTicketAlt /> },
    { key: 'rejectedEvents', label: 'Rejected Events', icon: <FaTimesCircle /> },
    // { key: 'settings', label: 'Settings', icon: <FaCogs /> },
    // { key: 'admin', label: 'Admin', icon: <FaUserShield /> },
    // { key: 'user', label: 'User', icon: <FaUser /> },
  ];

  return (
      <>
<aside className="w-1/4 bg-slate-800 text-white p-4 min-h-screen">
<h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
      <nav className="space-y-4">
        {menuItems.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded ${
              activeSection === key ? 'bg-secondary' : 'hover:bg-secondary/70'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </nav>
    </aside>
    </>
  );
}
