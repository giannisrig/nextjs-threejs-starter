import React from "react";
import { Metadata } from "next";
import "@/styles/globals.scss";
import Wrapper from "./wrapper";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </Wrapper>
      </body>
    </html>
  );
}
