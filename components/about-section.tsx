"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface Hobby {
  name: string
  description?: string
  icon?: string
}

interface Profile {
  personalInfo?: {
    name?: string
    title?: string
  }
  summary?: string
  hobbies?: Hobby[]
}

interface AboutSectionProps {
  profile?: Profile
}

const hobbyVisuals: Record<string, { image: string; blurhash: string }> = {
  gaming: {
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    blurhash: "L77g:wtR4;R*%gRjR*oJ4.R*R*j[",
  },
  reading: {
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
    blurhash: "LZE3{XITt7bI_3n%ofoz%Ma#Rjj[",
  },
  music: {
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    blurhash: "L3KQ{H00D*M}@G%Mt6Rj9uxuM{t7",
  },
  traveling: {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    blurhash: "L69Rz{IUE0WDx^R*ofof00RjRjt7",
  },
}

const fallbackVisual = {
  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  blurhash: "L47ez{.T^+WA?wxZt7t7_Nt7M{R*",
}

export function AboutSection({ profile }: AboutSectionProps) {
  const name = profile?.personalInfo?.name?.split(" ")[0] || "Kedhar"
  const hobbies = profile?.hobbies ?? []

  const primaryHobby = hobbies[0]
  const otherHobbies = hobbies.slice(1, 4)

  const getVisual = (hobby?: Hobby) => {
    if (!hobby) return fallbackVisual
    const key = hobby.icon?.toLowerCase() || hobby.name?.toLowerCase()
    return key && hobbyVisuals[key] ? hobbyVisuals[key] : fallbackVisual
  }

  return (
    <section className="w-full bg-white py-24 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Narrative */}
          <div className="space-y-8 text-lg leading-relaxed text-slate-700">
            <p className="text-2xl md:text-[28px] leading-[1.6] text-slate-800">
              Hey there, I&apos;m <span className="font-semibold text-slate-900">{name}</span> <span className="ml-1">👋</span>
              <br className="hidden md:block" />
              Welcome to my{' '}
              <span className="inline-block border-b border-sky-400/70 pb-0.5 text-sky-700">digital garden</span>{' '}
              where I nurture ideas, build{' '}
              <span className="inline-block border-b border-emerald-400/70 pb-0.5 text-emerald-600">thoughtful things</span>,
              and chase bold problems in AI.
            </p>

            <p>
              By day, I craft intelligent experiences that feel{' '}
              <span className="font-semibold text-slate-900">human</span>, blending data, design, and engineering. By night,
              I keep sharpening my curiosity—experimenting with{' '}
              <span className="border-b border-amber-400/70 pb-0.5 text-amber-600">creative tools</span>,
              prototyping concepts, and documenting the journey.
            </p>

            <p>
              When I&apos;m not shipping features, you&apos;ll find me{' '}
              {primaryHobby ? (
                <span className="font-semibold text-slate-900">{primaryHobby.name.toLowerCase()}</span>
              ) : (
                <span className="font-semibold text-slate-900">exploring something new</span>
              )},
              diving into{' '}
              <span className="border-b border-purple-400/70 pb-0.5 text-purple-600">curious rabbit holes</span>,
              or planning the next adventure. It&apos;s all part of keeping the mind sharp and the heart inspired.
            </p>
          </div>

          {/* Hobbies Showcase */}
          <div className="grid grid-cols-2 gap-6">
            {primaryHobby && (
              <article className="group col-span-2 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-[0_22px_45px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center justify-between px-6 pt-6 text-sm uppercase tracking-[0.35em] text-slate-500">
                  <span>Hobbies · {primaryHobby.name}</span>
                  <ArrowUpRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-600" />
                </div>
                <div className="relative mt-4 h-56 w-full overflow-hidden">
                  <Image
                    src={getVisual(primaryHobby).image}
                    alt={primaryHobby.name}
                    fill
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                </div>
                <div className="px-6 pb-6 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {primaryHobby.description || "Thoughtful escapes that help me reset and recharge."}
                  </h3>
                </div>
              </article>
            )}

            {otherHobbies.map((hobby) => (
              <article
                key={hobby.name}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_36px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between px-5 pt-5 text-[11px] uppercase tracking-[0.4em] text-slate-500">
                  <span>Hobbies · {hobby.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" />
                </div>
                <div className="relative mt-4 h-40 w-full overflow-hidden">
                  <Image
                    src={getVisual(hobby).image}
                    alt={hobby.name}
                    fill
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    sizes="(min-width: 1024px) 280px, 50vw"
                  />
                </div>
                <div className="px-5 pb-5 pt-5">
                  <p className="text-sm text-slate-600">
                    {hobby.description || "The little rituals that keep my creativity flowing."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
