import React, { useState } from 'react';

export default function Hosters() {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      description: "Join us for the biggest tech conference of the year.",
      image: "https://th.bing.com/th?id=OIP.oP0uw-D_Y2s0TG17GQk72gHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "April 20, 2024",
      description: "Experience amazing artists and unforgettable moments.",
      image: "https://th.bing.com/th?id=OIP.60SgcYixlQusCsAN29RM5AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "May 5, 2024",
      description: "Taste exceptional cuisines and finest wines.",
      image: "https://th.bing.com/th?id=OIP.VqxtlWgrsfErpOTyES3jxQHaEa&w=323&h=192&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
  ];

  const [openEventId, setOpenEventId] = useState(null);

  const toggleEvent = (id) => {
    setOpenEventId(openEventId === id ? null : id);
  };

  return (
    <section className="py-20 bg-secondary ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
          Our Events Hoster
        </h2>
        <div className="flex flex-wrap justify-center">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-beige w-[30%] p-6 rounded-lg shadow-md flex flex-col mx-4 mb-4"
            >
              <img src={event.image} alt={event.title} className="w-full h-auto max-h-48 object-cover rounded-t-lg" />
              <h3 className="text-accent text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-primary mb-2">{event.date}</p>
              <button 
                className={`mt-2 px-4 py-2 text-slate-800 rounded transition-colors ${openEventId === event.id ? 'bg-blue-600' : 'bg-white'}`} 
                onClick={() => toggleEvent(event.id)}
              >
                {openEventId === event.id ? "Hide Description" : "See Description"}
              </button>
              {openEventId === event.id && (
                <p className="text-accent/80 mt-2">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .bg-beige {
          background-color: #f5f5dc; /* Beige color */
        }
        @media (min-width: 768px) {
          .flex {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
