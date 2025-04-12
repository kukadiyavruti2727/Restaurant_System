import React, { useState } from 'react'
import Header from './Header'
import Buttons from './Buttons'
import SubCategaries from './SubCategaries'
import Footer from './Footer'



const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const onSelectCategory = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
  };
  return (
    <div>
      <Header />
      <Buttons onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} />
      <SubCategaries  selectedCategory={selectedCategory}/>
      <Footer />
    </div>
  )
}

export default Home