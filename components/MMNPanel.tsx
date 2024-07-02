"use client"

interface Props{
  className: string | null | undefined,
  children: React.ReactNode;
}

export default function MMNPanel(params:Props)
{
    return (
        <div className={ `p-[24px] flex flex-col gap-[14px] ${params.className}` }>
            {params.children}
        </div>
    )
}