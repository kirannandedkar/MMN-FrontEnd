"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Curtain.module.css"
import { PublicContext } from "@/context/public-context";

const Curtain = () => {
  const { setIsCurtainClicked } = useContext(PublicContext)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    const body = document.querySelector("body")
    if (!body) return
    if (isClicked) {
      const timer = setTimeout(() => {
        body.style.overflow = ""
      }, 2000);
      return () => clearTimeout(timer)
    } else {
      body.style.overflow = "hidden"

    }
  }, [isClicked])

  const handleClick = () => {
    setIsClicked(true);

    const timer = setTimeout(() => {
      setIsCurtainClicked(true);
    }, 2000);
    return () => clearTimeout(timer)
  }
  return (
    <>
      <div
        className={`h-full w-full overflow-hidden sm:grid sm:grid-cols-2 absolute top-0 h-[100vh] z-[100] ${isClicked ? styles["animated"] : ''}`}
        onClick={handleClick}
      >
        <Image
          src={"/image/home/curtain-left.png"}
          alt={"left curtain"}
          width={0}
          height={0}
          sizes="100vw"
          className="z-[1] h-full w-auto p-[0px] hidden sm:block"
          priority={true}
        />

        <Image
          src={"/image/home/curtain-right.png"}
          alt={"left curtain"}
          width={0}
          height={0}
          sizes="100vw"
          className="z-[1] h-full w-auto p-[0px] hidden sm:block"
          priority={true}
        />

        <Image
          src={"/image/home/curtain-mobile.png"}
          alt={"left curtain"}
          width={0}
          height={0}
          sizes="100vw"
          className="z-[1] h-full w-auto p-[0px] sm:hidden"
          priority={true}
        />
      </div >
    </>
  );
};

export default Curtain;
