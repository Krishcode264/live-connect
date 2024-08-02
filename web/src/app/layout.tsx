import type { Session } from "next-auth";
import "./globals.css";
import SessionProvider from "../utils/SessionProvider";
import RecoilRoot from "../utils/RecoilRoot";
interface LayoutProps {
  children: React.ReactNode;
  session: Session | null;
}
import { SocketProvider } from "@/context/socketContext";
import SideBar from "@/components/homePage/SideBar";
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>live connect</title>
      </head>
      <body className="  h-screen ">
        <div className="h-full w-full flex gap-8 p-2 sm:p-5 py-2">
          <SessionProvider>
            <RecoilRoot>
              <SocketProvider>
            <SideBar/>
                <div className="  rounded-lg  border flex-1 h-full overflow-y-auto shadow-lg shadow-slate-300">
                  {children}
                </div>
              </SocketProvider>
            </RecoilRoot>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
