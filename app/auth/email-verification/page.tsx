"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import MMNTitle from "@/components/MMNTItle";
import { useRouter, useSearchParams } from "next/navigation";
import { POST } from "@/utils/fetch-factory";
import {handleEmailConfirm} from "@/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { SignInMailVerification } from "@/redux/user/auth.action";


const NavData = [
  { title: "Home", link: "/home" },
  { title: "Auth", link: "#" },
  { title: "Email verification", link: "#" },
];

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { authresult } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = searchParams.get("token") || "";
    dispatch(SignInMailVerification({token}));
  }, []);

  useEffect(() => {
    if(authresult)
      router.push("/signup/manual");
  },[authresult])

  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="mx-auto flex flex-col lg:flex-row items-center">
          <div className="w-full">
            <MMNTitle
              title="Email Verification"
              color="purple"
              className={"text-center mb-3"}
            />
            <p className="text-center mb-6">
             {loading ? 'Verifying your email...' : 'Verification failed. The token may be invalid or expired.'}
            </p>
           
          </div>
        </div>
      </MMNContainer>
    </div>
  );
};

export default ChangePasswordPage;
