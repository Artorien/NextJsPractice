import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header-component/Header";
import Sidebar from "@/components/sidebar-component/Side-bar";
import ClientLayout from "@/components/client-layout-component/client-layout";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/contexts/Auth-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MyBook",
  description: "Enjoy Your favourite books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full h-full`}
      >
        <Header></Header>
        <div className="flex">
          <Sidebar></Sidebar>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
          <Toaster></Toaster>
        </div>
      </body>
    </html>
  );
}
