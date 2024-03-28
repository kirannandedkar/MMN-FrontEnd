"use client";
import React, { useState } from "react";
import Container from "../../components/container";

import TopNav from "../membership/topnav";
import IntroSection from "../membership/page-intro";
import Payment from "../membership/payment";
import MemberDetail from "../membership/member-detail";
import { useSession, signIn, signOut } from "next-auth/react"

// import { GoogleAccountInfo } from "../../data/dummy-data";

const SignUpGooglePage = () => {
  const {data: session} = useSession();

  //getting user info from back end;
  let GoogleAccountInfo = {
    email: '',
    given_name: '',
    family_name: '',
    picture: '',
    mobile: '',
    country: '',
    gender: '',
    birth: ""
  };

  if(session != undefined && session != null){
    GoogleAccountInfo.email = session.user.email;
    GoogleAccountInfo.given_name = session.user.name; //full name
  }
  
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
