// components/welcome/HeroSection.jsx
import Link from "next/link"
export default function HeroSection() {
      return (
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
                Manage Your Events
              </h1>
              <p className="text-xl text-accent/80 mb-8 max-w-2xl mx-auto">
                Create, manage, and track your events with our powerful platform.
              </p>
              <Link 
  href="/auth/register" 
  className="bg-slate-900 text-slate-50 px-8 py-3 rounded-md text-lg 
             hover:bg-primary/90 hover:shadow-lg transition-all 
             focus:outline-none focus:ring-2 focus:ring-accent 
             active:bg-primary/80 active:scale-95"
>
  Register
</Link>

            </div>
          </div>
        </section>
      )
    }