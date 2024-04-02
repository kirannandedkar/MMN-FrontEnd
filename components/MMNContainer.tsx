interface Props{
  className?: string,
  children: React.ReactNode
}


export default function MMNContainer(params:Props)
{
    return (
        <div className={`${params.className || ""} w-full xl:px-[90px] sm:px-[40px] px-[20px] flex`}>
            {params.children}
        </div>
    )
}