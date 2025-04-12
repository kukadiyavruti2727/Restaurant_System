import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Components/SubcategariesCss.css';

const Categories = ({ onSelectCategory, activeCategory }) => {
    const [categoryNames, setCategoryNames] = useState([]);

    useEffect(() => {
        axios
            .get("https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null")
            .then(response => {
                const categories = JSON.parse(response.data.data).CategoryList.map((x) => x.CategryName);
                setCategoryNames(categories);
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    return (
        <div className="mb-4 w-1/4">
            <div className="ml-2 border border-gray-300 rounded-lg mt-4 bg-white">
                <h3 className="p-4 text-sky-600 font-poppins border-b border-dashed border-gray-300 font-bold text-lg">
                    CATEGORIES
                </h3>
                <ul className="h-[345px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-sky-600 scrollbar-track-sky-600 font-poppins">
                    {categoryNames.map((category, index) => (
                        <li
                            key={index}
                            className={`p-3 cursor-pointer transition-all duration-300 font-poppins text-[16px] 
              ${activeCategory === category ? "bg-sky-600 text-white font-semibold" : "hover:bg-blue-400 hover:text-slate-100"}
              `}
                            onClick={() => onSelectCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
