'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import Hero from '@/components/hero'
import About from '@/components/about'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import Navigation from '@/components/navigation'

type AuresResponse = {
  username: string
  avatar: string
  email: string
  profile: {
    firstName: string
    lastName: string
    linkedin?: string
  }
  projects: {
    name: string
    desc: string
    url: string
    repo: string
    tech: string[]
  }[]
  experience: {
    title: string
    company: string
    description: string
    startDate: string
    endDate: string
  }[]
  skills: Record<string, number>
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  const [data, setData] = useState<AuresResponse | null>(null)
  const [config, setConfig] = useState<any>(null)
  const [skillsMeta, setSkillsMeta] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [apiRes, configRes, skillsRes] = await Promise.all([
          fetch('https://aures.dev/api/public/mvishok?select=profile,projects,experience,skills,email'),
          fetch('/config.json'),
          fetch('/skills.json'),
        ])

        const apiJson = await apiRes.json()
        const configJson = await configRes.json()
        const skillsJson = await skillsRes.json()

        document.title = `${apiJson.profile.firstName} ${apiJson.profile.lastName}`

        setData(apiJson)
        setConfig(configJson)
        setSkillsMeta(skillsJson)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading || !data) {
    return (
      <main className="h-screen w-full flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">

          {/* Animated loader */}
          <motion.div
            className="w-10 h-10 border-2 border-muted-foreground border-t-foreground rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />

          {/* Text */}
          <p className="text-sm text-muted-foreground">
            Loading portfolio...
          </p>
        </div>
      </main>
    )
  }

  // ---- Reverse map: skill -> category ----
  const skillToCategory: Record<string, string> = {}

  Object.entries(skillsMeta).forEach(([category, skills]) => {
    skills.forEach((skill: string) => {
      skillToCategory[skill.toLowerCase()] = category
    })
  })

  // ---- Group skills properly ----
  const grouped: Record<string, { name: string; level: number }[]> = {}

  Object.entries(data.skills || {}).forEach(([name, level]) => {
    const category =
      skillToCategory[name.toLowerCase()] || 'Other'

    if (!grouped[category]) grouped[category] = []

    grouped[category].push({
      name,
      level: (level as number) * 40,
    })
  })

  const skillCategories = Object.entries(grouped).map(
    ([category, skills]) => ({
      category,
      skills,
    })
  )

  // ---- Rest unchanged ----

  const firstName = data.profile?.firstName || config?.firstName
  const lastName = data.profile?.lastName || config?.lastName

  const experience =
    data.experience?.map((exp) => ({
      year: new Date(exp.startDate).getFullYear().toString(),
      title: exp.title,
      company: exp.company,
      description: exp.description,
    })) || []

  const projects =
    data.projects?.map((p) => ({
      title: p.name,
      description: p.desc,
      tags: p.tech,
      link: p.url || '#',
      github: p.repo ? `https://github.com/${p.repo}` : '#',
      year: '',
    })) || []

  const socials = [
    {
      icon: Github,
      label: 'GitHub',
      href: `https://github.com/${data.username}`,
      color: 'hover:text-white',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: data.profile?.linkedin || '#',
      color: 'hover:text-blue-400',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
      color: 'hover:text-cyan-400',
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${data.email}`,
      color: 'hover:text-red-400',
    },
  ]

  return (
    <main ref={containerRef} className="bg-background text-foreground overflow-hidden">
      <Navigation firstName={`${firstName} ${lastName}`} />

      <Hero
        heroText={firstName}
        heroTextHighlight={lastName}
        heroSubText={config?.heroSubText}
      />

      <About
        aboutP1={config?.aboutP1}
        aboutP2={config?.aboutP2}
        experience={experience}
      />

      <Skills
        skillsSubText={config?.skillsSubText}
        skillCategories={skillCategories}
      />

      <Projects
        projectsSubText={config?.projectsSubText}
        projects={projects}
      />

      <Contact
        socials={socials}
        contactsSubText={config?.contactSubText}
        footer={config?.footer}
        firstName={firstName}
        lastName={lastName}
      />

      <motion.div
        style={{ opacity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-muted-foreground rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </main>
  )
}