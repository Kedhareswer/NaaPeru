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
    <footer id="footer" className="w-full bg-gray-100 px-6 py-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          
          {/* Left Column - Brand */}
          <div className="space-y-3">
            <h3 className="text-4xl font-black text-black leading-none">
              K.
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-[280px]">
              Crafting digital experiences where AI meets artistry.
            </p>
            <p className="text-xs text-gray-500 pt-4">
              © {currentYear} Kedhar. All Rights Reserved.
            </p>
          </div>

          {/* Center Column - Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-black tracking-wide">
              CONNECT
            </h4>
            <div className="space-y-2">
              {socials.instagram && (
                <div>
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
              {socials.behance && (
                <div>
                  <a
                    href={socials.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Github
                  </a>
                </div>
              )}
              {socials.savee && (
                <div>
                  <a
                    href={socials.savee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Kaggle
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-black tracking-wide">
              CONTACT
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {email}
              </p>
              <p className="text-sm text-gray-600">
                {location}
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
