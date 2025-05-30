'use client'

import { motion } from 'framer-motion'

type FloatingLogoProps = {
  x: number
  y: number
  delay: number
}

const logoMap = {
  'Python': '/logos/python.svg',
  'R': '/logos/r.svg',
  'SQL': '/logos/sql.svg',
  'Machine Learning': '/logos/ml.svg',
  'Deep Learning': '/logos/deep-learning.svg',
  'Computer Vision': '/logos/cv.svg',
  'NLP': '/logos/nlp.svg',
  'Data Analysis': '/logos/data-analysis.svg',
  'Statistical Modeling': '/logos/stats.svg',
  'TensorFlow': '/logos/tensorflow.svg',
  'PyTorch': '/logos/pytorch.svg',
  'Scikit-learn': '/logos/scikit.svg',
  'Pandas': '/logos/pandas.svg',
  'NumPy': '/logos/numpy.svg',
  'Power BI': '/logos/powerbi.svg',
  'Tableau': '/logos/tableau.svg',
  'Azure': '/logos/azure.svg',
  'Git': '/logos/git.svg'
}

export function FloatingLogo({ x, y, delay, skill }: FloatingLogoProps & { skill: string }) {
  const floatAnimation = {
    initial: { x, y, opacity: 0, scale: 0 },
    animate: {
      x: [x - 20, x + 20, x],
      y: [y - 20, y + 20, y],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 3,
        delay,
        repeat: Infinity,
        repeatType: 'loop' as const
      }
    }
  }

  return (
    <motion.div
      className="absolute w-6 h-6 pointer-events-none"
      initial="initial"
      animate="animate"
      variants={floatAnimation}
    >
      <img
        src={logoMap[skill as keyof typeof logoMap]}
        alt={`${skill} logo`}
        className="w-full h-full object-contain"
      />
    </motion.div>
  )
}

export function generateRandomPosition(containerWidth: number, containerHeight: number) {
  return {
    x: Math.random() * containerWidth,
    y: Math.random() * containerHeight
  }
}

export { logoMap }
