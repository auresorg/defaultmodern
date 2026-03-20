'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Twitter, Mail, ExternalLink, LucideIcon } from 'lucide-react'

interface ContactProps {
  contactsSubText?: string
  socials: {
    label: string
    href: string
    icon: LucideIcon
    color: string
  }[]
}

export default function Contact({ socials, contactsSubText }: ContactProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-sm font-mono text-accent mb-2">04</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's work together</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {contactsSubText}
            </p>
          </motion.div>

          {/* Contact CTA */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <a href="mailto:hello@example.com">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
              >
                Send me an email
                <Mail className="w-5 h-5" />
              </motion.button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8 flex-wrap"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className={`p-4 rounded-full border border-border hover:border-accent transition-all duration-300 group ${social.color}`}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
                transition={{ duration: 0.2 }}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-24 pt-12 border-t border-border text-center"
          >
            <p className="text-muted-foreground text-sm mb-4">
              Built with React, Next.js, and Framer Motion
            </p>
            <p className="text-xs text-muted-foreground/60">
              © 2024 Your Name. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
