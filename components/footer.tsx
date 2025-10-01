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
  email = "hello@example.com",
  phone = "+00 000 000 00 00",
  location = "City, Country",
  socials = {},
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Parse name to extract first name
  const firstName = "Kedhar"

  return (
    <footer id="footer" className="w-full bg-white border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-10 md:py-12">
        {/* Top Section - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12">
          {/* Column 1: Name and Title */}
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-black">
              STUDIO(0) {firstName}
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {title}
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-0.5">
            <p className="block text-xs text-black">{email}</p>
            <p className="block text-xs text-zinc-600">{phone}</p>
            <p className="text-xs text-zinc-600">{location}</p>
          </div>

          {/* Column 3: Social Links */}
          <div className="space-y-0.5">
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-black hover:text-zinc-600 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {socials.behance && (
              <a
                href={socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-black hover:text-zinc-600 transition-colors"
              >
                GitHub
              </a>
            )}
            {socials.savee && (
              <a
                href={socials.savee}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-black hover:text-zinc-600 transition-colors"
              >
                Kaggle
              </a>
            )}
            {socials.spotify && (
              <a
                href={socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-black hover:text-zinc-600 transition-colors"
              >
                Portfolio
              </a>
            )}
          </div>

          {/* Column 4: Legal Links */}
          <div className="space-y-0.5">
            <a
              href="#"
              className="block text-xs text-black hover:text-zinc-600 transition-colors"
            >
              Imprint
            </a>
            <a
              href="#"
              className="block text-xs text-black hover:text-zinc-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="block text-xs text-black hover:text-zinc-600 transition-colors"
            >
              Terms
            </a>
            <p className="text-xs text-zinc-600">© {currentYear}</p>
          </div>
        </div>

        {/* Bottom Section - Large Name Display */}
        <div className="relative overflow-hidden pt-2">
          <motion.h2
            className="text-[24vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] xl:text-[12vw] font-bold text-zinc-200/25 leading-[0.8] tracking-tighter select-none pointer-events-none"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Kedhar
          </motion.h2>
        </div>
      </div>
    </footer>
  )
}
