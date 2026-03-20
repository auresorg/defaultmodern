'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  heroText: string,
  heroTextHighlight: string,
  heroSubText: string,
}

export default function Hero({ heroText, heroTextHighlight, heroSubText }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-accent opacity-[0.03] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-5 w-96 h-96 bg-accent opacity-[0.02] rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/*
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
            Welcome to my portfolio
          </span>
        </motion.div> */}

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="inline">{heroText}</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent/70">
            {heroTextHighlight}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {heroSubText}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-2">
              View my work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="px-8 py-4 border border-muted-foreground text-foreground rounded-lg font-medium hover:border-primary hover:bg-primary/5 transition-all duration-300">
            Get in touch
          </button>
        </motion.div>

        {/* Scroll indicator - animated */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-muted-foreground"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
