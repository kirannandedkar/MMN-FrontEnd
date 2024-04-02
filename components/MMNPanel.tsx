
interface Props{
  className: string | null | undefined,
  children: React.ReactNode;
}

export default function MMNPanel(params:Props)
{
    return (
        <div className={ `rounded-[10px] border-[1px] border-color-mmn-lightgrey p-[24px] flex flex-col gap-[14px] ${params.className}` }>
            {params.children}
        </div>
    )
}