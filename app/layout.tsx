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
  title: "HiData - Data Science, AI & Job Portal in India",
  description:
    "Explore the latest news in Data Science, AI, Machine Learning, and find top career opportunities in India. Includes interactive timelines of Data, Data Science, and AI history. Perfect for students and professionals.",
  keywords:
    "data science, artificial intelligence, machine learning, AGI, jobs in India, pharma data, CRO jobs, data careers",
  authors: [{ name: "HiData" }],
  openGraph: {
    title: "HiData - Your Gateway to Data & AI",
    description:
      "Latest news, job opportunities, and learning resources for data professionals in India",
    url: "https://hidata.co.in",
    siteName: "HiData",
    images: [
      {
        url: "https://hidata.co.in/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
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
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
