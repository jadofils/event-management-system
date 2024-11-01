// app/layout.js
import './globals.css'; // If you have global styles

export const metadata = {
  title: 'Admin Panel',
  description: 'Event Management Admin Panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
