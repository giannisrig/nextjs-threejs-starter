import Overlay from "@/components/common/overlay/Overlay";

process.env.NODE_NO_WARNINGS = "stream/web";
import React from "react";
import { Metadata } from "next";
import "@/styles/globals.scss";
import Wrapper from "@/components/layout/Wrapper";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Header />
          <main>{children}</main>
          <Overlay />
          {/*<Footer />*/}
        </Wrapper>
      </body>
    </html>
  );
}
