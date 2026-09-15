import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { Toaster } from "@/components/ui/toast"
import { Providers } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  subsets : ['latin'],
  variable: '--font-noto-sans'
})

export const metadata: Metadata = {
  title: "ghostwriter",
  description: "ghost is working",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${notoSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
        <Providers>
          {children}
        </Providers>
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  );
}
