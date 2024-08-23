import Hero from "@/app/components/landpage/Hero";

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

export default function Home() {
    return (
        <>
            <Hero />
        </>
    );
}