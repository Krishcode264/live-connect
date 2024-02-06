"use client"
import "./globals.css";

import { RecoilRoot } from "recoil";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-sky-900 to-blue-900   h-screen ">
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
