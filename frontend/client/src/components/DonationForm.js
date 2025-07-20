import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const DonationForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", amount: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/donation/create-order", formData);

      const options = {
        key: "rzp_test_73Og2QB6bRrFB9", // Replace with your Razorpay Key ID
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Alumni Donation Portal",
        description: "Thank you for your generosity!",
        order_id: data.order.id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await axios.post(
            "http://localhost:5000/api/donation/verify-payment",
            paymentData
          );
          alert(result.data.message);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: "#528FF0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Donation Form</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Enter donation amount"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handlePayment}
            >
              Donate
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default DonationForm;
