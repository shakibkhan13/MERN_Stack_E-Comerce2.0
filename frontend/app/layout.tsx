import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/layout/header/Header";
import Footer from "@/layout/footer/Footer";


export const metadata: Metadata = {
  title: "SK_Store | Online shopping places",
  description: "SK_Store for online shopping",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
       <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "rounded-lg shadow-lg border",
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}