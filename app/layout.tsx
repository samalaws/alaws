import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samer Alaws | Full Stack Web Developer (Next.js, React)",
  description: "Full Stack Web Developer specializing in modern technologies like Next.js and React.js. Build high-performance web applications.",
  keywords: "Full Stack Web Developer, Next.js, React.js, TypeScript, MongoDB, JavaScript",
  themeColor: "black",
  colorScheme: "dark",
  openGraph: {
    title: "Samer Alaws | Full Stack Web Developer",
    description: "Full Stack Web Developer specializing in modern technologies like Next.js and React.js. Build high-performance web applications.",
    url: "https://alaws.de",
    siteName: "Samer Alaws",
    locale: "en-US, de-DE, ar-AR",
    type: "website",
  },
  twitter: {
    title: "Samer Alaws | Full Stack Web Developer",
    description: "Full Stack Web Developer specializing in modern technologies like Next.js and React.js. Build high-performance web applications.",
    creator: "@SamerAlaws",
    site: "@SamerAlaws",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  viewport: "width=device-width, initial-scale=1.0",
  metadataBase: new URL("https://alaws.de"),
  robots: "index, follow",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
        <NextSSRPlugin 
          routerConfig={extractRouterConfig(ourFileRouter)}
        /> 
      </body>
    </html>
  );
}
