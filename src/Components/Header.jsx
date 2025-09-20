import React, { useEffect, useState } from 'react';
import logo from '../assets/Image/Logo.png';
import { IoClose, IoLocationSharp } from 'react-icons/io5';
import { FaArrowLeft, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
import "../Components/SubCategoriesCss.css";
import pickupIcon from "../assets/Image/Popupsvg1.png";
import dineInIcon from "../assets/Image/popupsvg2.png";
import deliveryIcon from "../assets/Image/popupsvg3.png";
import { ImArrowLeft2 } from 'react-icons/im';
import { Link } from 'react-router-dom';

const Header = ({ isCheckout }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showBookNow, setShowBookNow] = useState(false);


    const infoFormSubmitData = () => {
        if (showInfo) {
            alert('your details saved sucessfully !!')
        }
    }

    const isFormValid = () => {
        return selectedDate && selectedTimeSlot && selectedAvailableTime && selectedGuests;
    };

    // -------- pickup
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const dates = ["March 18", "March 19", "March 20"];
    const services = [
        { name: "Pickup", icon: pickupIcon },
        { name: "Dine-In", icon: dineInIcon },
        { name: "Delivery", icon: deliveryIcon },
    ];

    //---------  dine-in
    const tables = [
        ["3", "8", "5", "2", "4"],
        ["30", "15", "10", "01", "11"],
        ["100", "7", "26", "Cashier Tuna", "55"],
        ["666", "9"]
    ];
    const [isOpenTablePopup, setIsOpenTablePopup] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [isOpenOrderPopup, setIsOpenOrderPopup] = useState(false);
    const [isOpenLaterPopup, setIsOpenLaterPopup] = useState(false);
    const [isOpenDateTimePopup, setIsOpenDateTimePopup] = useState(false);


    // -------- delivery
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedRoad, setSelectedRoad] = useState("");
    const [savedAddress, setSavedAddress] = useState(null);
    const [formData, setFormData] = useState({
        houseNo: "",
        buildingName: "",
        area: "",
        landmark: "",
        tag: ""
    });
    const [isSaved, setIsSaved] = useState(false);

    const locations = ["surat", "rajkot", "Aahamdabad", "Mumbai"];
    const roads = ["uadhana", "baroda", "varacha", "kamrej"];

    const handleSave = () => {
        if (!formData.houseNo || !formData.buildingName || !formData.area) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }
        const addressData = {
            location: selectedLocation,
            road: selectedRoad,
            ...formData
        };
        setSavedAddress(addressData);
        setIsOpen(false);
        setIsSaved(true);
    };

    // _____________________________________________________________________________________________________
    //  pop up 3 book now btn
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedAvailableTime, setSelectedAvailableTime] = useState('');
    const [selectedGuests, setSelectedGuests] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        if (selectedDate && selectedTimeSlot) {
            setAvailableTimes(["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM ", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", " 4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"]);
        }
    }, [selectedDate, selectedTimeSlot]);

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

    const [showBookingDetails, setShowBookingDetails] = useState(false);


    return (

        <div id="maindiv" className='mb-4 ' >
            <div className="w-full h-[70px] z-20 shadow-[3px_0_9px_-1px_gray] bg-slate-50 flex items-center">
                {/* -- logo -- */}
                <div className="logo pt-[3px] ml-4">
                    <img src={logo} alt="Logo" className="rounded-lg h-[50px]" />
                </div>
                {/*-- location -- */}
                <div className="location pl-[40px] pr-5 cursor-default pt-0">
                    <h1 className="text-[22px] font-semibold font-poppins">Restaurant Demo India</h1>
                    <div className="flex mt-0 gap-1">
                        <IoLocationSharp className="text-center mt-[2px]" />
                        <h3 className="text-[14px] font-poppins">Surat, Gujarat, India</h3>
                    </div>
                </div>
                {/* -- time -- */}
                <div className="timing w-[400px] text-center pt-0">
                    <h1 className="text-[16px] text-green-700 font-medium font-poppins">Restaurant is Open</h1>
                    <div className="flex gap-2">
                        <h2 className="text-[16px] text-gray-700 font-semibold text-center pl-[80px] font-poppins">Timing 07:00 am - 11:00 pm</h2>
                        <FaInfoCircle className="text-gray-800 text-[20px] mt-[1px] cursor-pointer" onClick={() => setShowInfo(true)} />
                    </div>
                </div>

                <div className={`btn flex gap-3 items-center ${isCheckout ? 'ml-[180px]' : 'ml-[20px]'}`}>
                    {!isCheckout && (
                        <>
                            <button onClick={() => setIsOpen(true)}
                                className="btn bg-slate-50 border rounded-[8px] border-sky-600 font-poppins bg-transparent py-2 px-5 text-sky-600 transition duration-300 ease-in-out hover:bg-sky-600 hover:text-white">
                                Choose Service
                            </button>
                            <button onClick={() => setShowBookNow(true)}
                                className="btn bg-slate-50 border rounded-[10px] border-sky-600 font-[16px] font-poppins bg-transparent py-2 px-5 text-sky-600 transition duration-300 ease-in-out hover:bg-sky-600 hover:text-white">
                                Book Now
                            </button>
                        </>
                    )}

                    <a href="tel:7016997342">
                        <button className="btn bg-slate-50 border rounded-full border-sky-600 font-[16px] bg-transparent font-poppins py-2 px-5 text-sky-600 flex items-center gap-2 transition duration-300 ease-in-out hover:bg-sky-600 hover:text-white">
                            <span className="bg-sky-600 rounded-full p-1 text-white">
                                <FaPhoneAlt />
                            </span>

                            <span>7016997342</span>

                        </button>
                    </a>

                    {isCheckout && (
                        <Link to="/">
                            <button className="btn  bg-slate-50 border rounded-[10px] border-sky-600 font-[16px] font-poppins bg-transparent py-2 px-5 text-sky-600 transition duration-300 ease-in-out hover:bg-sky-600 hover:text-white">
                                Back to Home
                            </button></Link>
                    )}

                </div>
            </div>
            {/* ------------------------ pop up 1 info--------------------- */}

            {showInfo && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg max-w-3xl h-[480px] ">
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 ">
                            <h5 className="text-[22px] font-bold text-center p-3">Restaurant Demo India</h5>
                            <button className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold  text-sky-600 m-2 hover:bg-sky-600 hover:text-white transition duration-300 ease-in-out" onClick={() => setShowInfo(false)}><IoClose />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-4 mb-3">
                            <div className="border border-gray-300 rounded-[5px] p-2 ml-5">
                                <h3 className="text-[18px] font-poppins font-bold text-left mb-2 text-sky-600">Restaurant Address</h3>
                                <p className=" text-[16px] font-poppins">912 B, International Commerce Center, near sation , Surat, Gujarat 3950102, India</p>
                                <h3 className="text-[18px] font-poppins font-bold text-left mb-2 text-sky-600 pt-2">Timing</h3>
                                <table className="text-[16px] font-poppins text-gray-900 w-full">
                                    <tbody>
                                        <tr><td>Mon</td><td>07:00 AM - 11:00 PM</td></tr>
                                        <tr><td>Tue </td><td>07:00 AM - 11:00 PM</td></tr>
                                        <tr><td>Wed </td><td>07:00 AM - 11:00 PM</td></tr>
                                        <tr><td>Thu	</td><td>07:00 AM - 11:00 PM</td></tr>
                                        <tr><td>Fri</td><td>07:00 AM - 11:00 PM</td></tr>
                                        <tr><td>Sat</td><td>07:00 AM - 11:00 PM</td></tr>
                                        <tr><td>Sun</td><td>07:00 AM - 11:00 PM</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="border border-gray-300 rounded-lg p-2 mr-5 ">
                                <h3 className="text-[18px] font-poppins font-bold text-left mb-2 text-sky-600">Contact Us</h3>
                                <form>

                                    <input type="text" placeholder="Enter Your First Name *" className="w-full p-2 border rounded hidden focus:border-sky-600 focus:outline-none mb-2" required />

                                    <input type="text" placeholder="Enter Your Full Name *" className="w-full p-2 border rounded focus:border-sky-600 focus:outline-none mb-2" required />

                                    <input type="email" placeholder="Enter Your E-mail Address *" className="w-full p-2 border rounded focus:border-sky-600 focus:outline-none mb-2" required />

                                    <div className="flex gap-1">
                                        <select className="w-1/2 p-1 border rounded focus:border-sky-600 focus:outline-none overflow-auto h-10 text-gray-500">
                                            {["+91 India", "+93 Afghanistan", "+94 Sri Lanka", "+95 Myanmar", "+1 USA"].map((code, index) => (
                                                <option className='text-gary-300' key={index}>{code}</option>
                                            ))}
                                        </select>
                                        <input type="number" placeholder="Mobile Number" className="w-full p-2 border rounded focus:border-sky-600 focus:outline-none mb-2" required />
                                    </div>
                                    <textarea placeholder="Enter Your Message" className="w-full p-2 border rounded mt-2 focus:border-sky-600 focus:outline-none" rows="3" required></textarea>
                                    <div className="text-center mt-3">
                                        <button className="bg-sky-600 w-full text-white px-4 py-2 rounded-full font-bold" onClick={infoFormSubmitData}>Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------------------------- pop up 2 choose services ------------------------- */}

            {/*---------- pick up -----------*/}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className={`bg-white rounded-2xl shadow-lg w-[480px] ${selectedService ? 'h-auto' : 'h-[220px]'} pt-3 pb-3`}>
                        <div className="flex justify-between items-center border-b pb-2 border-gray-300">
                            {selectedService && (
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="cursor-pointer text-[19px] bg-transparent border ml-4 border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out">
                                    <ImArrowLeft2 />
                                </button>
                            )}
                            <h2 className="text-[20px] font-bold pl-4 text-center">
                                {selectedService || "Choose A Service"}
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="cursor-pointer text-[19px] bg-transparent border mr-4 border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out" >
                                <IoClose />
                            </button>
                        </div>

                        {!selectedService && (
                            <div className="flex justify-around mt-5">
                                {services.map((service) => (
                                    <div key={service.name} onClick={() => setSelectedService(service.name)}
                                        className="flex hover:border-2 hover:border-sky-600 hover:shadow-[0_0_10px_2px_rgba(50,180,230,0.3)] flex-col items-center cursor-pointer transition-all duration-300 p-1 rounded-lg">
                                        <div className='w-[92px] p-1 pt-0 pb-0 transition-all ease-in-out hover:rounded-[15px]'>
                                            <img src={service.icon} className="w-29 h-22" alt={service.name} />
                                        </div>
                                        <span className="mt-2 text-[18px] text-black font-poppins">{service.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* --------- dine-in -------------- */}
                        {isOpenTablePopup && (
                            <div className="p-0 h-[280px]">
                                <h3 className="text-[18px] pl-5 pt-2 font-semibold text-center mb-4">Select Table No</h3>
                                <div className="pl-8 pr-8 pt-4 pb-4 m-2 border border-sky-500 rounded-md">
                                    <div className='grid grid-cols-5 gap-3'>
                                        {tables.flat().map((table, index) => (
                                            <button
                                                key={index}
                                                className={`border border-sky-500 w-[76px] h-[40px] rounded-[4px] text-center hover:bg-sky-500 hover:text-white transition-all ease-in-out text-[16px] ${selectedTable === table ? "bg-sky-500 text-white" : "bg-white"
                                                    }`}
                                                onClick={() => {
                                                    setSelectedTable(table);
                                                    setIsOpenTablePopup(false);
                                                    setIsOpenOrderPopup(true);
                                                }}
                                            >
                                                {table}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {
                            selectedService === "Dine-In" && (
                                <div className="flex flex-col items-center mt-5">
                                    <h3 className="text-[18px] font-poppins font-light">When Would You Like to Order?</h3>
                                    <div className="flex gap-4 mt-4">
                                        <button onClick={() => alert("Ordering Now")}
                                            className="bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 transition-all ease-in-out hover:text-white font-normal px-7 py-1 rounded-[5px]">Now</button>
                                        <button onClick={() => setIsOpen2(true)}
                                            className="bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 transition-all ease-in-out hover:text-white font-normal px-7 py-1 rounded-[5px]">Later</button>
                                    </div>

                                    {isOpen2 && (
                                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                                            <div className="bg-white rounded-2xl shadow-lg w-[480px] pt-3 pb-3">
                                                <div className="flex justify-between items-center border-b pb-2 border-gray-300 px-4">
                                                    <button onClick={() => setIsOpen2(false)}
                                                        className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out">
                                                        <ImArrowLeft2 />
                                                    </button>
                                                    <h5 className="text-[22px] font-bold text-center flex-grow">Dine-in</h5>
                                                    <button onClick={() => setIsOpen(false)}
                                                        className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out">
                                                        <IoClose />
                                                    </button>
                                                </div>
                                                <div className="p-4">
                                                    <h4 className="text-[18px] font-normal mb-4 text-center">Select Order Date & Time</h4>
                                                    <div className="pt-5 p-4 pb-5 flex gap-3 border border-sky-600 rounded-[10px]">
                                                        <div className="w-1/2">
                                                            <h1 className="text-[18px] font-poppins font-normal text-black">Select Date</h1>
                                                            <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                                                value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                                                                <option value="">Select Date</option>
                                                                {dates.map((date, index) => (
                                                                    <option key={index} value={date}>{date}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className='w-1/2'>
                                                            <h1 className="text-[18px] font-poppins font-normal text-black">Select Time</h1>
                                                            <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                                                value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}>
                                                                <option value="">Select Time Slot</option>
                                                                <option value="07:00 AM - 11:00 PM">07:00 AM - 11:00 PM</option>
                                                            </select>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='w-full text-center mt-2 mb-0'>
                                                    <button
                                                        onClick={() => { setIsOpen(false); setIsOpen2(false); setSelectedService(null); }}
                                                        className="bg-white border  border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 transition-all ease-in-out hover:text-white  px-7 py-2 rounded-[5px]">Start Ordering</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            )
                        }
                        {selectedService === "Pickup" && (
                            <div className="flex flex-col items-center mt-5">
                                <h3 className="text-[18px] font-poppins font-light">When Would You Like to Order?</h3>
                                <div className="flex gap-4 mt-4">
                                    <button onClick={() => alert("Ordering Now")}
                                        className="bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 transition-all ease-in-out hover:text-white font-normal px-7 py-1 rounded-[5px]">Now</button>
                                    <button onClick={() => setIsOpen2(true)}
                                        className="bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 transition-all ease-in-out hover:text-white font-normal px-7 py-1 rounded-[5px]">Later</button>
                                </div>

                                {isOpen2 && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                                        <div className="bg-white rounded-2xl shadow-lg w-[480px] pt-3 pb-3">
                                            <div className="flex justify-between items-center border-b pb-2 border-gray-300 px-4">
                                                <button onClick={() => setIsOpen2(false)}
                                                    className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out">
                                                    <ImArrowLeft2 />
                                                </button>
                                                <h5 className="text-[22px] font-bold text-center flex-grow">Pick Up</h5>
                                                <button onClick={() => setIsOpen(false)}
                                                    className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out">
                                                    <IoClose />
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="text-[18px] font-normal mb-4 text-center">Select Order Date & Time</h4>
                                                <div className="pt-5 p-4 pb-5 flex gap-3 border border-sky-600 rounded-[10px]">
                                                    <div className="w-1/2">
                                                        <h1 className="text-[18px] font-poppins font-normal text-black">Select Date</h1>
                                                        <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                                            value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                                                            <option value="">Select Date</option>
                                                            {dates.map((date, index) => (
                                                                <option key={index} value={date}>{date}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <h1 className="text-[18px] font-poppins font-normal text-black">Select Time</h1>
                                                        <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                                            value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}>
                                                            <option value="">Select Time Slot</option>
                                                            <option value="07:00 AM - 11:00 PM">07:00 AM - 11:00 PM</option>
                                                        </select>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='w-full text-center mt-2 mb-0'>
                                                <button
                                                    onClick={() => { setIsOpen(false); setIsOpen2(false); setSelectedService(null); }}
                                                    className="bg-white border  border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 transition-all ease-in-out hover:text-white  px-7 py-2 rounded-[5px]">Start Ordering</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* --- delivery ------ */}
                        {selectedService === "Delivery" && (
                            <div className="flex flex-col items-center mt-5 max-h-auto">
                                <div className="p-4">
                                    <p className='font-normal max-h-[90vh]  overflow-y-auto scroll-smooth tracking-wide pb-2 text-[15px] text-gray-800'>
                                        Select a location on the map, then enter the address manually.
                                    </p>

                                    <div className="relative border-2 border-gray-400 rounded-md mt-2">
                                        <h3 className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-600 font-normal text-left">
                                            Select Delivery Area
                                        </h3>
                                        <iframe title="Google Map" className="w-full h-40 rounded-md"
                                            src="https://maps.google.com/maps?q=your+location&output=embed" allowFullScreen></iframe>
                                    </div>

                                    <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="w-full border p-2 mt-2 rounded-md">
                                        <option value="">Search Location</option>
                                        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>

                                    {selectedLocation && (
                                        <select value={selectedRoad} onChange={(e) => setSelectedRoad(e.target.value)}
                                            className="w-full border p-2 mt-2 rounded-md">
                                            <option value="">Select Road/Area</option>
                                            {roads.map(road => <option key={road} value={road}>{road}</option>)}
                                        </select>
                                    )}

                                    {selectedRoad && (
                                        <>
                                            <input type="text" placeholder="Room No/House No" className="w-full border p-2 mt-2 rounded-md"
                                                value={formData.houseNo}
                                                onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })} />
                                            <input type="text" placeholder="Building Name" className="w-full border p-2 mt-2 rounded-md"
                                                value={formData.buildingName}
                                                onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })} />
                                            <input type="text" placeholder="Area/Locality" className="w-full border p-2 mt-2 rounded-md"
                                                value={formData.area}
                                                onChange={(e) => setFormData({ ...formData, area: e.target.value })} />
                                            <input type="text" placeholder="Landmark" className="w-full border p-2 mt-2 rounded-md"
                                                value={formData.landmark}
                                                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} />
                                        </>
                                    )}

                                    <button className="w-full mt-4 bg-gray-700 text-white py-2 rounded-md"
                                        onClick={handleSave}>Save Address</button>


                                </div>

                                {isOpen2 && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                                        <div className="bg-white rounded-2xl shadow-lg w-[480px] pt-3 pb-3">
                                            <div className="flex justify-between items-center border-b pb-2 border-gray-300 px-4">
                                                <button onClick={() => setIsOpen2(false)}
                                                    className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out">
                                                    <ImArrowLeft2 />
                                                </button>
                                                <h5 className="text-[22px] font-bold text-center flex-grow">Pick Up</h5>
                                                <button onClick={() => setIsOpen(false)}
                                                    className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-[50px] font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out">
                                                    <IoClose />
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="text-[18px] font-normal mb-4 text-center">Select Order Date & Time</h4>
                                                <div className="pt-5 p-4 pb-5 flex gap-3 border border-sky-600 rounded-[10px]">
                                                    <div className="w-1/2">
                                                        <h1 className="text-[18px] font-poppins font-normal text-black">Select Date</h1>
                                                        <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                                            value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                                                            <option value="">Select Date</option>
                                                            {dates.map((date, index) => (
                                                                <option key={index} value={date}>{date}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <h1 className="text-[18px] font-poppins font-normal text-black">Select Time</h1>
                                                        <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                                            value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}>
                                                            <option value="">Select Time Slot</option>
                                                            <option value="07:00 AM - 11:00 PM">07:00 AM - 11:00 PM</option>
                                                        </select>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='w-full text-center mt-2 mb-0'>
                                                <button
                                                    onClick={() => { setIsOpen(false); setIsOpen2(false); setSelectedService(null); }}
                                                    className="bg-white border  border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 transition-all ease-in-out hover:text-white  px-7 py-2 rounded-[5px]">Start Ordering</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* _____________________________ pop up 3 book now ________________________________ */}
            {showBookNow && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg w-[500px] h-[500px] p-0 pt-3 pb-3">
                        {/* Header */}
                        <div className="flex justify-between w-full items-center border-b pb-2 border-gray-300 px-3">
                            <h5 className="text-[22px] font-bold">Book A Table</h5>
                            <button
                                className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[19px] py-[10px] rounded-full font-bold text-sky-600"
                                onClick={() => setShowBookNow(false)}
                            >
                                <IoClose />
                            </button>
                        </div>

                        <div className="mt-4 px-3">
                            <p className="font-poppins text-center  mb-5 text-[18px] font-light"> Select Date & Time</p>
                            <div className="pt-3 p-4 pb-3 flex gap-3 border border-sky-600 rounded-[10px]">
                                <div className="date w-1/2">
                                    <div className="pb-2  w-full">
                                        <h1 className="text-[18px] font-poppins font-normal">Select Date</h1>
                                    </div>
                                    <div>
                                        <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}>
                                            <option value="">Select Date</option>
                                            {dates.map((date, index) => (
                                                <option key={index} value={date}>
                                                    {date}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='time w-1/2'>
                                    <div className="pb-2  w-full">
                                        <h1 className="text-[18px] font-poppins font-normal">Select Time Slot  </h1>
                                    </div>
                                    <select className="border h-[40px] text-[15px] font-poppins rounded w-full text-gray-700 focus:border-sky-600 outline-none"
                                        value={selectedTimeSlot}
                                        onChange={(e) => setSelectedTimeSlot(e.target.value)}>
                                        <option value="">Select Time Slot  </option>
                                        <option value="07:00 AM - 11:00 PM">07:00 AM - 11:00 PM</option>
                                    </select>
                                </div>

                            </div>

                            <div className='main2filed mt-4 '>
                                <p className="font-poppins text-center mb-5 text-[18px] font-light">
                                    Select slots & No. Of Guests
                                </p>
                                <div className="pt-3 p-4 pb-3  flex gap-3  border border-sky-600 rounded-[10px]">
                                    <div className="date w-1/2">
                                        <div className="pb-2  w-full">
                                            <h1 className="text-[18px] font-poppins font-normal">Available Slot</h1>
                                        </div>
                                        <div>
                                            <select className="border h-[40px] text-[15px] font-poppins rounded  w-full text-gray-700 focus:border-sky-600 outline-none" value={selectedAvailableTime}
                                                onChange={(e) => setSelectedAvailableTime(e.target.value)}
                                                disabled={!selectedDate || !selectedTimeSlot}>
                                                <option value="">Select Avalible Time</option>
                                                {availableTimes.map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='time w-1/2'>
                                        <div className="pb-2  w-full">
                                            <h1 className="text-[18px] font-poppins font-normal">No of Guests </h1>
                                        </div>
                                        <select className="border h-[40px] text-[15px] font-poppins rounded  w-full text-gray-700 focus:border-sky-600 outline-none" value={selectedGuests}
                                            onChange={(e) => setSelectedGuests(e.target.value)}
                                        >
                                            <option value="">Select No of Guests </option>
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <button
                                className={`w-full text-white mt-8 p-3 rounded-[30px] font-bold cursor-pointer ${isFormValid() ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                onClick={() => {
                                    if (isFormValid()) {
                                        setShowBookingDetails(true);
                                        setShowBookNow(false);
                                    }
                                }}
                                disabled={!isFormValid()}
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
            {/* ---------------------------- popup 4 is pop up 3 proceed to open */}

            {
                showBookingDetails && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 overflow-y-auto">
                        <div className="bg-white rounded-2xl shadow-lg w-[490px] max-h-[90vh] overflow-y-auto ">
                            {/* Header Section */}
                            <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                                <h5 className="text-[18px] font-bold text-center p-3">Book A Table</h5>
                                <button
                                    className="cursor-pointer text-[19px] bg-transparent border border-sky-600 px-[15px] py-[8px] rounded-[50px] font-bold text-sky-600 m-2 hover:bg-sky-600 hover:text-white transition duration-300 ease-in-out"
                                    onClick={() => setShowBookingDetails(false)}
                                >
                                    <IoClose />
                                </button>
                            </div>

                            <div className="mt-1 space-y-3">
                                <div className="border border-sky-600 rounded-lg flex p-[10px] m-[5px] justify-between">
                                    <span className="text-[16px] text-gray-600 font-normal">Selected Date:</span>
                                    <span className="text-black font-semibold">{selectedDate}</span>
                                </div>

                                <div className="border border-sky-600 rounded-lg flex p-[10px] m-[5px] justify-between">
                                    <span className="text-[16px] text-gray-600 font-normal">Selected Timeslot:</span>
                                    <span className="text-black font-semibold">{selectedTimeSlot}</span>
                                </div>

                                <div className="border border-sky-600 rounded-lg flex p-[10px] m-[5px] justify-between">
                                    <span className="text-[16px] text-gray-600 font-normal">Selected Time:</span>
                                    <span className="text-black font-semibold">{selectedAvailableTime}</span>
                                </div>

                                <div className="border border-sky-600 rounded-lg flex p-[10px] m-[5px] justify-between">
                                    <span className="text-[16px] text-gray-600 font-normal">Selected Guest:</span>
                                    <span className="text-black font-semibold">{selectedGuests}</span>
                                </div>
                            </div>

                            <h3 className="text-center font-normal mt-4 text-[18px] text-black">Enter Personal Details</h3>

                            <div className="mt-3 space-y-3 border border-sky-600 m-2 pl-4 pr-4 pb-2 pt-2 rounded-[8px]">
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="First Name" className="p-[10px] font-poppins border-2 border-sky-600 rounded-[4px] focus:outline-none focus:border-sky-500 text-[16px] text-gray-800 font-normal" />
                                    <input type="text" placeholder="Last Name" className="p-[10px] border-2 border-sky-600 rounded-[4px] focus:outline-none focus:border-sky-500 text-[16px] text-gray-600 font-normal" />
                                </div>

                                <div className="flex gap-3">
                                    <select className="p-[10px] border-2 w-[215px] border-sky-600 rounded-[4px] focus:outline-none focus:border-sky-500 text-[16px] text-gray-600 font-normal">
                                        {countryCodes.map((country, index) => (
                                            <option key={index} value={country.code}>
                                                {country.code} {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="text" placeholder="Mobile" className="p-[10px] border-2 border-sky-600 rounded-[4px] focus:outline-none focus:border-sky-500 text-[16px] text-gray-600 font-normal" />
                                </div>

                                <input type="email" placeholder="Email Address" className="p-[10px] border-2 border-sky-600 rounded-[4px] w-full focus:outline-none focus:border-sky-500 text-[16px] text-gray-600 font-normal" />
                                <textarea placeholder="Any Notes (optional)" className="p-[10px] border-2 border-sky-600 rounded-[4px] w-full focus:outline-none focus:border-sky-500 text-[16px] text-gray-600 font-normal"></textarea>

                                <button className="mt-4 bg-sky-600 text-white w-full p-[10px] text-[16px] rounded-[20px] font-bold transition duration-300">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default Header;
