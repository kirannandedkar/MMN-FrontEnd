"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Container from "../components/container";
import SliderItem from './slider-item';

const CustomSlider = ({ data }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {data.map((item, index) => {
        return (
          <SliderItem item={item} key={index} />          
        );
      })}
    </Slider>
  );
};

export default CustomSlider;
