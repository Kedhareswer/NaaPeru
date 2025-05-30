"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const blogPosts = [
  {
    title: "Navigating Machine Learning Pitfalls: From Data Chaos to Model Mastery",
    excerpt:
      "Exploring common machine learning pitfalls including data preprocessing challenges, leakage issues, and model evaluation traps - with practical mitigation strategies.",
    date: "2025-03-06",
    platform: "LinkedIn",
    link: "https://www.linkedin.com/posts/kedhareswernaidu_machinelearning-datascience-datacleaning-activity-7292594788757848064-cTIG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFKPTrMBWgaoeHZGGPkD4kmQ6AoY9JvxObU",
    readTime: "5 min read",
    category: "Machine Learning",
  },
  {
    title: "Mastering Gradient Descent: The Journey to Smarter Predictions",
    excerpt:
      "Explore how gradient descent optimizes machine learning models through iterative refinement, using a practical example of travel time prediction to demonstrate its power in real-world applications.",
    date: "2025-01-20",
    platform: "LinkedIn",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7264226589834448896?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFKPTrMBWgaoeHZGGPkD4kmQ6AoY9JvxObU",
    readTime: "5 min read",
    category: "Machine Learning",
  },
  {
    title: "Building Scalable Machine Learning Systems",
    excerpt: "Sharing insights on designing and implementing machine learning systems that can scale effectively.",
    date: "2024-01-05",
    platform: "LinkedIn",
    link: "/not-found",
    readTime: "6 min read",
    category: "Machine Learning",
  },
]

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 1 })

  return (
    <section id="blog" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">Latest Insights</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of data science, AI, and technology through in-depth analysis and practical
            insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            >
              <a href={post.link} className="block p-6 h-full">
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 50 }}
                    animate={isInView ? { y: 0 } : { y: 50 }}
                    transition={{ duration: 1, delay: index * 0.5, ease: "easeOut" }}
                    className="flex items-center justify-between text-sm text-gray-500"
                  >
                    <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">{post.category}</span>
                    <span className="font-light">{post.date}</span>
                  </motion.div>

                  <motion.h3
                    initial={{ y: 50 }}
                    animate={isInView ? { y: 0 } : { y: 50 }}
                    transition={{ duration: 1, delay: index * 0.5, ease: "easeOut" }}
                    className="text-xl font-light leading-tight group-hover:text-gray-600 transition-colors duration-200 text-gray-900"
                  >
                    {post.title}
                  </motion.h3>

                  <motion.p
                    initial={{ y: 50 }}
                    animate={isInView ? { y: 0 } : { y: 50 }}
                    transition={{ duration: 1, delay: index * 0.5, ease: "easeOut" }}
                    className="text-gray-600 line-clamp-3 leading-relaxed"
                  >
                    {post.excerpt}
                  </motion.p>

                  <motion.div
                    initial={{ y: 50 }}
                    animate={isInView ? { y: 0 } : { y: 50 }}
                    transition={{ duration: 1, delay: index * 0.5, ease: "easeOut" }}
                    className="pt-4 mt-auto flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center text-gray-500 font-light">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {post.readTime}
                    </span>
                    <span className="text-gray-500 font-light">{post.platform}</span>
                  </motion.div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
