import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className='mt-4 ml-4 bg-white border-2 border-sky-600 rounded-[10px] z-10 p-1 w-[660px] flex items-center'>
      <input
        type="text"
        placeholder="Search for dishes"      
        className='p-3 w-full rounded-full focus:outline-none font-poppins text-gray-700'
      />
      
      {searchText && (
        <IoClose 
          className='text-[20px] mr-9 text-gray-600 cursor-pointer'  
        />
      )}

      <FaSearch className='text-sky-600 font-bold text-[22px] mr-3' />
    </div>
  );
}

export default Search;
