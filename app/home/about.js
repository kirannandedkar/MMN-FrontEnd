import React from "react";
import Container from "../../components/container";

const About = () => {
  return (
    <Container>
      <section className="px-5 sm:px-[90px] pt-[30px] pb-[40px] flex flex-col gap-[10px] font-poppins ">
        <h2 className="text-[#00205B] text-2xl font-[600]">About MMN</h2>
        <p className="leading-7 text-[14px] font-[500]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p className="leading-7 text-[14px] font-[500] mt-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </section>
    </Container>
  );
};

export default About;
