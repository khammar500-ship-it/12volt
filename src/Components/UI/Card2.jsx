import React from 'react'

function Card2({ description, photo, created_at }) {
  return (
    <div className=' border-b  border-amber-300 mx-2 p-5 flex justify-between items-center max-sm:flex-col min-w-60 max-sm:gap-6'>
      <div className='flex flex-col justify-center items-center gap-5'>
        <img className='h-35 w-35 rounded-2xl' src={photo} alt="" />
        <div>{created_at}</div>
      </div>
      <div className='text-gray-500 max-w-190 text-center max-lg:max-w-135 max-md:max-w-100'>
        {description} لدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسيةلدي عطل في منظومة الطاقة الشمسية
      </div>

    </div>
  )
}

export default Card2