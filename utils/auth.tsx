import { POST } from "./fetch-factory";
import { getSession } from "next-auth/react";

const handleSignup = async (
  member: any,
  password?: {
    password: string;
    rePassword: string;
  }
) => {
   
  const session = await getSession();

  if (session) {
    const result = await POST("/api/signup-external/", member);

    if (result.status == 200) {
      alert("signup successful");
    }
  } else {
    if (password) {
        if (password.password !== password.rePassword) {
        alert("passwords do not match");
        return;
        }
        member.password = password.password;
    }
    const result = await POST("/api/register/", member);

    if (result.status == 200) {
      alert("signup successful");
    }
  }
};

export { handleSignup };
