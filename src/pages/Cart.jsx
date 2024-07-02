import React, { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import {
  addToCart,
  calculatePrice,
  removeCartItems,
} from "../redux/reducer/cartReducer";

const Cart = () => {
  const { cartItems, subTotal, tax, total, shippingCharges, discount } =
    useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const incrementHandler = (cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId) => {
    dispatch(removeCartItems(productId));
  };

  useEffect(() => {
    if (user) {
      dispatch(calculatePrice());
    }
  }, [cartItems, user, dispatch]);

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {user && (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shopping Cart
            </h2>
          )}

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6 m-4">
                <main className="flex flex-col gap-4">
                  {user ? (
                    cartItems.length > 0 ? (
                      cartItems.map((i, idx) => (
                        <CartItem
                          key={idx}
                          cartItem={i}
                          increment={incrementHandler}
                          decrement={decrementHandler}
                          remove={removeHandler}
                        />
                      ))
                    ) : (
                      <h1>No Items Added</h1>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Please log in to view your cart items
                      </h1>
                      <Link
                        to="/login"
                        className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Log In
                      </Link>
                    </div>
                  )}
                </main>
              </div>
            </div>

            {user && (
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          SubTotal
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {subTotal}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Discount
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          {discount}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          ShippingCharges
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {shippingCharges}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {tax}
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {total}
                      </dd>
                    </dl>
                  </div>
                  {cartItems.length > 0 && (
                    <Link
                      to={"/shipping"}
                      className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Proceed to Checkout
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      or{" "}
                    </span>
                    <Link
                      to={"/"}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <FaArrowRightLong />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
