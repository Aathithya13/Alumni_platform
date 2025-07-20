const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
