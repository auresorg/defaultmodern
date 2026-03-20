'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectsProps {
  projectsSubText: string
  projects: {
    title: string
    description: string
    tags: string[]
    link: string
    github: string
    year: string
  }[]
}

export default function Projects({ projects, projectsSubText }: ProjectsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-20">
            <p className="text-sm font-mono text-accent mb-2">03</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {projectsSubText}
            </p>
          </motion.div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="group flex flex-col"
              >
                {/* Card */}
                <div className="relative flex-1 rounded-xl border border-border p-8 bg-background/40 hover:bg-background/60 transition-colors duration-300 flex flex-col">
                  {/* Year Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/20">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors duration-300 pr-20">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="px-2.5 py-1 rounded text-xs bg-border text-muted-foreground hover:text-accent transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-border">
                    <motion.a
                      href={project.link}
                      whileHover={{ x: 2 }}
                      className="inline-flex items-center gap-1.5 text-accent hover:text-primary transition-colors font-medium text-sm"
                    >
                      View
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      whileHover={{ x: 2 }}
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors font-medium text-sm"
                    >
                      Code
                      <Github className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
