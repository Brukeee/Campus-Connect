import "../styles/Contact.css";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <TopNavbar />
      <div className="contact-page">
        <section className="contact-hero">
          <div className="overlay" />
          <div className="glow-accent"></div>
          <div className="glow-accent-2"></div>

          <div className="contact-container">
            <h1>Get in Touch</h1>
            <p className="subtitle">We'd love to hear from you!</p>

            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="6" required></textarea>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>

            <div className="contact-info">
              <p>📧 support@campusconnect.app</p>
              <p>🌍 Instagram: @campusconnect</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}