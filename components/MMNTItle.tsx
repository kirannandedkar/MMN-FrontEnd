"use client"
interface Props {
    title: string,
    color: "purple" | "white",
    className?: string
}

export default function MMNTitle(params: Props){
    let className = "font-semibold text-size-mmn-extra line-height-mmn-extra ";
    if(params.color == "purple") className += "text-color-mmn-purple";
    if(params.color == "white") className += "text-white";

    return (
        <div className={`${className} ${params.className}`}>
            { params.title }
        </div>
    )
}