"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    name: "Jagadesh Chilla",
    role: "Founder and Developer Of DIVA AIA",
    text: "An exceptional colleague with deep expertise in machine learning and data visualization. His innovative approaches to problem-solving have significantly impacted our project.",
    image: "/testimonials/chilla.jpg",
    linkedin: "https://www.linkedin.com/in/chilla-jagadesh-532246223/"
  },
  {
    name: "Manish Chetla",
    role: "Video Game Developer at MC Studios",
    text: "Outstanding analytical skills and a natural talent for explaining complex concepts. His contributions to our team have been invaluable.",
    image: "/testimonials/manish.svg",
    linkedin: "https://www.linkedin.com/in/manish-chetla/"
  },
  {
    name: "Ajay Sharma",
    role: "Senior Tech Mentor at upGrad Campus",
    text: "His attention to detail and technical skills have consistently impressed me. As his professor and mentor for nearly a year, I witnessed his growth and dedication. I am confident he will achieve great success in the future.",
    image: "/testimonials/AjaySharma.jpeg",
    linkedin: "https://www.linkedin.com/in/ajay-sharma-%F0%9F%87%AE%F0%9F%87%B3-52879b88/"
  },
  {
    name: "Sarah Chen",
    role: "ML Operations Engineer",
    text: "A brilliant problem-solver who consistently delivers innovative solutions. Their deep understanding of ML systems and ability to optimize workflows has transformed our deployment pipeline.",
    image: "/testimonials/sarah.svg",
    linkedin: "https://www.linkedin.com/in/sarah-chen-ml/"
  },
  {
    name: "David Wilson",
    role: "Data Engineering Director",
    text: "Exceptional talent in both technical implementation and strategic thinking. Their contributions to our data infrastructure have been foundational to our success in AI initiatives.",
    image: "/testimonials/david.svg",
    linkedin: "https://www.linkedin.com/in/david-wilson-data/"
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 md:mb-4">Testimonials</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">What colleagues and clients say about my work</p>
        </motion.div>

        <div className="relative max-w-[280px] xs:max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
          <Carousel opts={{
            align: "start",
            loop: true,
          }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white h-full">
                <div className="mb-4">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-black opacity-20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">{testimonial.text}</p>
                <div className="border-t pt-4 flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-gray-200">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm sm:text-base hover:text-blue-600 transition-colors duration-200"
                    >
                      {testimonial.name}
                    </a>
                    <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                </div>
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12 sm:-left-16" />
            <CarouselNext className="hidden sm:flex -right-12 sm:-right-16" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}