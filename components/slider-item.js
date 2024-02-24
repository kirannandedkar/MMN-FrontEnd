import React from "react";
import Image from "next/image";
import Container from "./container";
import Button from "./button";

const SliderItem = ({ item }) => {
  return (
    <div className={`relative w-full ${item.className || ""}`}>
      <div className="xl:block hidden">
        {item.imgUrl && (
          <Image
            src={item.imgUrl}
            alt="hero"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-contain object-left absolute top-0 left-0 z-[1]"
          />
        )}
      </div>
      <Container
        className={`container mx-auto z-[2] relative grid xl:grid-cols-2 grid-cols-1 gap-10 py-[90px] sm:h-auto h-[100vh]`}
      >
        <div style={{ aspectRatio: 1.71 }} className="xl:block hidden">
          {item.leftImageUrl && (
            <Image
              src={item.leftImageUrl}
              alt="left"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-[10px]"
            />
          )}
        </div>

        <div className="flex flex-col gap-[14px] font-poppins text-white xl:px-0 px-10 xl:w-full">
          <span className="p-[10px] rounded-[6px] bg-[#F1F6FF] text-[#00205B] text-[14px] font-[500] w-fit">
            Upcoming event
          </span>
          <h1 className="text-white text-[34px] font-[700]">
            {item.title}
            <span className="ml-[10px] font-[400]">{item.year}</span>
          </h1>
          <div className="flex gap-[10px] items-center md:flex-row flex-col">
            <h2 className="text-[14px] font-[500] flex gap-[10px]">
              <span>Date:</span>
              <span className="font-[700]">{item.date}</span>
            </h2>
            <span className="text-[#00205B] font-[500] py-[9px] px-[10px] bg-white rounded-[6px]">
              The date is tentative. Stay tuned for further details…
            </span>
          </div>
          <div className="flex gap-[10px]">
            <h2 className="text-[14px] font-[500]">Address:</h2>
            <span className="font-[700]">{item.address}</span>
          </div>
          <p className="font-[500] leading-7">{item.content}</p>
          <div className="flex gap-5 sm:flex-row flex-col">
            <Button
              title={"Learn more"}
              style={"rounded-[6px] border border-solid border-white w-full"}
            />
            <Button
              title={"Register for event now"}
              style={"rounded-[6px] bg-[#00205B] w-full"}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SliderItem;
