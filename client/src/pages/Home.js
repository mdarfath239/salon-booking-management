import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav-logo">GlossBook</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" className="btn-primary">Admin Dashboard</Link>
              ) : (
                <Link to="/my-bookings" className="btn-primary">My Bookings</Link>
              )}
              <button className="nav-login" onClick={handleLogout} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Book smarter.<br />Grow faster.</h1>
          <p>
            The all-in-one platform for modern salons. Curate scheduling and client management handled with editorial grace.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Start free Trial</Link>
            <button className="btn-ghost">Watch Demo <span>▶</span></button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-wrapper">📅</div>
            <h3>Online Booking</h3>
            <p>Let your clients book 24/7 with a seamless, high-end interface that reflects your brand's aesthetic.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper">⏱️</div>
            <h3>Smart Scheduling</h3>
            <p>Optimize your team's time with AI-driven gap filling and automatic reminders to reduce no-shows.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper">👥</div>
            <h3>Client CRM</h3>
            <p>Detailed client profiles, visit history, and preferences to provide a truly personalized service experience.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <span className="trusted-by">TRUSTED BY 2,400+ SALONS</span>
        <h2>The heartbeat of modern wellness</h2>
        
        <div className="testimonial-content">
          <div className="testimonial-card">
            <div className="quote-icon">❞</div>
            <h3>"GlossBook transformed how we present ourselves to clients. It's not just a tool; it's an extension of our salon's luxury brand."</h3>
            <div className="author">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Elena Baya" />
              <div className="author-info">
                <strong>Elena Baya</strong>
                <span>Founder, The Atelier NYC</span>
              </div>
            </div>
          </div>
          <div className="testimonial-image">
            <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" alt="Salon interior" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <h2>Transparent pricing for every stage</h2>
        <div className="pricing-toggle">
          <span>Monthly</span>
          <div className="toggle-switch"></div>
          <span>Annual (Save 20%)</span>
        </div>

        <div className="pricing-grid">
          <div className="price-card">
            <h3>Starter</h3>
            <div className="price">₹999<span>/mo</span></div>
            <ul>
              <li>✔️ 1 Staff Member</li>
              <li>✔️ Unlimited Bookings</li>
              <li>✔️ Basic Reporting</li>
            </ul>
            <Link to="/register" className="btn-outline">Choose Starter</Link>
          </div>

          <div className="price-card pro">
            <div className="recommended-badge">RECOMMENDED</div>
            <h3>Pro</h3>
            <div className="price">₹3,999<span>/mo</span></div>
            <ul>
              <li>✔️ Up to 5 Staff Members</li>
              <li>✔️ Advanced Client CRM</li>
              <li>✔️ Marketing Automations</li>
              <li>✔️ Inventory Management</li>
            </ul>
            <Link to="/register" className="btn-primary">Start free Trial</Link>
          </div>

          <div className="price-card">
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <ul>
              <li>✔️ Unlimited Everything</li>
              <li>✔️ Custom API Access</li>
              <li>✔️ Dedicated Manager</li>
            </ul>
            <Link to="/register" className="btn-outline">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">GlossBook</div>
            <p>Defining the intersection of beauty and business. Our atelier provides the tools for modern artisans to flourish in a digital landscape.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>Links</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="footer-col">
              <h4>Newsletter</h4>
              <p>Stay updated with curated insights for salon success.</p>
              <div className="newsletter">
                <input type="email" placeholder="Email address" />
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>© 2024 GLOSSBOOK ATELIER. ALL RIGHTS RESERVED.</span>
          <div className="social-icons">
            <span>In</span>
            <span>Ig</span>
            <span>Tw</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
