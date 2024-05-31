import { post } from "./fetch-factory";
import { getSession } from "next-auth/react";

const handleSignup = async (
  member: any,
  password?: {
    password: string;
    rePassword: string;
  }
) => {

  const session = await getSession();
  try {
    let status = 404;
    if (session) {
      const result = await post("/api/signup-external/", member);
      status = result.status;
    } else {
      if (password) {
        if (password.password !== password.rePassword) {
          alert("passwords do not match");
          return;
        }
        member.password = password.password;
      }
      const result = await post("/api/register/", member);
      status = result.status;
    }

    if (status == 200) {
      alert("signup successful");
    } else {
      alert("signup failed");
    }
  } catch {
    alert("Error occured while signup.");
  }
};
const handleSignin = async (
  email: string,
  password: string
) => {

  const session = await getSession();

  try {
    const result = await post("/api/login/", {
      email, password
    });

    if (result.status == 200) {
      alert("signup successful");
    } else {
      console.log(result)
    }
  } catch {
    console.log("error while signin fetch")
  }

};


export { handleSignup, handleSignin };
