import React, { useState, useEffect } from 'react';
import Categaries from './Categaries';
import Menuitems from './Menuitems';
import Search from './Search';
import Cart from './Cart';
import '../Components/subcategariesCss.css';

const SubCategaries = () => {
  const [cart, setCart] = useState([]);

// -------localstorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // -----------Save cart to localStorage when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);


  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.ItemName === item.ItemName);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.ItemName === item.ItemName
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };


  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className='w-full bg-slate-100 mt-4 pt-1 flex'>
      <Categaries onSelectCategory={setSelectedCategory} activeCategory={selectedCategory} />
      <div className='bg-slate-100'>
        <Search />
        <Menuitems selectedCategory={selectedCategory} addToCart={addToCart} />
      </div>
      <Cart cart={cart}  setCart={setCart}/>
    </div>
  );
};

export default SubCategaries;
