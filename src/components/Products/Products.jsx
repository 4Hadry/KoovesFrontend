import React from "react";
import toast from "react-hot-toast";
import Heading from "../../Shared/Heading";
import ProductCard from "./ProductCard";

import { useDispatch } from "react-redux";
import { Skeleton } from "../../pages/Loader";
import { useLatestProductsQuery } from "../../redux/api/productApi";
import { addToCart } from "../../redux/reducer/cartReducer";

const Products = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem) => {
    // console.log("Handler called with:", cartItem);
    if (cartItem.stock < 1) {
      return toast.error("Out of Stock");
    }
    // console.log("Dispatching action with item:", cartItem);
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");

    dispatch(addToCart(cartItem));
  };
  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <div>
      <div className="container">
        {/* Header Section  */}
        <Heading title="Latest Products" subtitle="Explore Our Products" />
        {/* Body Section  */}
        <div className="mb-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  photo={i.photo}
                  handler={addToCartHandler}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
