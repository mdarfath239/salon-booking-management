import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await api.post("/auth/register", formData);
      setMessage("Registration successful. You can log in now.");
      setFormData({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="AuthPage">
      <header className="AuthTop">
        <div className="AuthBrand">Salon Booking</div>
        <div className="AuthProgress">
          <div className="AuthStep">STEP 1 OF 2</div>
          <div className="AuthStepTitle">Profile Creation</div>
        </div>
      </header>

      <main className="AuthMain">
        <section className="AuthCard" aria-label="Registration form">
          <h1 className="AuthTitle">Create your account</h1>
          <p className="AuthSubtitle">Start by telling us a bit about yourself.</p>

          <form className="AuthForm" onSubmit={handleSubmit}>
            <div className="AuthField">
              <label className="AuthLabel" htmlFor="register-name">
                Full name
              </label>
              <input
                id="register-name"
                className="AuthInput"
                name="name"
                type="text"
                placeholder="e.g. Juliane Moore"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="AuthField">
              <label className="AuthLabel" htmlFor="register-email">
                Email address
              </label>
              <input
                id="register-email"
                className="AuthInput"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="AuthField">
              <label className="AuthLabel" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                className="AuthInput"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="AuthButton" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Next →"}
            </button>

            {message ? <p className="AuthMessage">{message}</p> : null}
          </form>

          <div className="AuthBottomText">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </section>
      </main>

      <footer className="AuthFooter">
        <div className="AuthFooterRow">
          <div className="AuthFooterLabel">Privacy</div>
          <div className="AuthFooterValue">We only use your data for booking.</div>
        </div>
        <div className="AuthFooterRow">
          <div className="AuthFooterLabel">Support</div>
          <div className="AuthFooterValue">Contact us anytime.</div>
        </div>
      </footer>
    </div>
  );
}

export default Register;
