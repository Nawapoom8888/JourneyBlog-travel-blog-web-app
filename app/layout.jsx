"use client";

import NavigationBar from "@/components/NavigationBar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { SearchProvider } from "@/context/search";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// export const metadata = {
//   title: "Journey",
//   description: "Journey Travel Blog App",
// };

// style={{
//   background: "rgb(2,0,36);",
//   background:
//     "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);",
// }}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <Head>
        <title>JourneyBlog</title>
      </Head>
      <body className="">
        <SessionProvider>
          <SearchProvider>
            <div className="bg grid min-h-screen min-w-fit">
              <Toaster />
              <NavigationBar />
              {children}
            </div>
          </SearchProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
