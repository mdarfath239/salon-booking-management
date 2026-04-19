import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { formatTime } from "../utils/formatTime";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [newService, setNewService] = useState({ name: "", price: "", duration: "" });
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [appointmentsRes, servicesRes] = await Promise.all([
        api.get("/appointments/all"),
        api.get("/services")
      ]);
      // Ensure the response is an array before setting it to state
      setAppointments(Array.isArray(appointmentsRes.data) ? appointmentsRes.data : []);
      setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
    } catch (error) {
      setMessage(typeof error.response?.data === 'string' ? error.response.data : "Failed to load dashboard data.");
      setAppointments([]);
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/services", newService);
      setServices([...services, res.data]);
      setNewService({ name: "", price: "", duration: "" });
      setMessage("Service added successfully!");
    } catch (error) {
      setMessage("Failed to add service.");
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
      setMessage("Service deleted successfully!");
    } catch (error) {
      setMessage("Failed to delete service.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "status-green";
      case "cancelled": return "status-red";
      case "booked": default: return "status-blue";
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === "paid" ? "status-green" : "status-orange";
  };

  const filteredAppointments = appointments.filter(app => {
    const matchDate = filterDate ? app.date === filterDate : true;
    const matchStatus = filterStatus ? app.status === filterStatus : true;
    return matchDate && matchStatus;
  });

  const totalRevenue = appointments
    .filter(app => app.paymentStatus === "paid")
    .reduce((sum, app) => sum + (app.serviceId?.price || 0), 0);

  if (!user || user.role !== "admin") return <div className="access-denied">Access Denied</div>;

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <Link to="/">Home</Link>
          <button className="btn-link" onClick={handleLogout}>Logout</button>
        </nav>
      </div>

      <div className="admin-content">
        {message && <div className="message-banner">{message}</div>}

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹{totalRevenue}</p>
          </div>
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p className="stat-value">{appointments.length}</p>
          </div>
        </div>

        <div className="admin-section">
          <div className="section-header">
            <h3>Manage Appointments</h3>
            <div className="filters">
              <input 
                type="date" 
                value={filterDate} 
                onChange={(e) => setFilterDate(e.target.value)} 
                className="filter-input"
              />
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="">All Statuses</option>
                <option value="booked">Booked</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <p>Loading data...</p>
          ) : filteredAppointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <div className="appointments-grid">
              {filteredAppointments.map(app => (
                <div key={app._id} className="admin-card">
                  <p><strong>Customer:</strong> {app.userId?.name} ({app.userId?.email})</p>
                  <p><strong>Service:</strong> {app.serviceId?.name} - ₹{app.serviceId?.price}</p>
                  <p><strong>Date & Time:</strong> {app.date} at {formatTime(app.timeSlot)}</p>
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
              ))}
            </div>
          )}
        </div>

        <div className="admin-section">
          <h3>Manage Services</h3>
          <form className="add-service-form" onSubmit={handleAddService}>
            <input 
              type="text" 
              placeholder="Service Name" 
              required
              value={newService.name}
              onChange={e => setNewService({...newService, name: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Price (₹)" 
              required
              value={newService.price}
              onChange={e => setNewService({...newService, price: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Duration (mins)" 
              required
              value={newService.duration}
              onChange={e => setNewService({...newService, duration: e.target.value})}
            />
            <button type="submit" className="btn-add">Add Service</button>
          </form>

          <div className="services-list">
            {services.map(service => (
              <div key={service._id} className="service-item">
                <div>
                  <h4>{service.name}</h4>
                  <p>₹{service.price} - {service.duration} mins</p>
                </div>
                <button className="btn-delete" onClick={() => handleDeleteService(service._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}