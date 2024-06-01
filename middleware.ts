import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse, NextRequest } from "next/server";

const BASE_API_ROOT =
  process.env.NEXT_PUBLIC_API_ENDPOIONT ?? "http://localhost:3000";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = new NextURL(request.url);
  const path = url.pathname.replace("/proxy/", "");
  const api_url = `${BASE_API_ROOT}${path}`;
  const cookies = request.cookies;
  // read access_token from cookies
  const access_token = cookies.get("access_token")?.value;
  const result = await fetch(api_url, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: request.body,
  });
  if (result.status === 401) {
    return NextResponse.redirect("/login");
  }
  if (result.status === 403) {
    return NextResponse.redirect("/login");
  }
  if (result.status === 200) {
    return NextResponse.json(await result.json());
  }
}

export const config = {
  matcher: "/proxy/:path*",
};
