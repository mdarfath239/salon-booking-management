const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if an admin already exists
    let admin = await User.findOne({ role: "admin" });
    
    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      admin = await User.create({
        name: "Salon Admin",
        email: "admin@salon.com",
        password: hashedPassword,
        role: "admin"
      });
      console.log("Admin user created! Email: admin@salon.com, Password: admin123");
    } else {
      console.log("Admin user already exists! Email:", admin.email);
      // Ensure password is known for testing
      admin.password = await bcrypt.hash("admin123", 10);
      await admin.save();
      console.log("Reset admin password to: admin123");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();