const router = require("express").Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Service = require("../models/Service");
const adminAuth = require("../middleware/adminAuth");
const { sendConfirmationEmail } = require("../utils/sendEmail");

// Create Appointment
router.post("/", async (req, res) => {
  try {
    const { userId, serviceId, date, timeSlot } = req.body;

    const exists = await Appointment.findOne({ date, timeSlot });
    if (exists) {
      return res.status(400).json("Slot already booked");
    }

    const appointment = await Appointment.create({
      userId,
      serviceId,
      date,
      timeSlot
    });

    // Fetch user and service details for email
    const user = await User.findById(userId);
    const service = await Service.findById(serviceId);

    if (user && service && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendConfirmationEmail(
        user.email,
        user.name,
        service.name,
        date,
        timeSlot
      );
    }

    return res.json(appointment);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Get Booked Slots by Date
router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await Appointment.find({ date });
    const bookedSlots = appointments.map(app => app.timeSlot);
    return res.json(bookedSlots);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Get All Appointments (Admin only)
router.get("/all", adminAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("serviceId", "name price")
      .sort({ date: -1, timeSlot: 1 });
    
    return res.json(appointments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Get User Appointments
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === "all") return; // Let the /all route handle it

    const data = await Appointment.find({ userId }).populate("serviceId").sort({ date: 1, timeSlot: 1 });
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
router.put("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    
    if (!appointment) {
      return res.status(404).json("Appointment not found");
    }

    return res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
