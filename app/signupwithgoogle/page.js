"use client";
import React, { useState } from "react";
import Container from "../../components/container";

import TopNav from "../membership/topnav";
import IntroSection from "../membership/page-intro";
import Payment from "../membership/payment";
import MemberDetail from "../membership/member-detail";
import { useSession, signIn, signOut } from "next-auth/react"

import { GoogleAccountInfo } from "../../data/dummy-data";

const SignUpGooglePage = () => {
  //getting user info from back end;
  
  return (
    <Container>
      <div className="flex flex-col sm:px-[90px] pb-[85px] px-5">
        <TopNav />
        
        <div className="flex gap-10 md:flex-row flex-col basis-2/3">
          <div className="flex flex-col">
            <IntroSection />
            <MemberDetail userinfo={GoogleAccountInfo}/> 
          </div>
          <Payment />
        </div>
      </div>
    </Container>
     
  );
};

export default SignUpGooglePage;
