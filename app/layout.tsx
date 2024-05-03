import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import HeadersDiv from "@/components/headers-div";
import FooterPage from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sagheer Shop, Pakpattan",
  description: "Deal in all kinds of wood",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <HeadersDiv />
        {children}
      <FooterPage/>
      </body>
    </html>
  );
}
