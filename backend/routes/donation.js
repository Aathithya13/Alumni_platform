const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Donation = require("../models/Donation");

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_73Og2QB6bRrFB9", 
  key_secret: "Q4Cj1Fcp8DNd6V7D66GJqyoj", 
});

// Create order
router.post("/create-order", async (req, res) => {
  const { amount, name, email } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const donation = new Donation({
      name,
      email,
      amount,
      razorpayOrderId: order.id,
    });

    await donation.save();

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Verify payment
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", "Q4Cj1Fcp8DNd6V7D66GJqyoj") // Replace with your Razorpay Key Secret
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await Donation.updateOne(
      { razorpayOrderId: razorpay_order_id },
      { razorpayPaymentId: razorpay_payment_id, status: "Paid" }
    );

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});


router.get("/get-all-transactions", async (req, res) => {
  try {
    const donations = await Donation.find(); // Fetch all donations from the database
    res.status(200).json({ success: true, donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;
