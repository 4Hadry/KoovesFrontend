import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetCart } from "../redux/reducer/cartReducer";
import { responseToast } from "../utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);
  const {
    shippingInfo,
    cartItems,
    subTotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState(false);

  const [newOrder] = useNewOrderMutation();

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements not properly initialized.");
      return;
    }
    setIsProcessing(true);

    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      subtotal: subTotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id,
    };
    console.log(orderData);
    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error: ", error);
        setIsProcessing(false);
        return toast.error("Error: " + error.message || "Something went wrong");
      }

      console.log("Payment intent status:", paymentIntent.status);

      if (paymentIntent.status === "succeeded") {
        const res = await newOrder(orderData);
        console.log("res" + res);
        dispatch(resetCart());
        console.log("Order placed successfully.");
        responseToast(res, navigate, "/order");
      } else {
        console.error(
          "Unexpected payment intent status:",
          paymentIntent.status
        );
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      toast.error("An error occurred during payment processing.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <form onSubmit={SubmitHandler} className="space-y-6">
          <PaymentElement className="mb-4" />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckOut = () => {
  const location = useLocation();
  const clientSecret = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default CheckOut;
