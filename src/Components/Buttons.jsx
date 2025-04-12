import React, { useState } from 'react';

const Buttons = () => {
  const [activeTab, setActiveTab] = useState('Main Menu');

  return (
    <>
      <div className="flex md:justify-center items-center sm:justify-start gap-4 px-4">
        <button
          className={`border-2 rounded-[50px] py-[6px] px-4 cursor-pointer font-poppins transition duration-300 ease-in-out text-[13px] font-semibold ${activeTab === 'Main Menu'
              ? 'bg-sky-600 border-sky-600 text-white'
              : 'bg-transparent border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white'
            }`}
          onClick={() => setActiveTab('Main Menu')}
        >
          Main Menu
        </button>
        <button
          className={`border-2 rounded-[50px] py-[6px] px-4 cursor-pointer font-poppins transition duration-300 ease-in-out text-[13px] font-semibold ${activeTab === 'Breakfast'
              ? 'bg-sky-600 border-sky-600 text-white'
              : 'bg-transparent border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white'
            }`}
          onClick={() => setActiveTab('Breakfast')}
        >
          Breakfast
        </button>
      </div>
      <div className={`text-center ${activeTab === 'Breakfast' ? 'block' : 'hidden'}`}>
        <h1 className="text-black font-normal text-[14px]">Timing: 12:00 PM to 07:00 AM</h1>
      </div>
    </>
  );
};

export default Buttons;
