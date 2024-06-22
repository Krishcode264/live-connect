
import type { Session } from "next-auth";
import MainView from "@/components/homePage/MainView";
import SideBar from "@/components/homePage/SideBar";
import "./globals.css";
import SessionProvider from '../utils/SessionProvider'
import  RecoilRoot from "../utils/RecoilRoot";

interface LayoutProps {
  children: React.ReactNode;
  session: Session | null;
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
        <meta
          name="google-signin-client_id"
          content={process.env.NEXT_PUBLIC_YOUR_CLIENT_ID}
        ></meta>
        <title>live connect</title>
      </head>
      <body className="  h-screen ">
        <div className="h-full w-full flex gap-8 p-2 sm:p-5 py-2">
          <RecoilRoot>
            <SideBar />
            <div className="  rounded-lg  border flex-1 h-full overflow-y-auto shadow-lg shadow-slate-300">
              {children}
            </div>
          </RecoilRoot>
        </div>
      </body>
    </html>
  );
}
