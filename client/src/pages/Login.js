import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful.");
      navigate("/booking");
    } catch (error) {
      setMessage(error.response?.data || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="AuthPage">
      <header className="AuthTop">
        <div className="AuthBrand">Salon Booking</div>
        <div className="AuthProgress">
          <div className="AuthStep">WELCOME</div>
          <div className="AuthStepTitle">Sign In</div>
        </div>
      </header>

      <main className="AuthMain">
        <section className="AuthCard" aria-label="Login form">
          <h1 className="AuthTitle">Welcome back</h1>
          <p className="AuthSubtitle">Sign in to manage your appointments.</p>

          <form className="AuthForm" onSubmit={handleSubmit}>
            <div className="AuthField">
              <label className="AuthLabel" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
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
              <label className="AuthLabel" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                className="AuthInput"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="AuthButton" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in →"}
            </button>

            {message ? <p className="AuthMessage">{message}</p> : null}
          </form>

          <div className="AuthBottomText">
            New here? <Link to="/register">Create an account</Link>
          </div>
        </section>
      </main>

      <footer className="AuthFooter">
        <div className="AuthFooterRow">
          <div className="AuthFooterLabel">Trusted by</div>
          <div className="AuthFooterValue">Local salons & studios</div>
        </div>
        <div className="AuthFooterRow">
          <div className="AuthFooterLabel">Security</div>
          <div className="AuthFooterValue">Token-based authentication</div>
        </div>
      </footer>
    </div>
  );
}

export default Login;

