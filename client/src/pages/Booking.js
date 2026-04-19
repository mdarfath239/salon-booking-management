import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { formatTime } from "../utils/formatTime";
import "./Booking.css";

export default function Booking() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Generated slots (e.g., 10:00 to 17:00 every 30 mins)
  const allSlots = [
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00"
  ];

  // Fetch services on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      toast.error("Please log in before booking an appointment.");
      return;
    }

    // Request notification permission on load
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (error) {
        toast.error(error.response?.data || "Unable to load services.");
      }
    };

    fetchServices();
  }, []);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!date) {
      setBookedSlots([]);
      setTimeSlot(""); // Reset selected time if date changes
      return;
    }

    const fetchBookedSlots = async () => {
      try {
        const res = await api.get(`/appointments/date/${date}`);
        setBookedSlots(res.data);
        setTimeSlot(""); // Reset time slot since new date loaded
      } catch (error) {
        console.error("Error fetching slots", error);
      }
    };

    fetchBookedSlots();
  }, [date]);

  const handleBooking = async () => {
    setMessage("");
    setIsSuccess(false);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?._id) {
      toast.error("User not authenticated.");
      return;
    }
    
    // Validations
    if (!selectedService) {
      toast.warn("Please select a service.");
      return;
    }
    if (!date) {
      toast.warn("Please select a date.");
      return;
    }
    if (!timeSlot) {
      toast.warn("Please select a time slot.");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/appointments", {
        userId: user._id,
        serviceId: selectedService,
        date,
        timeSlot
      });

      setIsSuccess(true);
      toast.success("✅ Your appointment is booked successfully!");

      // Trigger Browser Notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Appointment Confirmed", {
          body: `Your appointment is confirmed for ${date} at ${formatTime(timeSlot)}`,
          icon: "/favicon.ico"
        });
      }
      
      // Refresh booked slots so the newly booked one is disabled
      setBookedSlots([...bookedSlots, timeSlot]);
      setTimeSlot(""); // Clear selected slot
      
      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
      
    } catch (error) {
      setIsSuccess(false);
      toast.error(error.response?.data || "Unable to book appointment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <div className="booking-header">
          <h2>Book Your Appointment</h2>
          <div className="header-links">
            <Link to="/">Home</Link>
            <button className="btn-link" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {message && (
          <div className={`message-banner ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label>Select Service</label>
          <select 
            value={selectedService} 
            onChange={(e) => setSelectedService(e.target.value)}
            className="booking-input"
          >
            <option value="">-- Choose a Service --</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} - ₹{s.price}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)} 
            className="booking-input"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {date && (
          <div className="form-group">
            <label>Available Time Slots</label>
            <div className="slots-grid">
              {allSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = timeSlot === slot;

                return (
                  <button 
                    key={slot} 
                    type="button"
                    onClick={() => !isBooked && setTimeSlot(slot)}
                    disabled={isBooked}
                    className={`slot-btn ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
                  >
                    {formatTime(slot)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button 
          className="btn-book" 
          onClick={handleBooking}
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}
