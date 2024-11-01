'use client'
import React, { useState, useEffect } from 'react';

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      description: "Join us for the biggest tech conference of the year.",
      image: "https://th.bing.com/th?id=OIP.rD2__f73-oUBzVztvJJ3CQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "April 20, 2024",
      description: "Experience amazing artists and unforgettable moments.",
      image: "https://th.bing.com/th?id=OIP.0HOj5_E-dLZfxTaWseLe0gHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 3,
      title: "Journalist Conversation",
      date: "september 27, 2024",
      description: "Taste exceptional cuisines and finest wines.",
      image: "https://th.bing.com/th?id=OIP.RU4af_EuUYW7RuHFveuaVgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 4,
      title: "Friday Journalism Time",
      date: "October 25, 2024",
      description: "The day of voice of people.",
      image: "https://th.bing.com/th?id=OIP.zALFC8ylvidF3MQlGwBLbQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 5,
      title: "Artist and songs ",
      date: "September 21, 2024",
      description: "Taste exceptional cuisines and finest wines.",
      image: "https://th.bing.com/th?id=OIP.YIdNVpF0iEp6cbmXe0TrMAHaFa&w=292&h=213&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 6,
      title: "Programming Day",
      date: "Jonuary 23 2025",
      description: "Taste exceptional cuisines and finest wines.",
      image: "https://th.bing.com/th?id=OIP.kMOSq6iQfLMCzP-0u4_VHAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 7,
      title: "Expo Festival Kacyiru",
      date: "December 22, 2024",
      description: "Taste exceptional cuisines and finest wines.",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 8,
      title: "Hands and arts ",
      date: "May 5, 2024",
      description: "Rwanda arts and tradition festival",
      image: "https://th.bing.com/th?id=OIP.zGHScKahOn9q7TXJhWhKeQHaFB&w=303&h=205&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
  ];

  // Create state for each card
  const [currentEventIndices, setCurrentEventIndices] = useState([0, 1, 2]); // Start with first three indices
  const [openEventIds, setOpenEventIds] = useState([null, null, null]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleEvent = (cardIndex, id) => {
    const newOpenEventIds = [...openEventIds];
    newOpenEventIds[cardIndex] = openEventIds[cardIndex] === id ? null : id;
    setOpenEventIds(newOpenEventIds);
  };

  // Automatically slide events every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndices((prevIndices) =>
        prevIndices.map((index, cardIndex) => (index + 1) % events.length)
      );
    }, 5000); // Change every 5000 milliseconds (5 seconds)

    return () => clearInterval(interval); // Cleanup on unmount
  }, [events.length]);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Upcoming Events
        </h2>
        <div className="flex justify-center">
          {currentEventIndices.map((currentIndex, cardIndex) => (
            <div 
              key={cardIndex}
              className={`bg-gray-700 ${isMobile ? 'w-full' : 'w-[30%]'} p-6 rounded-lg shadow-md flex flex-col transition-transform duration-300 mx-4`}
            >
              <img
  src={events[currentIndex].image}
  alt={events[currentIndex].title}
  className="w-full h-auto max-h-48 object-cover rounded-t-lg"
/>

              <h3 className="text-accent text-xl text-white font-bold mb-2">{events[currentIndex].title}</h3>
              <p className="text-slate-300 mb-2">{events[currentIndex].date}</p>
              <button 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" 
                onClick={() => toggleEvent(cardIndex, events[currentIndex].id)}
              >
                {openEventIds[cardIndex] === events[currentIndex].id ? "Hide Description" : "See Description"}
              </button>
              {openEventIds[cardIndex] === events[currentIndex].id && (
                <p className="text-accent/80 mt-2 text-slate-300">{events[currentIndex].description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
