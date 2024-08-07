"use client";

import { GetPageTitle, FavIcon } from "../../constants"
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import BlogPane from "./BlogPane";
import MMNButton from "@/components/MMNButton";
import GoogleButton from "@/components/GoogleButton";
import RenewMemberCard from "./RenewMemberCard";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"
import { useSelector } from "react-redux";

const title = GetPageTitle("Membership");

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Membership", link: "#" },
];

export default function MemberShipPage() {
    const { authresult } = useSelector((state: any) => state.auth);
    const router = useRouter();
    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] flex-col sm:flex-row">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    <BlogPane />
                    {
                        !authresult && (
                            <div className="flex flex-col gap-[20px] w-max pr-[30px]">
                                <div onClick={() => signIn("google", { redirect: false, callbackUrl: process.env.NEXT_PUBLIC_SITE_ROOT + 'signup/google' })}>
                                    <GoogleButton title={"Signup with Google"} className="max-w-full" />
                                </div>

                                <div onClick={() => router.push("/signup/manual")}>
                                    <MMNButton title="Sign up manually" color="purple" className={"w-full"} />
                                </div>
                            </div>)
                    }
                </div>

                <RenewMemberCard className="w-full sm:max-w-[420px]" />
            </MMNContainer>
        </div>
    );
}