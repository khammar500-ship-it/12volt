import React from 'react'
import Navbar from '../Components/Sections/Navbar'
import ShowCustomer from '../Components/Sections/ShowCustmer'
import HeroSection from '../Components/UI/HeroSection'

function Customer() {
  return (
    <div>
        <Navbar/>
        <HeroSection name=" الذبائن "/>
        <ShowCustomer/>
    </div>
  )
}

export default Customer