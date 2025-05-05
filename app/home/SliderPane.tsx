"use client";

import React from "react";
import Slider from "react-slick";
import SliderItem, { Item } from "./SliderItem";

const data: Item[] = [
	{
		title: "Shravan Bhet",
		year: "2025",
		date: "16 August 2025",
		address: "TBD",
		description:
			'Shravan Bhet is ladies only program.',
		image: '/image/home/ShravanBhet.png',
		className: "bg-custom-radial-gradient-Green"
	},
	{
		title: "Ganesh Chaturthi",
		year: "2025",
		date: "30 August 2025",
		address: "Kirkegardsgt 9B, 0558 Oslo",
		description:
			'Ganeshotsav (Ganesh festival) is a key festival celebrated in Maharashtra. The festival begins on the "Ganesh Chaturthi" and ends after 10 days on "Anant Chaturdashi" during the month of "Bhadrapada" as per Hindu calendar. On the day 1,.',
		image: '/image/home/hero1.png',
		imageClassName: "bg-custom-overlay-gradient-red",
		className: "bg-[#CE2C23]",
	},
	
];

const setting = {
	autoplaySpeed: 1500,
	autoplay: false,

	dots: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	dotsClass: "slick-dots bottom-[20px]",
	customPaging: (i: number) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="#00205B">
				<circle cx="5" cy="5" r="5" />
			</svg>
		)
	},
	appendDots: (dots: React.ReactNode) => {
		return (
			<div>
				<ul className="flex gap-[8px] bottom-[20px] bg-[#FFFFFF80] w-max rounded-[3px] py-[7px] px-[15px] m-auto"> {dots} </ul>
			</div>
		)
	}
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
