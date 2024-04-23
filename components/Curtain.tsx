"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Curtain.module.css"

const Curtain = ({ onClicked }: { onClicked: () => void }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    const body = document.querySelector("body")
    if (!body) return
    if (clicked) {
      const timer = setTimeout(() => {
        body.style.overflow = ""
      }, 2000);
      return () => clearTimeout(timer)
    } else {
      body.style.overflow = "hidden"

    }
  }, [clicked])


  return (
    <>
      <div
        className={`h-full w-full overflow-hidden sm:grid sm:grid-cols-2 absolute top-0 h-[100vh] z-[100] ${clicked ? styles["animated"] : ''}`}
        onClick={
          () => {
            setClicked(true);
            onClicked();
          }
        }
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
      </div>
    </>
  );
};

export default Curtain;
