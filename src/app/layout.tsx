import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/ui/CustomCursor";
import { Background } from "@/components/three/Background";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ritesh Kumar Chauhan | Portfolio",
  description:
    "4th year B.E. student in Information Science and Engineering at BMS College of Engineering, Bangalore. Building performant and beautifully crafted web applications.",
  openGraph: {
    title: "Ritesh Kumar Chauhan | Portfolio",
    description:
      "4th year B.E. student in Information Science and Engineering at BMS College of Engineering, Bangalore, Karnataka, India.",
    type: "website",
    siteName: "Ritesh Kumar Chauhan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritesh Kumar Chauhan | Full Stack Developer",
    description:
      "4th year B.E. student in Information Science and Engineering at BMS College of Engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#030711] text-zinc-50 font-sans">
        <SmoothScrollProvider>
          <CursorProvider>
            <Background />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
