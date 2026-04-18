const router = require("express").Router();
const Service = require("../models/Service");
const adminAuth = require("../middleware/adminAuth");

// Create Service (Admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json(service);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Delete Service (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;