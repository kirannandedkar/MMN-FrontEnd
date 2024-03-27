// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react"
import GoogleButton from "../../components/google-button";

const SignUpButtonGroup = ({callback, ...params}) => {
    // extracting data from usesession as session
  const { data: session } = useSession();

    const handleGoogleSignIn = () => {
        signIn("google", { redirect: false, callbackUrl: 'http://localhost:3000/signupwithgoogle' } );
    }

    const handleClick = () => {
      callback();
    }
    
    return (
        <div className="max-w-[345px] flex flex-col gap-5 pt-5">
          <GoogleButton
            title= "Signup with Google"
            action={handleGoogleSignIn}
          />
          
          <button
            className="font-poppins font-[500] text-[16px] leading-6 text-white bg-[#00205B] rounded-[6px] py-[13px] px-5"
            onClick={handleClick}
          >
            Sign up manually
          </button>
        </div>
    );
}

export default SignUpButtonGroup;