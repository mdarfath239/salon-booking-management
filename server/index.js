const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const generateSlots = require("./utils/slotGenerator");

const app = express();


const slots = generateSlots(10, 20, 1);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/service"));
app.use("/api/appointments", require("./routes/appointment"));
app.use("/api/payment", require("./routes/payment"));
app.listen(5000, () => console.log("Server running on port 5000"));