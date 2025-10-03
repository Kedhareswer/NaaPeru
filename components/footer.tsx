"use client"

import { motion } from "framer-motion"

type FooterProps = {
  name?: string
  title?: string
  email?: string
  phone?: string
  location?: string
  socials?: {
    instagram?: string
    behance?: string
    savee?: string
    spotify?: string
  }
}

export function Footer({
  name = "Kedhar",
  title = "Your Title",
  email = "kedhaareeswar.12110026@gmail.com",
  phone = "+00 000 000 00 00",
  location = "Andhra Pradesh, India",
  socials = {},
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="w-full bg-gray-100 py-16 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
          
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-black leading-none" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              K.
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs font-normal" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Crafting digital experiences where AI meets artistry.
            </p>
            <p className="text-xs text-gray-500 mt-8 font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              © {currentYear} Kedhar. All Rights Reserved.
            </p>
          </div>

          {/* Center Column - Connect */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-black tracking-wider uppercase" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              CONNECT
            </h4>
            <div className="space-y-3">
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  LinkedIn
                </a>
              )}
              {socials.behance && (
                <a
                  href={socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Github
                </a>
              )}
              {socials.savee && (
                <a
                  href={socials.savee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Kaggle
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-black tracking-wider uppercase" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              CONTACT
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                {email}
              </p>
              <p className="text-sm text-gray-600 font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                {location}
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
