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
    { name: "        Shrikant Prabhu              Styre Leder", imageurl: "" },
    { name: "        Sujata Prabhu              Neste Styre Leder", imageurl: "/image/members/executive/Sujata.jpg" },
    // { name: "Member name", imageurl: "/image/members/executive/member2.jpg" },
    { name: "Deep Vaishampayan ", imageurl: "/image/members/executive/Deep.jpeg" },
    { name: "Trupti Shrivardhankar", imageurl: "/image/members/executive/Trupti.jpg" },
    { name: "Sunil Shenoy ", imageurl: "" },
    { name: "Amol Pandav", imageurl: "/image/members/executive/AmolPandav.jpg" },
    { name: "Pradnya Rane", imageurl: "/image/members/executive/Pradnya.jpg" },
    { name: "Santosh Dalal", imageurl: "/image/members/executive/Santosh.jpg" },
    { name: "Omkar Kulkarni", imageurl: "/image/members/executive/Omkar.jpeg" },
    { name: "Kiran Nandedkar", imageurl: "/image/members/executive/Kiran.jpg" },
  ],
  working: [
    { name: "        Shrikant Prabhu              Styre Leder", imageurl: "", period: { begin: 2020, end: 2022 } },
    { name: "        Sujata Prabhu              Neste Styre Leder", imageurl: "/image/members/executive/Sujata.jpg", period: { begin: 2020, end: 2022 } },
    { name: "        Kiran Nandedkar", imageurl: "/image/members/executive/Kiran.jpg", period: { begin: 2020, end: 2022 } },
    { name: "        Trupti Shrivardhankar", imageurl: "/image/members/executive/Trupti.jpg", period: { begin: 2020, end: 2022 } },
    { name: "        Kashmira Shinde", imageurl: "", period: { begin: 2020, end: 2022 } },
    { name: "        Snehal Shridhankar", imageurl: "", period: { begin: 2020, end: 2022 } },
    { name: "        Asavari Manjrekar Nandedkar", imageurl: "", period: { begin: 2020, end: 2022 } },

    { name: "Sachin Karegoankar", imageurl: "", period: { begin: 2018, end: 2019 } },
    { name: "Kiran Pawar", imageurl: "", period: { begin: 2018, end: 2019 } },
    { name: "Amol More", imageurl: "", period: { begin: 2018, end: 2019 } },
    { name: "Charuta Ranade", imageurl: "", period: { begin: 2018, end: 2019 } },
    { name: "Ramakant Tilekar", imageurl: "", period: { begin: 2018, end: 2019 } },
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
        <MMNTitle title={"Committee members"} className={""} color='purple' />
        {exeMemberList}
      </div>

      <div className="flex flex-col sm:px-[90px] px-5 gap-[30px] pb-[40px] text-size-mmn-medium">
        <div className='flex gap-[20px] flex-wrap'>
          <MMNTitle title={"Previous committee members"} className={""} color='purple' />
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
