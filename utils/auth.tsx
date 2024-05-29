import { POST } from "./fetch-factory";
import { getSession } from "next-auth/react";

const handleSignupByGoogle = async (member: any) => {
  const session = await getSession();

  try {
    const result = await POST("/api/signup-external/", member);
    let status = result.status;

    if (status == 200) {
      alert("signup successful");
    } else {
      alert("signup failed");
    }
  } catch {
    alert("Error occured while signup.");
  }
}

const handleSignup = async (
  member: any,
  password: string
) => {
  const session = await getSession();
  try {
    let status = 404;
    const result = await POST("/api/register/", {
      ...member, password: password
    });
    status = result.status;

    if (status == 200) {
      alert("signup successful");
    } else {
      alert("signup failed");
    }
  } catch {
    alert("Error occured while signup.");
  }
};

const handleSigninManual = async (email: string, password: string) => {
  const session = await getSession();
  const result = await POST("/api/signin/manual", { email, password });
  if (result.status === 200) {
    alert("signin successful");
  } else {
    alert("signin failed");
  }
};

const handleSigninGoogle = async () => {
  const session = await getSession();
  const result = await POST("/api/signin/google", {});
  if (result.status === 200) {
    alert("signin successful");
  } else {
    alert("signin failed");
  }
};

export { handleSignup, handleSigninManual, handleSignupByGoogle, handleSigninGoogle };
