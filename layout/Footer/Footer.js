import React from "react";
import Container from "../../components/container";

const Footer = () => {
  return (
    <footer className="bg-[#F1F1F1] ">
      <Container className="px-5 sm:px-[90px] py-[40px] grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between font-poppins">
        <div className="flex flex-col gap-[10px] mb-8 md:mb-0">
          <h3 className="text-[16px] font-[600]">Quick links</h3>
          <a href="#" className="text-[14px] font-[500] underline">
            Become a member
          </a>
          <a href="#" className="text-[14px] font-[500] underline">
            Become a volunteer
          </a>
          <a href="#" className="text-[14px] font-[500] underline">
            FAQ
          </a>
          <a href="#" className="text-[14px] font-[500] underline">
            Terms & Conditions
          </a>
        </div>
        <div className="flex flex-col gap-[10px] mb-8 md:mb-0">
          <h3 className="text-[16px] font-[600]">MMN Initiatives</h3>
          <a href="#" className="text-[14px] font-[500] underline">
            Marathi Shaala
          </a>
        </div>
        <div className="flex flex-col gap-[10px] mb-8 md:mb-0">
          <h3 className="text-[16px] font-[600]">Social media</h3>
          <a href="#" className="text-[14px] font-[500] underline">
            Facebook
          </a>
          <a href="#" className="text-[14px] font-[500] underline">
            Instagram
          </a>
          <a href="#" className="text-[14px] font-[500] underline">
            Youtube
          </a>
        </div>
        <div className="flex flex-col gap-[10px] mb-8 md:mb-0">
          <h3 className="text-[16px] font-[600]">Reach us</h3>
          <a href="#" className="text-[14px] font-[500] underline">
            mmn@marathimandal-norway.no
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
