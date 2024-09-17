import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse, NextRequest } from "next/server";

const BASE_API_ROOT =
  process.env.NEXT_PUBLIC_API_ENDPOIONT ?? "http://localhost:3000";

export async function middleware(request: NextRequest) {
  const url = new NextURL(request.url);
  const path = url.pathname.replace("/proxy/", "");
  const api_url = `${BASE_API_ROOT}${path}${url.search}`;
  const cookies = request.cookies;
  const access_token = cookies.get("access_token")?.value;
  try {
    const result = await fetch(api_url, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: request.method === 'POST' ? request.body : undefined,
    });
  
    if (result.status === 401) {
      return NextResponse.json({ isSuccess: false, message: 'Unauthorized', data: 'Unauthorized' });
    }
    if (result.status === 400) {
      return NextResponse.json(await result.json());
    }
    if (result.status === 403) {
      return NextResponse.json({ isSuccess: false, message: 'Forbidden', data: 'Forbidden' });
    }
    if (result.status === 200) {
      return NextResponse.json(await result.json());
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ isSuccess: false, message: 'Internal Server Error', data: 'Internal Server Error' });
  }
}

export const config = {
  matcher: "/proxy/:path*",
};
