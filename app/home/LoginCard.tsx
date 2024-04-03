import MMNTitle from "@/components/MMNTItle";
import MMNPanel from "@/components/MMNPanel";
import MMNButton from "@/components/MMNButton";
import GoogleButton from "@/components/GoogleButton";

export default function LoginCard(){
    return (
        <MMNPanel className="">
            <MMNTitle title="Already member?" color="purple" />
            <GoogleButton title="Log in with Google" className="max-w-full"/>
            <div className="font-bold line-height-mmn-large text-center">
                OR
            </div>

            <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[5px]">
                    <div className="line-height-mmn-large">Member id/Email id</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full" placeholder="Enter member ID/Email id" />
                </div>

                <div className="flex flex-col gap-[5px]">
                    <div className="line-height-mmn-large">Password</div>
                    <input type="password" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full" placeholder="Enter password" />
                </div>

                <div className="flex justify-end">
                    <MMNButton title="Login" color="purple" size="normal"/>
                </div>
            </div>
        </MMNPanel>
    )
}