'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AboutProps {
  aboutP1: string
  aboutP2: string
  experience: {
    year: string
    title: string
    company: string
    description: string
  }[]
}

export default function About({ aboutP1, aboutP2, experience }: AboutProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="text-sm font-mono text-accent mb-2">01</p>
            <h2 className="text-4xl md:text-5xl font-bold">About me</h2>
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left column - Main text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {aboutP1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {aboutP2}
              </p>
            </motion.div>

            {/* Right column - Timeline */}
            <motion.div variants={itemVariants} className="space-y-8">
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className="text-accent font-mono text-sm pt-1 min-w-12">{item.year}</div>
                  <div className="flex-1 pb-8 border-l border-muted pl-6">
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-accent mb-2">{item.company}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}