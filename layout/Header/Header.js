import Image from "next/image";
import React from "react";
import NavItem from "../../components/nav-item";
import Container from "../../components/container";
import { IoMenu } from "react-icons/io5";

const NavbarList = [
  {
    title: "Home",
    link: "#",
  },
  {
    title: "About us",
    link: "#",
  },
  {
    title: "Membership",
    link: "#",
  },
  {
    title: "Membership",
    link: "#",
  },
  {
    title: "Gallery",
    link: "#",
  },
  {
    title: "MMN Initiatives",
    link: "#",
  },
  {
    title: "Contact us",
    link: "#",
  },
];

const Header = () => {
  return (
    <Container>
      <nav className="pl-[30px] pr-[60px] flex justify-between items-center">
        <a href="#" className="py-[15px] block">
          <Image
            src={"/image/logo/logo-desktop.jpg"}
            alt="logo"
            width={134}
            height={53}
          />
        </a>
        <ul className="items-center xl:flex hidden">
          {NavbarList.map((item, index) => {
            return <NavItem title={item.title} link={item.link} key={index} />;
          })}
        </ul>
        <button className="xl:hidden block">
          <IoMenu size={20} />
        </button>
      </nav>
    </Container>
  );
};

export default Header;
