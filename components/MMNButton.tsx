"use client"
interface Props {
    title: string,
    size?: "big" | "normal" | "small",
    color?: "purple" | "white",
    className?: string | null,
    disabled?: boolean,
}

export default function MMNButton(params: Props){
    let className: string = "cursor-pointer min-w-max rounded-[6px] inline-block";
    
    if(params.color == "purple"){
        className += " bg-mmn-purple text-white";
    }

    if(params.color == "white"){
        className += " bg-white text-color-mmn-purple";
    }

    const size: string = params.size == undefined ? "normal" : params.size;
    
    switch(size){
        case "big":{
            break;
        }
        case "normal":{
            className += " px-[20px] py-[13px]";
            break;
        }
        case "small":{
            className += " p-[10px]";
            break;
        }
    }

    return (
        <div className={`${className} ${params.className || ""}`} style={{ cursor:params.disabled ? "not-allowed" : "pointer" }}>
            <div className="line-height-mmn-medium text-size-mmn-medium self-center w-full text-center">
                { params.title }
            </div>
        </div>
    )
}