// src/pages/Messaging.jsx
import "../styles/Messaging.css";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

export default function Messaging() {
  return (
    <>
      <TopNavbar />
      <div className="messaging-page">
        <section className="messaging-hero">
          <div className="overlay" />
          <div className="glow-accent"></div>
          <div className="glow-accent-2"></div>

          <div className="messaging-container">
            <h1>Messaging</h1>
            <p className="subtitle">Connect and chat with students across campuses</p>

            <div className="messaging-layout">
              <div className="messaging-sidebar">
                <div className="conversation active">
                  <h4>John Doe</h4>
                  <p>Last message preview...</p>
                </div>
                <div className="conversation">
                  <h4>CS Study Group</h4>
                  <p>Group chat • 12 members</p>
                </div>
                <div className="conversation">
                  <h4>Maria (Mentor)</h4>
                  <p>Available for career advice</p>
                </div>
              </div>

              <div className="messaging-main">
                <div className="chat-header">
                  <h3>John Doe</h3>
                </div>
                <div className="chat-messages">
                  <p className="placeholder">Select a conversation to start messaging</p>
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Type a message..." />
                  <button className="btn-primary send-btn">Send</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}