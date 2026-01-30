// src/pages/Events.jsx
import "../styles/Events.css";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

export default function Events() {
  return (
    <>
      <TopNavbar />
      <div className="events-page">
        <section className="events-hero">
          <div className="overlay" />
          <div className="glow-accent"></div>
          <div className="glow-accent-2"></div>

          <div className="events-container">
            <h1>Campus Events</h1>
            <p className="subtitle">Discover events from all connected universities</p>

            <div className="events-grid">
              <div className="event-card">
                <h3>Tech Hackathon 2025</h3>
                <p>Hilcoe School of Computer Science</p>
                <p className="date">January 15–17, 2026</p>
                <button className="btn-primary small">Join Event</button>
              </div>
              <div className="event-card">
                <h3>National Career Fair</h3>
                <p>Addis Ababa University</p>
                <p className="date">February 5, 2026</p>
                <button className="btn-primary small">RSVP</button>
              </div>
              <div className="event-card">
                <h3>Entrepreneurship Workshop</h3>
                <p>St. Mary's University</p>
                <p className="date">December 28, 2025</p>
                <button className="btn-primary small">Register</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}