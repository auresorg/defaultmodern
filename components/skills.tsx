'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SkillsProps {
  skillsSubText: string,
  skillCategories: {
    category: string,
    skills: {
      name: string,
      level: number
    }[]
  }[]
}

export default function Skills({ skillsSubText, skillCategories }: SkillsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-20">
            <p className="text-sm font-mono text-accent mb-2">02</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Proficiency</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {skillsSubText}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <motion.div key={category.category} variants={itemVariants}>
                {/* Category Title */}
                <h3 className="text-xl font-semibold mb-8 text-foreground">{category.category}</h3>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.3 + idx * 0.08 }}
                    >
                      {/* Skill Name and Level */}
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm text-foreground font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                      </div>

                      {/* Skill Bar */}
                      <div className="relative h-1.5 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 + idx * 0.08, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 h-px bg-gradient-to-r from-accent via-accent/30 to-transparent origin-left"
          />
        </motion.div>
      </div>
    </section>
  )
}
