"use client"
import React from 'react'
import Button from '../button'

const VolunteerCard = () => {

  const handleClick = () => {
    console.log('ok')
  }

  return (
    <div className="p-6 flex flex-col rounded-[10px] border-2 gap-[14px] flex-1 min-h-[442px]">
        <h2 className="text-[#00205B] text-2xl font-[600]">Become volunteer</h2>
        <p className="leading-7 text-[14px] font-[500]">
          MMN is an organisation for members, by members - run on support of our
          volunteer members. If you have the skill and time to offer for MMS
          community's benefit, we need you !
        </p>
        <Button title={'Become a volunteer'} style={'text-white bg-[#00205B]'} onClick={() => handleClick()} />
      </div>
  )
}

export default VolunteerCard