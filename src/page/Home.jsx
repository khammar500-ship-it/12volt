import React from 'react'
import Navbar from '../Components/Sections/Navbar'
import AddProduct from '../Components/Sections/AddProduce'
import AddCategory from '../Components/Sections/AddCategory'
import ShowCategory from '../Components/Sections/ShowCategory'
import ShowProduce from '../Components/Sections/ShowProduce'
import HeroSection from '../Components/UI/HeroSection'

function Home() {
  return (
    <div>
      <Navbar />
      <div >
        <HeroSection name="الانواع"/>
        <AddCategory />
        <ShowCategory />
      </div>
      <div>
        <HeroSection name="المنتجات" />
        <AddProduct />
        <ShowProduce />
      </div>
    </div>
  )
}

export default Home