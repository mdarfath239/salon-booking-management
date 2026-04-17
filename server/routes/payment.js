const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Appointment = require("../models/Appointment");

const getRazorpayConfig = () => {
  const key = process.env.RAZORPAY_KEY;
  const secret = process.env.RAZORPAY_SECRET;

  console.log("Razorpay key loaded:", key ? "yes" : "no");

  if (!key || !secret) {
    return null;
  }

  return {
    key,
    secret
  };
};

// Create Order
router.post("/create-order", async (req, res) => {
  try {
    const razorpayConfig = getRazorpayConfig();
    if (!razorpayConfig) {
      return res.status(500).json({
        message: "Razorpay key is missing. Check RAZORPAY_KEY and RAZORPAY_SECRET in server/.env and restart the server."
      });
    }

    const razorpay = new Razorpay({
      key_id: razorpayConfig.key,
      key_secret: razorpayConfig.secret,
    });

    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Verify Payment
router.post("/verify", async (req, res) => {
  try {
    const razorpayConfig = getRazorpayConfig();
    if (!razorpayConfig) {
      return res.status(500).json({
        message: "Razorpay key is missing. Check RAZORPAY_KEY and RAZORPAY_SECRET in server/.env and restart the server."
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpayConfig.secret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is successful
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { paymentStatus: "paid" },
        { new: true }
      );
      
      return res.status(200).json({ message: "Payment verified successfully", appointment });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
