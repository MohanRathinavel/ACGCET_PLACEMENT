import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-brand">
          Place<span>Hub</span>
        </div>
        <nav className="navbar-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#process">Process</a>
          <a href="#companies">Companies</a>
          <a href="#contact">Contact</a>
        </nav>
        <Link to="/login" className="btn btn-primary">
          Log in
        </Link>
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </header>

      {/* Hero */}
      <section className="hero">
        <div>
          <span className="hero-eyebrow">College Placement Cell</span>
          <h1>
            Every placement,
            <br />
            tracked in <em>one ledger.</em>
          </h1>
          <p>
            PlaceHub connects students and the placement office in a single
            workspace — companies, applications, interview schedules, and
            results, all in one place instead of scattered spreadsheets.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">
              Register as student
            </Link>
            <Link to="/login" className="btn btn-outline">
              Admin / Student login
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-stat-row">
            <span className="stat-label">Companies onboarded</span>
            <span className="stat-num">120+</span>
          </div>
          <div className="hero-stat-row">
            <span className="stat-label">Students placed</span>
            <span className="stat-num">3,400+</span>
          </div>
          <div className="hero-stat-row">
            <span className="stat-label">Avg. package</span>
            <span className="stat-num">6.8 LPA</span>
          </div>
          <div className="hero-stat-row">
            <span className="stat-label">Interview slots/week</span>
            <span className="stat-num">85</span>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="section-heading">
          <span className="hero-eyebrow">About the platform</span>
          <h2>Built for the placement cell's actual workflow</h2>
          <p>
            Not a generic job board — PlaceHub mirrors how a college
            placement office actually runs a drive, from eligibility checks
            to final offer letters.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <span className="num">01</span>
            <h3>One record per student</h3>
            <p>
              Register number, CGPA, arrears history and resume live in a
              single profile the placement team can verify at a glance.
            </p>
          </div>
          <div className="about-card">
            <span className="num">02</span>
            <h3>Eligibility enforced automatically</h3>
            <p>
              CGPA cutoffs, department requirements and arrear rules are
              checked the moment a student applies — no manual screening.
            </p>
          </div>
          <div className="about-card">
            <span className="num">03</span>
            <h3>Status visible to everyone</h3>
            <p>
              Applied, shortlisted, interview scheduled, selected — students
              and admins see the same status in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="section-heading">
          <span className="hero-eyebrow">Features</span>
          <h2>Everything the drive needs</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h4>Company management</h4>
            <p>Add recruiters with role, package, and eligibility criteria.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h4>Application tracking</h4>
            <p>Every application status updated and visible instantly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗓️</div>
            <h4>Interview scheduling</h4>
            <p>Rounds, venues, and meeting links organized per student.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h4>Notifications</h4>
            <p>Students are notified the moment something changes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h4>Resume uploads</h4>
            <p>Students keep one current resume on file for recruiters.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Placement results</h4>
            <p>Final packages and roles recorded for cell-wide reporting.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h4>Role-based access</h4>
            <p>Admins and students each see only what's relevant to them.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h4>AI add-ons (coming soon)</h4>
            <p>Resume analysis and skill-gap detection, in progress.</p>
          </div>
        </div>
      </section>

      {/* Placement process */}
      <section id="process">
        <div className="section-heading">
          <span className="hero-eyebrow">Placement process</span>
          <h2>How a drive moves through PlaceHub</h2>
        </div>
        <div className="process-track">
          <div className="process-step">
            <div className="step-num">1</div>
            <h4>Company posted</h4>
            <p>Admin adds the role, package and eligibility criteria.</p>
          </div>
          <div className="process-step">
            <div className="step-num">2</div>
            <h4>Student applies</h4>
            <p>Eligible students apply directly from their dashboard.</p>
          </div>
          <div className="process-step">
            <div className="step-num">3</div>
            <h4>Shortlisting</h4>
            <p>Admin reviews applications and updates status.</p>
          </div>
          <div className="process-step">
            <div className="step-num">4</div>
            <h4>Interview scheduled</h4>
            <p>Round, date and venue or meeting link are set.</p>
          </div>
          <div className="process-step">
            <div className="step-num">5</div>
            <h4>Result recorded</h4>
            <p>Selected students and packages logged for the cell.</p>
          </div>
        </div>
      </section>

      {/* Companies preview */}
      <section id="companies">
        <div className="section-heading">
          <span className="hero-eyebrow">Companies preview</span>
          <h2>Recruiters who've run drives through PlaceHub</h2>
        </div>
        <div className="companies-row">
          <span className="company-chip">TCS</span>
          <span className="company-chip">Infosys</span>
          <span className="company-chip">Wipro</span>
          <span className="company-chip">Cognizant</span>
          <span className="company-chip">Zoho</span>
          <span className="company-chip">Accenture</span>
          <span className="company-chip">Capgemini</span>
          <span className="company-chip">HCLTech</span>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="contact-section">
          <div>
            <h2>Questions about your drive?</h2>
            <p>
              Reach the placement cell directly — for credential issues,
              company onboarding, or technical support with the platform.
            </p>
            <div className="contact-info-item">
              <span className="label">Email</span>
              <p>placement.cell@college.edu</p>
            </div>
            <div className="contact-info-item">
              <span className="label">Phone</span>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-info-item">
              <span className="label">Office hours</span>
              <p>Mon – Fri, 9:30 AM – 5:00 PM</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" rows={4} required></textarea>
            <button type="submit" className="btn btn-primary">
              Send message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} PlaceHub — College Placement Cell</p>
        <div className="footer-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Student Signup</Link>
        </div>
      </footer>
    </div>
  );
}
