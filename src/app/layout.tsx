import type { Metadata } from "next";
import "./globals.css";
import { PageContextProvider } from "./context/PageContextProvider";

export const metadata: Metadata = {
  title: "Pavillion : )",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root-layout">
        <PageContextProvider>
          {children}
        </PageContextProvider>
      </body>
    </html>
  );
}
