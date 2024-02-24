"use client";
import React from "react";
import Button from "../../components/button";
import VolunteerCard from "../../components/action-section/volunteer-card";
import GoogleFormCard from "../../components/action-section/google-form-card";
import MemberCard from "../../components/action-section/member-card";
import Container from "../../components/container";

const ActionSection = () => {
  return (
    <Container>
      <section className="px-5 sm:px-[90px] pb-[40px] flex lg:flex-row flex-col gap-10 font-poppins">
        <VolunteerCard />
        <GoogleFormCard />
        <MemberCard />
      </section>
    </Container>
  );
};

export default ActionSection;
