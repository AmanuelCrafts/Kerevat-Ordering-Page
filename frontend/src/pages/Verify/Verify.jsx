import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  // Get raw search string
  const rawSearch = location.search;
  const params = new URLSearchParams(rawSearch.replace(/&amp;/g, "&"));

  const success = params.get("success");
  const orderId = params.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        });

        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        navigate("/");
      }
    };

    if (orderId) {
      verifyPayment();
    }
  }, [orderId, success, url, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
