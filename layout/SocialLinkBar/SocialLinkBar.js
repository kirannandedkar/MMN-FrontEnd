"use client"
import React from 'react'
import SocialLinkItem from '../../components/social-link-item'

const SocialLinkBar = () => {
  return (
    <div className='h-[38px] bg-[#EAEAEA] flex px-[30px] justify-end'>
      <div className='flex gap-[10px] items-center max-w-[1440px'>
        <SocialLinkItem title={'Facebook'} link={'https://facebook.com'} />
        <SocialLinkItem title={'Youtube'} link={'https://youtube.com'} />
        <SocialLinkItem title={'Instagram'} link={'https://instagram.com'} />
      </div>
    </div>
  )
}

export default SocialLinkBar