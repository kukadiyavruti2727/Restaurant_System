import React, { useState } from "react";
import cartImage from "../assets/Image/cart.png";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {  IoClose } from "react-icons/io5";
import { CiCircleAlert } from "react-icons/ci";

const Cart = ({ cart, setCart }) => {

  const navigate = useNavigate();
  const [showClearCartPopup, setShowClearCartPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleClearCart = () => {
    setCart([]); 
    setShowClearCartPopup(false);
    localStorage.removeItem('cart')
  };

  const handleDeleteItem = (index) => {
    setItemToDelete(index);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    const updatedCart = cart.filter((_, i) => i !== itemToDelete);
    setCart(updatedCart);
    setShowDeletePopup(false);
    setItemToDelete(null);
  };

  const increment = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrement = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };



  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } }); 
  };

  return (
    <div className="mb-4 w-[320px] ml-2 ">
      <div className="ml-2 rounded-[18px] h-[415px] mt-4  bg-white  border border-gray-300">
        <div>
          <h3 className="pt-3 text-center pb-3 pl-4 text-sky-600 border-b flex justify-between font-poppins border-dashed border-gray-300 font-bold text-[18px]">
            Your Cart
            {cart.length > 0 && (
              <button
                onClick={() => setShowClearCartPopup(true)}
                className="text-[13px] flex gap-1 items-center font-semibold bg-transparent px-[10px] py-[8px] mr-2 rounded-[30px] border border-sky-600 text-sky-600 transition-all duration-300 cursor-pointer hover:bg-sky-600 hover:text-white"
              >
                <RiDeleteBin5Fill className="text-[13px]" /> Clear Cart
              </button>
            )}
          </h3>
          {cart.length === 0 ? (
            <div className="text-center p-6">
              <img src={cartImage} alt="Empty Cart" className="w-50 mx-auto p-2" />
              <p className="text-[#999] font-poppins text-[19px] pt-1 font-semibold">
                Your cart is empty! Add some delicious food items and satisfy your cravings.🍽️😋
              </p>
            </div>
          ) : (
            <div className="p-3 space-y-3 max-h-[220px] overflow-y-auto">
              {cart.map((item, index) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div className="w-1/2">
                    <h4 className="font-bold text-black text-[16px] font-poppins pr-4">
                      {item.ItemName}
                    </h4>
                  </div>
                  <div className="w-1/2 flex flex-col items-end">
                    <p className="text-sky-500 font-bold pb-2 pr-2 font-poppins">
                      Rs. {item.Price * item.quantity}.00
                    </p>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-gray-500 border border-gray-400 rounded-full text-center bg-gray-200 size-7"
                      >
                        <RiDeleteBin5Fill size={18} className="m-1" />
                      </button>
                      <div className="flex items-center rounded-[10px] overflow-hidden border">
                        <button
                          onClick={() => decrement(index)}
                          className="px-3 py-2 text-sky-600 font-bold hover:bg-blue-600 transition hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 bg-white text-black font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(index)}
                          className="px-3 py-2 text-sky-600 font-bold hover:bg-blue-600 transition hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

          {/* --------- reduce - opreting - single value return */}
        {cart.length > 0 && (
          <div className="p-3 border-t border-gray-300  mt-auto">
            <div className="flex justify-between">
              <h1 className="text-gray-400 text-[14px] font-poppins font-bold">Item Total:</h1>
              <div className="text-gray-400 text-[14px] font-poppins font-bold">
                Rs. {cart.reduce((total, item) => total + item.Price * item.quantity, 0)}.00
              </div>
            </div>
            <div className="border-t border-gray-400 mt-1 mx-1" />
            <div className="flex justify-between items-center mt-2">
              <div className="text-black font-bold font-poppins text-[18px]">Total:</div>
              <div className="text-black font-bold font-poppins text-[18px]">
                Rs. {cart.reduce((total, item) => total + item.Price * item.quantity, 0)}.00
              </div>
            </div>
            {cart.length > 0 && (
              <button
                onClick={handleCheckout}
                className="bg-sky-600 w-full text-white font-bold text-[16px] rounded-[30px] mt-2 border border-sky-600 p-2"
              >
                PROCEED TO CHECKOUT
              </button>
            )}
          </div>
        )}
      </div>

      {showClearCartPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-[19px] bg-transparent border border-sky-600 px-[15px] py-[8px] rounded-full font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out"
              onClick={() => setShowClearCartPopup(false)}
            >
              <IoClose size={20} />
            </button>

            <div className="flex justify-center mb-4">
              <CiCircleAlert size={65} className="text-[#f8bb86]" />
            </div>

            <p className="text-[20px] font-semibold text-gray-700 text-center font-poppins">
              Are you sure you want to clear your cart?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleClearCart}
                className="bg-sky-600 text-white px-5 py-2 rounded-md hover:bg-sky-500 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------- Delete Item Confirmation Popup ------------------------------------ */}
      {showDeletePopup && itemToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-3 rounded-[10px] shadow-xl w-[330px] relative">
          
            <button
              className="absolute top-2 right-2 text-[19px] bg-transparent border border-sky-600 px-[15px] py-[8px] rounded-full font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out"
              onClick={() => setShowDeletePopup(false)}
            >
              <IoClose size={20} />
            </button>

            <div className="flex justify-center mt-2">
              <CiCircleAlert size={65} className="text-[#f8bb86]" />
            </div>

            <p className="text-[20px] p-2 font-semibold text-gray-700 text-center font-poppins">
              Are you sure you want to remove this item from the cart?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={confirmDelete}
                className="bg-sky-600 text-white px-5 py-2 rounded-md hover:bg-sky-500 transition"
              >
                Confirm
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
