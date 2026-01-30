import "../styles/SignUp.css";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function SignUp() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <TopNavbar />
      <div className="signup-page">
        <section className="signup-hero">
          <div className="overlay" />
          <div className="glow-accent"></div>
          <div className="glow-accent-2"></div>

          <div className="signup-container">
            <h1>Join Campus Connect</h1>
            <p className="subtitle">Verify your student status & join your campus network</p>

            <form className="signup-form">
              {/* Full Name */}
              <input type="text" placeholder="Full Name" className="form-input" required />

              {/* University */}
              <select required className="form-input form-select">
                <option value="">Select Your University</option>
                <option>Hilcoe</option>
                <option>Addis Ababa University</option>
                <option>St. Mary's University</option>
                <option>Unity University</option>
                <option>Other</option>
              </select>

              {/* Student ID + Batch/Year */}
              <div className="signup-row">
                <input type="text" placeholder="Student ID" className="form-input" required />
                <select required className="form-input form-select">
                  <option value="">Batch/Year</option>
                  {Array.from({ length: 21 }, (_, i) => {
                    const year = currentYear - 10 + i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>

              {/* Email */}
              <input type="email" placeholder="Your Email" className="form-input" required />

              {/* Password + Confirm */}
              <div className="signup-row">
                <input type="password" placeholder="Password" className="form-input" required />
                <input type="password" placeholder="Confirm Password" className="form-input" required />
              </div>

              {/* Upload */}
              <div className="upload-box">
                <input type="file" id="id-upload" accept="image/*" />
                <label htmlFor="id-upload" className="upload-label">
                  <div className="upload-content">
                    <span className="upload-icon">↑</span>
                    <p><span className="click-text">Click to upload</span> your student ID image</p>
                  </div>
                </label>
              </div>

              {/* Terms - now centered and clean */}
              <div className="terms-wrapper">
                <label className="signup-checkbox">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I agree to the <a href="#" onClick={(e)=>e.preventDefault()}>Terms of Service</a> and <a href="#" onClick={(e)=>e.preventDefault()}>Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-primary">
                Create Account
              </button>
            </form>

            {/* Login link - centered and styled */}
            <div className="login-link-wrapper">
              <p className="login-link">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}