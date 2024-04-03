"use client";

import React from "react";
import MMNContainer from "@/components/MMNContainer";
import InfoCard from "./InfoCard";
import Image from "next/image";
import Slider from "react-slick";

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

interface Item {
	title: string,
	year: string,
	date: string,
	address: string,
	description: string,
	image: string,
	imageClassName?: string,
	className: string,
}

const SliderItem = (item: Item, index: number) => {
	return (
		<div key={index}>
			<div className={`md:block hidden relative overflow-hidden w-full ${item.className || ""}`} >
				<div>
					<div className={`absolute top-0 left-0 z-[2] w-[786px] h-full ${item.imageClassName || ''}`}></div>
					<Image
						src={item.image}
						alt="hero"
						width={0}
						height={0}
						sizes="100vw"
						className="absolute top-0 left-[-93px] z-[1] h-full w-[878px]"
					/>
				</div>
				<MMNContainer className="flex-col z-[3] relative">
					<div className="sm:pt-[40px] pt-[5px] pb-[20px] flex flex-col gap-[26px]">
						<div className="w-full h-[36px]"></div>
						<div className="grid grid-cols-2 gap-[40px]">
							<div></div>
							<InfoCard event={item} />
						</div>
						<div className="w-full h-[10px]"></div>
					</div>
				</MMNContainer>
			</div>

			<div className={`md:hidden block relative overflow-hidden w-full ${item.className || ""}`}>
				<div className="relative w-full h-[315px] overflow-hidden">
					<div className={`absolute top-0 left-0 z-[2] w-full h-full ${item.imageClassName || ''}`}></div>
					<Image
						src={item.image}
						alt="hero"
						width={0}
						height={0}
						sizes="100vw"
						className="z-[1] h-full w-auto"
					/>
				</div>
				<MMNContainer className="flex-col z-[3] relative">
					<div className="pt-[40px] pb-[20px] flex flex-col gap-[26px]">
						<InfoCard event={item} />
						<div className="w-full h-[24px]"></div>
					</div>
				</MMNContainer>
			</div>
		</div>
	)
}

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
				data.map((item, index) => {
					return SliderItem(item, index)
				})
			}
		</Slider>
	)
}