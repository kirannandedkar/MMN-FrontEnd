"use client"
import React from 'react'
import DropDown from 'react-dropdown';
import { CommitteeMember } from "@/constants/types"
import MMNContainer from '@/components/MMNContainer';
import MMNTitle from '@/components/MMNTItle';
import TopNav from '@/components/TopNav';

const NavData = [
  { title: "Home", link: "/home" },
  { title: "About us", link: "/aboutus" },
  { title: "Committee Members", link: "#" },
];

const yearList = [
  { value: '2022', label: "2022-2023" },
  { value: '2023', label: "2023-2024" },
  { value: '2024', label: "2024-2025" },
  { value: '2025', label: "2025-2026" },
];

const data = {
  executive: [
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
  ],
  working: [
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
  ]
}

const memberCard = (member: CommitteeMember) => {
  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='w-[211px] h-[211px] bg-[#F0F0F0] rounded-[10px]'>

      </div>

      <div className='text-center line-height-mmn-large font-poppins font-medium'>
        {member.name}
      </div>
    </div>
  )
}

const memberList = (members: CommitteeMember[]) => {
  return (
    <div className='flex gap-[30px] flex-wrap justify-center sm:justify-start'>
      {
        members.map((member, index) => {
          return (
            <div className='flex gap-[30px]' key={index}>
              {memberCard(member)}
            </div>
          )
        })
      }
    </div>
  )
}

const CommitteeMemberPage = () => {
  const exeMemberList = memberList(data.executive);
  const workingMemberList = memberList(data.working);

  return (
    <>
      <TopNav itemList={NavData} />

      <div className="flex flex-col sm:px-[90px] px-5 gap-[30px] pb-[40px] text-size-mmn-medium">
        <MMNTitle title={"Executive committee members"} className={""} color='purple' />
        {exeMemberList}
      </div>

      <div className="flex flex-col sm:px-[90px] px-5 gap-[30px] pb-[40px] text-size-mmn-medium">
        <div className='flex gap-[20px] items-start sm:items-center flex-col sm:flex-row'>
          <MMNTitle title={"Working committee members"} className={""} color='purple' />
            <DropDown options={yearList}
              className='w-fit'
              controlClassName="text-size-mmn-medium font-semibold line-height-mmn-medium text-color-mmn-yellow !rounded-[6px] !pl-[12px] !pr-[32px] bg-[#FFEDEA] !border-none cursor-pointer"
              menuClassName='text-size-mmn-medium font-semibold line-height-mmn-medium border-none '
              arrowClassName='top-[18px] right-[10px]'
              value={'2024'}
              onChange={() => { }}
              placeholder={"Select Year"} />
        </div>

        {workingMemberList}
      </div>
    </>
  )
}

export default CommitteeMemberPage