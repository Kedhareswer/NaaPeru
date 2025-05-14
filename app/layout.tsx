import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import PageTransition from "@/components/page-transition"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kedhareswer - Data Science Portfolio",
  description: "Explore my journey in data science, AI, and machine learning. View my projects, skills, and experience in creating data-driven solutions.",
  keywords: ["data science", "machine learning", "AI", "portfolio", "projects", "Kedhareswer"],
  authors: [{ name: "Kedhareswer" }],
  openGraph: {
    title: "Kedhareswer - Data Science Portfolio",
    description: "Explore my journey in data science, AI, and machine learning. View my projects, skills, and experience.",
    url: "https://kedhareswer-portfolio.vercel.app",
    siteName: "Kedhareswer Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kedhareswer Portfolio"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kedhareswer - Data Science Portfolio",
    description: "Explore my journey in data science, AI, and machine learning. View my projects, skills, and experience.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://kedhareswer-portfolio.vercel.app" />
      </head>
      <body className={inter.className}>
        <PageTransition>
          {children}
        </PageTransition>
        <Analytics />
      </body>
    </html>
  )
}