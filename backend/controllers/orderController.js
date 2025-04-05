import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CALLBACK_URL = "https://kerevat-frontend.onrender.com/verify";

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare Chapa Payment Request
    const paymentData = {
      amount: req.body.amount + 2, // Including delivery charge
      currency: "ETB", // Change based on supported currencies
      email: req.body.email, // User email
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      tx_ref: `order_${newOrder._id}`,
      callback_url: `${CALLBACK_URL}?orderId=${newOrder._id}`,
      return_url: `${CALLBACK_URL}?success=true&orderId=${newOrder._id}`,
      cancel_url: `${CALLBACK_URL}?success=false&orderId=${newOrder._id}`,
    };

    // Send request to Chapa API
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      res.json({ success: true, session_url: response.data.data.checkout_url });
    } else {
      res.json({ success: false, message: "Payment initialization failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      // Verify payment from Chapa
      const response = await axios.get(
        `https://api.chapa.co/v1/transaction/verify/order_${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          },
        }
      );

      if (response.data.status === "success") {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        res.json({ success: true, message: "Paid" });
      } else {
        res.json({ success: false, message: "Payment verification failed" });
      }
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// user order for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// list orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
