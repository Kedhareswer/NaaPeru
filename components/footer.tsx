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
    <footer className="w-full bg-white border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10">
        {/* Top Section - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-10">
          {/* Column 1: Name and Title */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-900 tracking-wide">
              STUDIO(0) {firstName}
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-[240px]">
              {title}
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-2">
            <a
              href={`mailto:${email}`}
              className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="block text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {phone}
            </a>
            <p className="text-sm text-zinc-600">{location}</p>
          </div>

          {/* Column 3: Social Links */}
          <div className="space-y-2">
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {socials.behance && (
              <a
                href={socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                GitHub
              </a>
            )}
            {socials.savee && (
              <a
                href={socials.savee}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                Kaggle
              </a>
            )}
            {socials.spotify && (
              <a
                href={socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                Portfolio
              </a>
            )}
          </div>

          {/* Column 4: Legal Links */}
          <div className="space-y-2">
            <a
              href="#"
              className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              Imprint
            </a>
            <a
              href="#"
              className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="block text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              Terms
            </a>
            <p className="text-sm text-zinc-600">© {currentYear}</p>
          </div>
        </div>

        {/* Bottom Section - Large Name Display */}
        <div className="relative overflow-hidden py-8 md:py-12">
          <motion.h2
            className="text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] font-extrabold text-zinc-200 leading-[0.85] tracking-tighter select-none pointer-events-none"
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
