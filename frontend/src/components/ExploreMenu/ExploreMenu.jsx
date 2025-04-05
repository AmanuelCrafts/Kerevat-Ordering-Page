import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="py-6 px-2 md:px-6" id="explore-menu">
      <h2 className="mb-6 uppercase font-semibold">Explore our menu</h2>
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="cursor-pointer text-center transform hover:scale-105 transition duration-300"
            >
              <img
                className={`mx-auto mb-2 rounded-2xl w-[100px] h-[100px] object-cover ${
                  category === item.menu_name ? "border-5 border-[#912821]" : ""
                }`}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p
                className={`text-lg font-medium ${
                  category === item.menu_name
                    ? "text-[#912821]"
                    : "text-gray-700"
                }`}
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="mt-6 border-t-2 border-gray-200" />
    </div>
  );
};

export default ExploreMenu;
