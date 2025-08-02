import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wim Wenigerkind - Full-Stack Developer",
  description: "Portfolio of Wim Wenigerkind - 16-year-old passionate developer from Germany with 7 years of coding experience. Specialized in PHP, Symfony, Shopware, Go, Java, Docker, and Kubernetes.",
  keywords: ["Wim Wenigerkind", "Full-Stack Developer", "PHP", "Symfony", "Shopware", "Go", "Java", "Docker", "Kubernetes", "Developer Portfolio"],
  authors: [{ name: "Wim Wenigerkind" }],
  creator: "Wim Wenigerkind",
  publisher: "Wim Wenigerkind",
  openGraph: {
    title: "Wim Wenigerkind - Full-Stack Developer",
    description: "Portfolio of Wim Wenigerkind - 16-year-old passionate developer from Germany with 7 years of coding experience.",
    url: "https://wimwenigerkind.com",
    siteName: "Wim Wenigerkind Portfolio",
    type: "website",
    images: [
      {
        url: "https://images.wimwenigerkind.com/wimwenigerkind-transparent-icon.png",
        width: 512,
        height: 512,
        alt: "Wim Wenigerkind Profile",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Wim Wenigerkind - Full-Stack Developer",
    description: "Portfolio of Wim Wenigerkind - 16-year-old passionate developer from Germany with 7 years of coding experience.",
    images: ["https://images.wimwenigerkind.com/wimwenigerkind-transparent-icon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512", 
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
