"use client";

import React from "react";
import MMNContainer from "@/components/MMNContainer";
import InfoCard from "./InfoCard";
import Image from "next/image";
import Slider from "react-slick";
import { Item } from "./SliderItem";
import dynamic from "next/dynamic"

const SliderItem = dynamic(() => import("./SliderItem"), { ssr: false })
const data: Item[] = [
	{
		title: "Ganesh Chaturthi",
		year: "2023",
		date: "03 Sep 2022",
		address: "Oslo, Norway",
		description:
			'Ganeshotsav (Ganesh festival) is a key festival celebrated in Maharashtra. The festival begins on the "Ganesh Chaturthi" and ends after 10 days on "Anant Chaturdashi" during the month of "Bhadrapada" as per Hindu calendar. On the day 1,.',
		image: '/image/home/hero1.png',
		imageClassName: "bg-custom-overlay-gradient-red",
		className: "bg-custom-radial-gradient-red",
	},
	{
		title: "Diwali",
		year: "2023",
		date: "03 Sep 2022",
		address: "Oslo, Norway",
		description:
			'Ganeshotsav (Ganesh festival) is a key festival celebrated in Maharashtra. The festival begins on the "Ganesh Chaturthi" and ends after 10 days on "Anant Chaturdashi" during the month of "Bhadrapada" as per Hindu calendar. On the day 1,.',
		image: '/image/home/hero2.svg',
		className: "bg-custom-radial-gradient-purple"
	},
];

const setting = {
	dots: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	dotsClass: "slick-dots bottom-[20px]"
}

export default function SliderPane() {
	const sliderRef = React.useRef<Slider>(null);

	return (
		<Slider ref={sliderRef} {...setting}>
			{
				data.map((item, index) =>
					<SliderItem key={`SliderItem-${index}`} item={item} />
				)
			}
		</Slider>
	)
}