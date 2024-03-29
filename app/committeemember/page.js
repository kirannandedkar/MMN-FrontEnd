"use client"
import React from 'react'
import TopNav from './topnav'
import Container from '../../components/container'
import MMNTitle1 from '../../components/title1'
import DropDown from 'react-dropdown';

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

const memberCard = (member) => {
  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='w-[211px] h-[211px] bg-[#F0F0F0] rounded-[10px]'>

      </div>

      <div className='text-center leading-[28px] font-poppins font-medium'>
        {member.name}
      </div>
    </div>
  )
}

const memberList = (members) => {
  return (
    <div className='flex gap-[30px] flex-wrap'>
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
      <Container>
        <div className="flex flex-col sm:px-[90px] px-5">
          <TopNav />
        </div>
      </Container>

      <Container>
        <div className="flex flex-col sm:px-[90px] px-5 gap-[30px] pb-[40px]">
          <MMNTitle1 title={"Executive committee members"} className={""} />
          {exeMemberList}
        </div>
      </Container>

      <Container>
        <div className="flex flex-col sm:px-[90px] px-5 gap-[30px] pb-[40px]">
          <div className='flex gap-[20px] items-center'>
            <MMNTitle1 title={"Working committee members"} className={""} />

            <DropDown options={yearList}
              controlClassName="text-[16px] font-semibold leading-[24px] text-[#FF5733] !rounded-[6px] !pl-[12px] !pr-[32px] bg-[#FFEDEA] !border-none cursor-pointer"
              menuClassName='text-[16px] font-semibold leading-[24px] border-none '
              arrowClassName='top-[18px] right-[10px]'
              value={'2024'}
              onChange={() => {}}
              placeholder={"Select Year"} />

          </div>

          {workingMemberList}
        </div>
      </Container>
    </>
  )
}

export default CommitteeMemberPage