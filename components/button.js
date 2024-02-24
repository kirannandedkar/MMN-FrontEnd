import React from 'react'

const Button = ({title, onClick, style}) => {
  return (
    <button className={`px-[20px] py-[13px] text-[16px] font-500 font-poppins rounded-lg sm:w-fit self-end ${style}`} onClick={onClick}>
      {title}
    </button>
  )
}

export default Button