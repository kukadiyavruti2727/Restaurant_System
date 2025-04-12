import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { CiCircleAlert } from "react-icons/ci";

const Checkout = () => {
    const countryCodes = [
        { code: "+91", name: "India" },
        { code: "+1", name: "USA" },
        { code: "+44", name: "UK" },
        { code: "+213", name: "Algeria" },
        { code: "+1684", name: "American Samoa" },
        { code: "+244", name: "Angola" },
        { code: "+1268", name: "Antigua And Barbuda" },
        { code: "+54", name: "Argentina" },
        { code: "+61", name: "Australia" },
    ];
    const [activeSection, setActiveSection] = useState("contact");
    const [isContactFilled, setIsContactFilled] = useState(false);

    const location = useLocation(); 
    const { cart } = location.state || { cart: [] }; 

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const handleDeleteItem = (index) => {
        setItemToDelete(index);
        setShowDeletePopup(true);
    };

    const confirmDelete = () => {
        setShowDeletePopup(false);
        setItemToDelete(null);
        
    };

    const toggleSection = (section) => {
        if (section !== "contact" && !isContactFilled) return;
        setActiveSection(activeSection === section ? "" : section);
    };

    const handleContactSave = () => {
        setIsContactFilled(true);
        setActiveSection("orderType");
    };
    
    const [showClearCartPopup, setShowClearCartPopup] = useState(false);
    const handleClearCart = () => {
        setShowClearCartPopup(false);
    };

   
   
    return (
        <div className="flex flex-col h-screen bg-white ">
            <Header isCheckout={true} />
            <main className="flex-grow pt-10 p-6 flex  flex-col lg:flex-row w-full max-w-[1000px] rounded-[10px] mx-auto gap-6">
                <div className="w-[900px]  pt-2 border border-gray-300 rounded-md p-4  space-y-5">
                    <div className="bg-white rounded-[8px] mt-3 border border-none ">
                        <button
                            onClick={() => toggleSection("contact")}
                            className={`w-full text-left p-3 font-bold transition duration-200 ${activeSection === "contact" ? "bg-blue-400 text-white" : "bg-blue-600 text-white"}`}
                        >
                            CONTACT
                        </button>
                        {activeSection === "contact" && (
                            <div className="p-4 space-y-3 border-x border-b border-gray-300">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="First Name" className="w-1/2 p-2 text-black border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                                    <input type="text" placeholder="Last Name" className="w-1/2 p-2 border text-black  border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div className="flex gap-3">
                                    <select className="p-[10px] border-2 w-full  border-gray-300 rounded-[4px] focus:outline-none focus:border-sky-500 text-[16px] text-gray-400 font-normal">
                                        {countryCodes.map((country, index) => (
                                            <option key={index} value={country.code}>
                                                {country.code} {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="text" placeholder="Mobile" className=" w-full p-[10px] border-2 border-gray-300 rounded-[4px] focus:outline-none focus:border-sky-500 text-[16px] text-black font-normal" />
                                </div>
                                <input type="email" placeholder="Your Email Address (optional)" className="w-full text-black p-2 outline-none border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="w-6 h-6 outline-none text-black " />
                                    <span className="text-[15px] font-poppins font-light">You Agree To Be Remembered On This Device And To Receive Money-Off Coupons & Exclusive Offers</span>
                                </div>
                                <button onClick={handleContactSave} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Save</button>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-300">
                        <button
                            onClick={() => toggleSection("orderType")}
                            className={`w-full text-left p-3 font-semibold transition duration-200 ${activeSection === "orderType" ? "bg-blue-400 text-white" : "bg-gray-300 text-white"}`}
                        >
                            SELECTED ORDER TYPE: Pick Up (now)
                        </button>
                        {activeSection === "orderType" && (
                            <div className="p-4">
                                <p className="mb-2">Choose your order type:</p>
                                <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                                    <option>Pick Up (now)</option>
                                    <option>Delivery</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-300">
                        <button
                            onClick={() => toggleSection("paymentMode")}
                            className={`w-full text-left p-3 font-semibold transition duration-200 ${activeSection === "paymentMode" ? "bg-blue-400 text-white" : "bg-gray-300 text-white"}`}
                        >
                            SELECT PAYMENT MODE
                        </button>
                        {activeSection === "paymentMode" && (
                            <div className="p-4">
                                <p className="mb-2">Choose your payment method:</p>
                                <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                                    <option>Credit/Debit Card</option>
                                    <option>Cash on Delivery</option>
                                    <option>UPI</option>
                                    <option>Net Banking</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* -----------------Right Section - Cart Summary----------------- */}
                <div className="ml-2 rounded-[18px] w-[350px] h-[415px] mt-0  bg-white  border border-gray-300">
                    <div>
                        <h3 className="pt-3 text-center pb-3 pl-4 text-sky-600  flex justify-between font-poppins  border-b border-dashed border-gray-300 font-bold text-[18px]">
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
                                    <div key={item.id} className="flex justify-between items-center pb-2">
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

                    {cart.length > 0 && (
                        <div className="p-3 border-t border-gray-300  mt-auto">
                            <div className="flex justify-between">
                                <h1 className="text-gray-400 text-[14px] font-poppins font-bold">Item Total:</h1>
                                <div className="text-gray-400 text-[14px] font-poppins font-bold">
                                    Rs. {cart.reduce((total, item) => total + item.Price * item.quantity, 0)}.00
                                </div>
                            </div>
                            <div className="mt-2 mb-2 flex gap-2">
                                <input type="text" placeholder="Coupon Code" className="p-2 border-2 focus:border-sky-600 outline-none font-poppins border-sky-600 rounded-[20px]" />
                                <button className="px-4 py-1 bg-sky-600 rounded-[30px] font-poppins font-semibold text-white">Apply</button>
                            </div>
                            <div className="border-t border-gray-400 mt-1 mx-1" />
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-black font-bold font-poppins text-[18px]">Total:</div>
                                <div className="text-black font-bold font-poppins text-[18px]">
                                    Rs. {cart.reduce((total, item) => total + item.Price * item.quantity, 0)}.00
                                </div>
                            </div>
                            
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
                                <Link to="/">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-sky-600 text-white px-5 py-2 rounded-md hover:bg-sky-500 transition"
                                >
                                    Confirm
                                </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                )}
               
            </main>
            <Footer />
        </div>
    );
};

export default Checkout;
