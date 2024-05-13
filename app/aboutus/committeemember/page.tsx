"use client"
import React, { useState } from 'react'
import DropDown from 'react-dropdown';
import { CommitteeMember } from "@/constants/types"
import MMNContainer from '@/components/MMNContainer';
import MMNTitle from '@/components/MMNTItle';
import TopNav from '@/components/TopNav';
import LinesEllipsis from 'react-lines-ellipsis'
import Image from "next/image";
import { Urls } from '@/constants';

const NavData = [
  { title: "Home", link: "/home" },
  { title: "About us", link: "/aboutus" },
  { title: "Committee Members", link: "#" },
];

const yearList = [
  { value: '2020', label: "2020-2022" },
  { value: '2018', label: "2018-2020" },
];

const data = {
  executive: [
    { name: "Member name , Member name, Member name, Member name,Member name, Member name, Member name", imageurl: "/image/members/executive/member1.jpg" },
    { name: "Member name", imageurl: "/image/members/executive/member2.jpg" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
    { name: "Member name", imageurl: "" },
  ],
  working: [
    { name: "Member name 1", imageurl: "", period: { begin: 2018, end: 2020 } },
    { name: "Member name 2", imageurl: "", period: { begin: 2019, end: 2021 } },
    { name: "Member name 6", imageurl: "", period: { begin: 2018, end: 2019 } },
    { name: "Member name 4", imageurl: "", period: { begin: 2018, end: 0 } },
    { name: "Member name 8", imageurl: "", period: { begin: 2021, end: 0 } },
    { name: "Member name 7", imageurl: "", period: { begin: 2021, end: 2022 } },
    { name: "Member name 3", imageurl: "", period: { begin: 2018, end: 0 } },
  ]
}

const memberCard = (member: CommitteeMember) => {
  let title = member.name;

  if (member.period) {
    // title += `\n(${member.period.begin} - ${member.period.end <= 0 ? 'Now' : member.period.end})`
  }

  return (
    <div className='flex flex-col gap-[10px] cursor-pointer'>
      <div className='w-[211px] h-[211px] bg-[#F0F0F0] rounded-[10px] flex justify-center items-center p-[25px]'>
        <Image
          src={member.imageurl || Urls.DefaultMemberImage}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="z-[1] h-full w-auto p-[5px]"
        />
      </div>

      <div className='text-center line-height-mmn-large font-poppins font-medium max-w-[211px] whitespace-break-spaces'>
        <LinesEllipsis
          text={title}
          maxLine='2'
          ellipsis='...'
          trimRight={true}
          basedOn='letters'
        />
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
            <div className='flex gap-[30px]' key={`committee-${index}`} title={member.name}>
              {memberCard(member)}
            </div>
          )
        })
      }
    </div>
  )
}

const CommitteeMemberPage = () => {
  const [beginYear, setBeginYear] = useState(2020);

  const currentWorkingMembers = data.working.filter((member) => {
    if (!member.period || isNaN(beginYear)) return false;

    const mbeginyear = member.period.begin, mendyear = member.period.end;
    const endyear = beginYear + 2;

    if (mbeginyear > mendyear && mendyear > 0) return false;

    return (mbeginyear < endyear) && (mendyear <= 0 || mendyear >= beginYear);
  });

  const exeMemberList = memberList(data.executive);
  const workingMemberList = memberList(currentWorkingMembers);

  return (
    <div className='max-w-[1440px] m-auto'>
      <TopNav itemList={NavData} />

      <div className="flex flex-col sm:px-[90px] px-5 gap-[30px] pb-[40px] text-size-mmn-medium">
        <MMNTitle title={"Executive committee members"} className={""} color='purple' />
        {exeMemberList}
      </div>

      <div className="flex flex-col sm:px-[90px] px-5 gap-[30px] pb-[40px] text-size-mmn-medium">
        <div className='flex gap-[20px] flex-wrap'>
          <MMNTitle title={"Working committee members"} className={""} color='purple' />
          <DropDown options={yearList}
            className='w-fit'
            controlClassName="text-size-mmn-medium font-semibold line-height-mmn-medium text-color-mmn-yellow !rounded-[6px] !pl-[12px] !pr-[32px] bg-[#FFEDEA] !border-none cursor-pointer"
            menuClassName='text-size-mmn-medium font-semibold line-height-mmn-medium border-none '
            arrowClassName='top-[18px] right-[10px]'
            value={`${beginYear}`}
            onChange={(e) => { setBeginYear(Number(e.value)) }}
            placeholder={"Select Year"} />
        </div>

        {workingMemberList}
      </div>
    </div>
  )
}

export default CommitteeMemberPage