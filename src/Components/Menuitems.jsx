import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "../Components/SubCategoriesCss.css";

const Menuitems = ({ selectedCategory, addToCart }) => {
  const [allMenuItems, setAllMenuItems] = useState([]);

  const [menuItems, setMenuItems] = useState([]);
  const itemRefs = useRef({});

  const [selectedItem, setSelectedItem] = useState(null);
  const handleAddClick = (item) => {
    setSelectedItem(item);
  };

  const confirmAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem);
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    axios.get("https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null")
      .then(response => {
        const data = JSON.parse(response.data.data).CategoryList;
        let allItems = [];

        data.forEach(category => {
          if (category.ItemListWidget) {
            allItems = [...allItems, ...category.ItemListWidget.map(item => ({ ...item, category: category.CategryName }))];
          }
        });

        setAllMenuItems(allItems);
      })
      .catch(error => console.error("Error fetching menu items:", error));
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setMenuItems(allMenuItems);
      return;
    }

    const categoryItems = allMenuItems.filter(item =>
      item.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
    );

    setMenuItems(categoryItems);

    if (categoryItems.length > 0) {
      setTimeout(() => {
        itemRefs.current[categoryItems[0].ItemName]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedCategory, allMenuItems]);



  return (
    <div className='flex justify-center items-center'>
      <div>
        <div className='bg-white ml-4 border-x border-t border-gray-300 rounded-t-[14px] w-[660px] mt-4 p-0'>

          <div className='border-b border-dashed border-gray-300 pb-4'>
            <h2 className='text-black font-bold text-[20px] font-poppins pt-5 pl-5'>
              {selectedCategory || "All items"}
            </h2>
            <p className='text-[12px] text-gray-700 font-bold font-poppins pt-1 pl-5'>
              {menuItems.length} items
            </p>
          </div>

          <div className="menu menu-items h-[260px] overflow-y-auto scrollbar-none">
            {menuItems.map((item, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[item.ItemName] = el}
                className="menu-item flex items-center gap-4 p-2 border-b border-gray-200"
              >
                <div className='p-5 flex-1'>
                  <h3 className="font-semibold text-gray-700 text-[18px] font-poppins">{item.ItemName}</h3>
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-[14px] text-gray-400 font-poppins font-semibold">
                    {item.Description || ""}
                  </p>
                  <span className="text-sky-600 font-poppins font-bold pt-2">Rs. {item.Price}</span>
                </div>

                {item.ItemImage && (
                  <img
                    src={`https://www.foodchow.com/FoodItemImages/${item.ItemImage}`}
                    className="w-[130px] h-[130px] rounded-[10px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    alt={item.ItemName}
                  />
                )}

                <div className="ml-auto mr-9">
                  <button onClick={() => handleAddClick(item)}
                    className="border rounded-full py-2 px-4 cursor-pointer font-poppins transition duration-300 ease-in-out text-[13px] font-medium border-sky-600 bg-transparent text-sky-600 hover:bg-sky-600 hover:text-white">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ------------------------- popup ------------------------- */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-2 rounded-lg shadow-lg w-[500px]  max-h-[90vh] overflow-y-auto">
           
            <div className="border-b pb-2 flex justify-between items-center">
              <div>
              
                <h2 className="text-xl font-bold">{selectedItem?.ItemName || "No Item"}</h2>
                <h2 className="text-gray-400 text-lg mt-0">Rs. {selectedItem?.Price || "0.00"}</h2>
              </div>
              <button
                className="text-[19px] bg-transparent border border-sky-600 px-4 py-1 rounded-full font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
            </div>

            {selectedItem?.ItemImage ? (
              <img
                src={`https://www.foodchow.com/FoodItemImages/${selectedItem.ItemImage}`}
                className="w-full h-[204px] mx-auto my-3 rounded-[11px] object-cover"
                alt={selectedItem?.ItemName}
              />
            ) : (
              <div className="w-full h-[200px] hidden mx-auto my-3 bg-gray-200  items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            <p className=" mx-3 text-base leading-6 text-gray-500 font-semibold text-[22px] m-0 text-center my-3">{selectedItem?.Description || "No description available."}</p>

            <div className="w-40 mx-auto h-[35px] rounded-[14px] border border-gray-300 flex items-center justify-between bg-white">
              <button className="bg-transparent h-[35px] text-black hover:bg-blue-600 hover:text-white transition-all ease-out rounded-l-[14px] px-4 py-0 text-[20px] border-r border-gray-300 font-bold">
                -
              </button>
              <span className="font-bold text-lg">1</span>
              <button className="bg-transparent h-[35px] text-black hover:bg-blue-600 hover:text-white rounded-r-[14px] transition-all ease-out px-4 py-0 text-[20px] border-l border-gray-300 font-bold">
                +
              </button>
            </div>

            <div className="mt-2 text-left px-0">
              <div className="flex gap-2">
                <p className="font-medium text-gray-900 text-[17px] font-poppins">How Spicy?</p>
                <h1 className='text-gray-600'>(select any 1)</h1>
              </div>
              <label className=" flex items-center gap-2">
                <input type="radio" name="spicy" className="accent-sky-600 text-gary-700 text-[18px] font-poppins" /> Regular
              </label>
              <label className=" flex items-center gap-2">
                <input type="radio" name="spicy" className="accent-sky-600 text-gary-700 text-[18px] font-poppins" /> Medium
              </label>
            </div>


            <div className="w-full py-2">
              <label className='text-gray-900 text-[18px] font-poppins font-semibold mb-2'>Special Instructions</label>
              <textarea
                className="w-full h-24 px-4 py-2 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:border focus:ring-sky-600 focus:border-blue-500 placeholder-gray-500 text-gray-700  placeholder-font-poppins"
                placeholder="Any suggestions for us? We will keep it in mind."
              ></textarea>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddToCart}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div >
  );
};

export default Menuitems;
