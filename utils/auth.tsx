import { POST } from "./fetch-factory";
import { getSession, signIn } from "next-auth/react";

const handleSignupByGoogle = async (member: any) => {
  const session: any = await getSession();

  try {
    const result = await POST(
      "/api/signup-external/",
      {
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ')[1] || '',
        email: session.user.email || '',
        id_token: session?.id_token || '',
      }
    );

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
    alert("signin successful manually");
  } else {
    alert("signin failed");
  }
};

const handleSigninGoogle = async () => {
  const session: any = await getSession();

  if (session) {
    const result = await POST("/api/signin/google", { id_token: session?.id_token });
    if (result.status === 200) {
      alert("signin successful with google");
    } else {
      alert("signin failed");
    }
  } else {
    signIn('google');
  }
};

export { handleSignup, handleSigninManual, handleSignupByGoogle, handleSigninGoogle };
