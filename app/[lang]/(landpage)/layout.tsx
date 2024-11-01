import { Footer } from "@/app/components/landpage/Footer";
import Header from "@/app/components/landpage/header";
import LocaleSelecter from "@/app/components/landpage/locale.selecter";
import Navbar from "@/app/components/landpage/Navbar";
import ThemeSwitcher from "@/app/components/landpage/theme-switcher";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { i18n, Locale } from "@/i18n";
import { MenuIcon } from "lucide-react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Samer Alaws | Full Stack Web Developer (Next.js, React)",
  description: "Full Stack Web Developer specializing in modern technologies like Next.js and React.js. Build high-performance web applications.",
  keywords: "Full Stack Web Developer, Next.js, React.js, TypeScript, MongoDB, JavaScript",
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
  metadataBase: new URL("https://alaws.de"),
  robots: "index, follow",
  canonocal: "https://alaws.de",
};


export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={roboto.className}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar params={params}>
          </Navbar>
          <div className="p-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className=" shrink-0 md:hidden" variant="outline" size="icon">
                        <MenuIcon className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[250px] sm:flex-col " side={"left"}>
                <nav className="flex flex-col gap-6 text-lg font-medium mt-2">
                  <Link
                    href="/"
                    className="font-bold text-3xl"
                    >
                      <h1 className="text-3xl font-thin ">
                        Samer
                        <span className="text-3xl  font-bold">
                          Alaws
                        </span>
                      </h1>
                  </Link>
                  <Header lang={params.lang}/>
                  <div className="flex flex-col pl-5 gap-5">
                    <LocaleSelecter />
                    <ThemeSwitcher/>
                  </div>
                </nav>
                </SheetContent>
            </Sheet>
          </div>
          {children}
          <Footer lang={params.lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
