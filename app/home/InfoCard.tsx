"use client"

import MMNButton from "@/components/MMNButton";

interface Props {
    className?: string,
    event: {
        title: string,
        year: string,
        date: string,
        address: string,
        description: string
    }
}

export default function InfoCard(params: Props) {
    return (
        <div className={`${params.className || ""} w-full p-0 flex flex-col gap-[14px] text-white`}>
            <div>
                <MMNButton title="Upcoming event" size="small" color="white" />
            </div>

            <div className="flex gap-[10px] text-[34px] leading-[51px] flex-wrap">
                <h1 className="font-bold min-w-max"> {params.event.title} </h1>
                <h1 className="font-normal"> {params.event.year} </h1>
            </div>

            <div className="flex gap-[10px] line-height-mmn-normal sm:items-center items-start flex-wrap">
                <div>
                    <span className="">Date: </span>
                    <span className="font-bold"> {params.event.date} </span>
                </div>
                <div>
                    {/* <MMNButton title="The date is tentative. Stay tuned for further details..." size="small" color="white" className={"!min-w-full"} /> */}
                </div>
            </div>

            <div className="flex gap-[10px] line-height-mmn-normal">
                <span className="">Address: </span>
                <span className="font-bold"> {params.event.address} </span>
            </div>

            <div className="line-height-mmn-large">
                {params.event.description}
            </div>

            {/* <div className="flex gap-[20px] flex-wrap">
                <MMNButton title="Learn more" className="border-[1px] border-white text-white" size="normal" />
                <MMNButton title="Register for event now" color="purple" />
            </div> */}
        </div>
    )
}
