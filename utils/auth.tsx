import { POST } from './fetch-factory';

const handleSignup = async (member: any) => {
    console.log("member is ", member);
    return;
    
    const result = await POST('/api/signup-external/', member);

    if (result.status == 200) {
        alert('signup successful')
    }
}

export { handleSignup };
