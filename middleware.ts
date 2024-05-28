import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse, NextRequest } from 'next/server'

const BASE_API_ROOT = 'https://google.com/test/alex/';  //you need to chnage this.

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let old_url = request.nextUrl.clone();
    const new_url = new NextURL(BASE_API_ROOT);
    const old_path = old_url.pathname.replace('/proxy/', '');
    new_url.pathname += old_path;

    console.log(new_url);

    return NextResponse.rewrite(new_url);
}

export const config = {
    matcher: '/proxy/:path*',
}