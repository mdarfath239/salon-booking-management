const router = require("express").Router();
const Service = require("../models/Service");

// Create Service
router.post("/", async (req, res) => {
  const service = await Service.create(req.body);
  res.json(service);
});

// Get All Services
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

module.exports = router;