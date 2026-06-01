import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kadimi Sri Sai Tej — ML Engineer | IIT Kharagpur",
  description:
    "ML Engineer building intelligent systems — from RAG pipelines to trading bots. IIT Kharagpur Physics. PyTorch, LangChain, HuggingFace.",
  openGraph: {
    title: "Kadimi Sri Sai Tej — ML Engineer | IIT Kharagpur",
    description:
      "ML Engineer building intelligent systems — from RAG pipelines to trading bots.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadimi Sri Sai Tej — ML Engineer | IIT Kharagpur",
    description:
      "ML Engineer building intelligent systems — from RAG pipelines to trading bots.",
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
      className={`${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
