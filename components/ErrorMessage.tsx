export const ErrorMessage = ({ msg }: { msg?: string }) => {
    return <div className="text-[12px] text-red-500 italic text-right">{msg || ''}</div>
}