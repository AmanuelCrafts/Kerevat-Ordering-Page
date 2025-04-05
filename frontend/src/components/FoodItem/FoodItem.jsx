import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="bg-white border-2 border-gray-400 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:translate-y-[-5px]">
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <img
          src={url + "/images/" + image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {!cartItems[id] ? (
          <img
            className="add absolute bottom-4 right-4 w-10 h-10 cursor-pointer"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter absolute bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-full shadow-md">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
              className="cursor-pointer"
            />
            <p className="font-semibold">{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more to cart"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="food-item-name text-2xl font-bold text-gray-800">
            {name}
          </p>
        </div>
        <p className="food-item-desc text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
        <p className="food-item-price text-xl font-semibold text-green-500">
          {price} Birr
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
