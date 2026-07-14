import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/global.css"
import type { AppProps } from "next/app";
import { UserProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="min-h-screen">
        <title>YouTube Clone</title>
      <Header />
        <Toaster />
        <div className="flex ">
            <Sidebar />
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
}