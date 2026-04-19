import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { formatTime } from "../utils/formatTime";
import "./MyAppointments.css";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await api.get(`/appointments/${user._id}`);
        setAppointments(res.data);
      } catch (error) {
        setMessage(error.response?.data || "Unable to load appointments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleCancel = async (id) => {
    try {
      await api.put(`/appointments/cancel/${id}`);
      setMessage("Appointment cancelled successfully.");
      setIsSuccess(true);
      // Update state to remove the cancelled appointment completely
      setAppointments(appointments.filter(app => app._id !== id));
    } catch (error) {
      setMessage(error.response?.data || "Failed to cancel appointment.");
      setIsSuccess(false);
    }
  };

  const handlePayment = async (appointment) => {
    setProcessingPayment(true);
    try {
      // 1. Create order
      const amount = appointment.serviceId?.price || 0;
      if (!amount) throw new Error("Invalid service price");

      const { data: order } = await api.post("/payment/create-order", { amount });

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_SeXBmrYDEBz1Py",
        amount: order.amount,
        currency: order.currency,
        name: "Salon Booking App",
        description: `Payment for ${appointment.serviceId?.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment
            const verifyRes = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId: appointment._id
            });

            setMessage(verifyRes.data.message || "Payment Successful!");
            setIsSuccess(true);
            fetchAppointments(); // Refresh list to show paid status
          } catch (error) {
            setMessage(error.response?.data?.message || "Payment verification failed.");
            setIsSuccess(false);
          }
        },
        prefill: {
          name: user.name || "Customer",
          email: user.email || "customer@example.com",
        },
        theme: {
          color: "#007bff"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setMessage(response.error.description || "Payment failed.");
        setIsSuccess(false);
      });
      rzp.open();
    } catch (error) {
      setMessage(error.response?.data || error.message || "Failed to initiate payment.");
      setIsSuccess(false);
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "status-green";
      case "cancelled":
        return "status-red";
      case "booked":
      default:
        return "status-blue";
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === "paid" ? "status-green" : "status-orange";
  };

  return (
    <div className="my-appointments-container">
      <div className="my-appointments-card">
        <div className="header">
          <h2>My Appointments</h2>
          <div className="header-links">
            <Link to="/">Home</Link>
            <Link to="/booking">Book Now</Link>
            <button className="btn-link" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {message && (
          <div className={`message-banner ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        {isLoading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>You have no appointments yet.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((app) => (
              <div key={app._id} className="appointment-card">
                  <div className="appointment-details">
                    <h3>{app.serviceId?.name || "Unknown Service"}</h3>
                    <p><strong>Date:</strong> {app.date}</p>
                    <p><strong>Time:</strong> {formatTime(app.timeSlot)}</p>
                    <p><strong>Price:</strong> ₹{app.serviceId?.price || 0}</p>
                    <p>
                    <strong>Status: </strong>
                    <span className={`status-badge ${getStatusColor(app.status)}`}>
                      {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Booked"}
                    </span>
                  </p>
                  <p>
                    <strong>Payment: </strong>
                    <span className={`status-badge ${getPaymentStatusColor(app.paymentStatus)}`}>
                      {app.paymentStatus ? app.paymentStatus.charAt(0).toUpperCase() + app.paymentStatus.slice(1) : "Pending"}
                    </span>
                  </p>
                </div>
                <div className="appointment-actions">
                  {(!app.status || app.status === "booked") && (
                    <button 
                      className="btn-cancel"
                      onClick={() => handleCancel(app._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                  {(!app.paymentStatus || app.paymentStatus === "pending") && app.status !== "cancelled" && (
                    <button 
                      className="btn-pay"
                      onClick={() => handlePayment(app)}
                      disabled={processingPayment}
                    >
                      {processingPayment ? "Processing..." : "Pay Now"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
