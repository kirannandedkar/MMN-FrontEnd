import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import SessionWrapper from "@/components/SessionWrapper";
import SocialLinkBar from "@/layout/SocialLinkBar";
import DesktopHeader from "@/layout/DesktopHeader";
import MobileHeader from "@/layout/MobileHeader";
import FooterBar from "@/layout/Footer";
import Providers from "./providers";
import ReactQueryProvider from "@/utils/query-client-provider";

//default font-14px, weight 500, family-poppin
const inter = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`text-size-mmn-normal border-white line-height-mmn-normal font-medium ${inter.className}`}
        >
          <ReactQueryProvider>
            <link rel="icon" href="/favicon.svg" sizes="any" />
            <SocialLinkBar />

            <div className="flex justify-center">
              <div className="w-full flex flex-col min-h-screen">
                <div className="xl:block hidden">
                  <DesktopHeader />
                </div>
                <div className="xl:hidden block">
                  <MobileHeader />
                </div>
                <div className="flex-grow">
                  <Providers>{children}</Providers>
                </div>
              </div>
            </div>

            <FooterBar />
            <div id="modal-container"></div>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
