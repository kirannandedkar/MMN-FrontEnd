import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

const handler = async (req: any) =>{
    const req_body = await req.json();
    const session = await getServerSession( req );
    
    const signupRequest = {
        "firstName":req_body.firstName,
        "lastName":req_body.lastName,
        "email": req_body.email,
        "referenceUserAccountId": null
      }

      const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOIONT + 'UserAccount/create-user-with-google',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ req_body.id_token
        },
        body: JSON.stringify(signupRequest)
      })
      if(result.status === 200){
        return NextResponse.json({success:true,status: 200, message: "Sign up successful"})
      }
      else{
        return NextResponse.json({success:false,status: 400, message: "Sign up failed"})
      }
    
}

export {handler as POST}