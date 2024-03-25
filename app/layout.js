import "./globals.css";
import SocialLinkBar from "../layout/SocialLinkBar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white relative flex flex-col justify-between h-[100vh]">
        <div>
          <SocialLinkBar />
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
