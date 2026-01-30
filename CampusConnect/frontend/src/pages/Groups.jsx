// src/pages/Groups.jsx
import "../styles/Groups.css";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

export default function Groups() {
  return (
    <>
      <TopNavbar />
      <div className="groups-page">
        <section className="groups-hero">
          <div className="overlay" />
          <div className="glow-accent"></div>
          <div className="glow-accent-2"></div>

          <div className="groups-container">
            <h1>Student Groups</h1>
            <p className="subtitle">Join study groups, clubs, and communities across campuses</p>

            <div className="groups-grid">
              <div className="group-card">
                <h3>CS Study Group 2025</h3>
                <p>Hilcoe • 312 members</p>
                <p className="desc">Share notes, past exams, and prepare together</p>
                <button className="btn-primary small">Join Group</button>
              </div>
              <div className="group-card">
                <h3>Entrepreneurship Club</h3>
                <p>Addis Ababa University • 198 members</p>
                <p className="desc">Pitch ideas, network, startup discussions</p>
                <button className="btn-primary small">Join Group</button>
              </div>
              <div className="group-card">
                <h3>Graphic Design Community</h3>
                <p>St. Mary's University • 156 members</p>
                <p className="desc">Share designs, feedback, tutorials</p>
                <button className="btn-primary small">Join Group</button>
              </div>
              <div className="group-card">
                <h3>Football Lovers</h3>
                <p>Unity University • 420 members</p>
                <p className="desc">Match discussions, organize games</p>
                <button className="btn-primary small">Join Group</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}