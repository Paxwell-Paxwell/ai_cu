import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { SWRProvider } from "./swr-provider";

export const metadata: Metadata = {
  title: "AI@CU",
  description: "AI@CU prediction",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SWRProvider>
            <Navbar />
            {children}
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
