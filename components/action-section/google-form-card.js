"use client"
import React from 'react'
import Button from '../button'
import GoogleButton from '../google-button'
import Input from '../input'

const GoogleFormCard = () => {

  const handleClick = () => {
    console.log('ok')
  }

  return (
    <div className="p-6 flex flex-col rounded-[10px] border-2 gap-[10px] flex-1 min-h-[442px]">
        <h2 className="text-[#00205B] text-2xl font-[600]">Already member?</h2>
        <GoogleButton title={'login with Google'} action={handleClick} />
        <span className='text-center text-[14px] font-[700] leading-7'>OR</span>
        <form className='flex flex-col gap-[10px]'>
          <Input label={'Member id'} placeholder={'Enter member ID'} />
          <Input label={'Password'} placeholder={'Enter member ID'} />
        </form>
        <Button title={'Login'} style={'text-white bg-[#00205B]'} onClick={() => handleClick()} />
      </div>
  )
}

export default GoogleFormCard