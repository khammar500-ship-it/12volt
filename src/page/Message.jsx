import React from 'react'
import Navbar from '../Components/Sections/Navbar'
import ShowOrder from '../Components/Sections/ShowOrder'
import HeroSection from '../Components/UI/HeroSection'

function Message() {
  return (
    <div>
        <Navbar/>
        <HeroSection name=" الطلبات "/>
        <ShowOrder/>
    </div>
  )
}

export default Message