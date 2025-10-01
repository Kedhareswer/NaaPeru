import "./globals.css"
import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"

export const metadata = {
  title: "Kedhar - AI/ML & Data Science Portfolio",
  description: "Portfolio showcasing AI/ML projects and innovative solutions",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="pt-0">{children}</main>
      </body>
    </html>
  )
}
