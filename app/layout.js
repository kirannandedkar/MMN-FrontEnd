import "./globals.css";
import SocialLinkBar from "../layout/SocialLinkBar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <SocialLinkBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
