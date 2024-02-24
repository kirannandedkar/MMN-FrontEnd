import React from 'react'

const Input = ({ label, placeholder }) => {
  return (
    <div className='flex flex-col'>
      <label className='text-[14px] font-[500] leading-7'>{ label }</label>
      <input placeholder={placeholder} className='px-[14px] py-[16px] rounded-md border border-gray-300 mt-[5px]' />
    </div>
  )
}

export default Input