"use client"

import { motion } from "framer-motion"
import { ClientsSection, Stat, Testimonial } from "@/components/ui/testimonial-card"

// Convert existing testimonials data to new format
const statsData: Stat[] = [
  { value: "5+", label: "Happy Clients" },
  { value: "100%", label: "Satisfaction" },
  { value: "4.9", label: "Average Rating" },
];

const testimonialsData: Testimonial[] = [
  {
    name: "Jagadesh Chilla",
    title: "Founder and Developer Of DIVA AIA",
    quote: "An exceptional colleague with deep expertise in machine learning and data visualization. His innovative approaches to problem-solving have significantly impacted our project.",
    avatarSrc: "/testimonials/chilla.jpg",
    rating: 5.0,
  },
  {
    name: "Manish Chetla",
    title: "Video Game Developer at MC Studios",
    quote: "Outstanding analytical skills and a natural talent for explaining complex concepts. His contributions to our team have been invaluable.",
    avatarSrc: "/testimonials/manish.jpeg",
    rating: 4.9,
  },
  {
    name: "Ajay Sharma",
    title: "Senior Tech Mentor at upGrad Campus",
    quote: "His attention to detail and technical skills have consistently impressed me. As his professor and mentor for nearly a year, I witnessed his growth and dedication. I am confident he will achieve great success in the future.",
    avatarSrc: "/testimonials/AjaySharma.jpeg",
    rating: 5.0,
  },
  {
    name: "Suhail Mahamad",
    title: "ML Operations Engineer",
    quote: "A brilliant problem-solver who consistently delivers innovative solutions. His deep understanding of AI systems and ability to optimize workflows has transformed our deployment pipeline.",
    avatarSrc: "/testimonials/suhail.jpg",
    rating: 4.8,
  },
  {
    name: "Aman Kumar",
    title: "Assistant Manager at upGrad",
    quote: "A dedicated student with strong technical skills and eagerness to learn. His work ethic and attention to detail have been impressive throughout the course.",
    avatarSrc: "/testimonials/aman.jpg",
    rating: 4.7,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-white to-gray-50">
      <ClientsSection
        tagLabel="Kind Words"
        title="What People Say"
        description="Trusted by colleagues and clients who appreciate my work ethic, technical skills, and dedication to delivering exceptional results."
        stats={statsData}
        testimonials={testimonialsData}
        primaryActionLabel="Email Me"
        secondaryActionLabel="View Projects"
      />
    </section>
  )
}
