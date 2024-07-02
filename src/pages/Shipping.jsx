import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { cartItems, total } = useSelector((state) => state.cartReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (e) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    // Handle the shipping information submission
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
    // console.log(shippingInfo);
    // Navigate to the next step in the checkout process or handle form submission
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div className="flex flex-col items-center">
      <button
        className="w-10 h-10 bg-black text-white flex items-center justify-center fixed  rounded-full shadow-base focus:outline-none hover:transform hover:translate-x-[-0.25rem] transition-transform"
        onClick={() => navigate("/cart")}
      >
        <BiArrowBack />
      </button>

      <form
        onSubmit={submitHandler}
        className="max-w-md w-full flex flex-col items-center p-8 space-y-8"
      >
        <h1 className="text-2xl font-bold my-8 text-center">
          Shipping Address
        </h1>
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          required
          className="border border-gray-300 p-4 text-lg rounded-md w-full"
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          required
          className="border border-gray-300 p-4 text-lg rounded-md w-full"
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
          required
          className="border border-gray-300 p-4 text-lg rounded-md w-full"
        />
        <select
          name="country"
          value={shippingInfo.country}
          onChange={changeHandler}
          required
          className="border border-gray-300 p-4 text-lg rounded-md w-full"
        >
          <option value="" disabled>
            Choose Country
          </option>
          <option value="pakistan">Pakistan</option>
          <option value="usa">USA</option>
          <option value="england">England</option>
        </select>
        <input
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
          required
          className="border border-gray-300 p-4 text-lg rounded-md w-full"
        />
        <button
          type="submit"
          className="py-4 bg-primary text-white rounded-md text-lg uppercase tracking-wider w-full hover:opacity-80 transition-opacity"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Shipping;
