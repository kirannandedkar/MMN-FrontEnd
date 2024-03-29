export default function MMNTitle1({title, className, ...params}){
    return (
        <div className={`font-semibold text-[24px] leading-[36px] text-[#00205B] ${className}`}>
            { title }
        </div>
    )
}