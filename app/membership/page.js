"use client";
import React, { useState } from "react";
import Container from "../../components/container";

import TopNav from "./topnav";
import IntroSection from "./page-intro";
import RenewMemberShip from "./renew-membership";
import Payment from "./payment";
import MemberDetail from "./member-detail";
import SignupButtonGroup from "./signup-button-group";


const MemberShipPage = () => {
  const [showDetail, setShowDetail] = useState(false);

  const manualClick = () => {
    setShowDetail(true);
  }
  
  // extracting data from usesession as session
  return (
    <Container>
      <div className="flex flex-col sm:px-[90px] pb-[85px] px-5">
        <TopNav />
        
        <div className="flex gap-10 md:flex-row flex-col basis-2/3">
          <div className="flex flex-col">
            <IntroSection />
            {
              showDetail ?  ( <MemberDetail /> ) : ( <SignupButtonGroup callback={manualClick}/> )
            }
          </div>
          { 
            showDetail ? <Payment /> : <RenewMemberShip />
          }
        </div>
      </div>
    </Container>
     
  );
};

export default MemberShipPage;
