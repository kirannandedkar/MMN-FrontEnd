"use client"
import React from "react";
import CustomSlider from '../../components/custom-slider'
import {heroCarouselItemList} from "../../data/dummy-data"

const Hero = () => {
  return (
    <CustomSlider data={heroCarouselItemList} />
  );
};

export default Hero;
