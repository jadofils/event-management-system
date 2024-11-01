// app/page.js
'use client'; // This should be the first line

import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HeroSection from './components/welcome/HelloSection';
import EventsSection from './components/welcome/EventCard';
import Hosters from './components/welcome/Hosters'
export default function Home() {
 
  
  return (
   
      <div className="min-h-screen bg-secondary">
        <Navbar />  {/* This component should correctly call useTheme */}
        <main>
          <HeroSection />
          <EventsSection />

          <Hosters />
        </main>
        <Footer />
      </div>
  
  );
}
