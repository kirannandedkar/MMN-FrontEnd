const TopNav = () => {
    return (
        <div className="flex gap-[10px] font-poppins text-[14px] font-[500] py-10">
            <a href="/home" className="underline text-[#ff5733]">
            Home
            </a>
            <span className="text-black">{">"}</span>
            <a href="/membership" className="text-black" />
            Membership
        </div>
    )
}

export default TopNav;