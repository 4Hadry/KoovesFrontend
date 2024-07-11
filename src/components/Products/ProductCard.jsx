import React from "react";
import dummy from "../../assets/hero/headphone.png";
import Button from "../../Shared/Button";
import { server } from "../../redux/store";

const ProductCard = ({ productId, name, photo, price, stock, handler }) => {
  return (
    <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={`${server}/${photo}` || dummy}
          alt={name}
          className="h-[180px] lg:w-[300px] md:w-[200] sm:w-[150px] bg-gray-300 sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[260px] object-cover rounded-t-lg"
        />
        {/* Hover Button */}
        <div className="hidden group-hover:flex absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm justify-center items-center transition duration-300">
          <div>
            {/* <Button
              text={"Add to cart"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
            /> */}
            <button
              className="bg-primary text-white p-4 rounded-full"
              onClick={() => {
                const item = {
                  productId,
                  price,
                  name,
                  photo,
                  stock,
                  quantity: 1,
                };
                handler(item);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800 truncate">{name}</h2>
        <div className="flex justify-between items-center mt-2">
          <h2 className="font-bold text-xl text-primary">${price}</h2>
          <span
            className={`text-sm font-medium ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
