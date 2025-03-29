"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const experiences = [
  {
    id: 1,
    title: "Web Developer",
    company: "Parul University",
    period: "2023 - Present",
    description:
      "Developing and maintaining university web applications. Collaborating with the design team to implement responsive and accessible interfaces.",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "Tech Startup",
    period: "2022 - 2023",
    description:
      "Assisted in developing user interfaces using React.js. Implemented responsive designs and collaborated with the backend team.",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    title: "BCA Student",
    company: "Parul University",
    period: "2021 - Present",
    description:
      "Studying Bachelor of Computer Applications with focus on web development, database management, and software engineering.",
    logo: "/placeholder.svg?height=80&width=80",
  },
]

const certifications = [
  {
    id: 1,
    name: "Full Stack Web Development",
    issuer: "NASSCOM",
    date: "2023",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "React.js Advanced Concepts",
    issuer: "NPTEL",
    date: "2022",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Database Management Systems",
    issuer: "Parul University",
    date: "2022",
    logo: "/placeholder.svg?height=60&width=60",
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.fromTo(".experience-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

    tl.fromTo(
      ".timeline-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.4",
    )

    tl.fromTo(
      ".certification-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.8",
    )

    // Animate the timeline line
    gsap.fromTo(
      ".timeline-line",
      { height: 0 },
      {
        height: "100%",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      },
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 experience-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Certifications</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8">Work & Education</h3>

            <div ref={timelineRef} className="relative pl-8">
              {/* Timeline line */}
              <div className="timeline-line absolute left-3 top-2 bottom-2 w-0.5 bg-primary/30 z-0" />

              {experiences.map((exp, index) => (
                <div key={exp.id} className="timeline-item relative mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-[-30px] top-0 w-6 h-6 rounded-full border-2 border-primary bg-background z-10" />

                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 relative mr-4 rounded-full overflow-hidden bg-background/50 flex items-center justify-center">
                        <Image
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{exp.title}</h4>
                        <p className="text-sm text-foreground/70">
                          {exp.company} | {exp.period}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground/80">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8">Certifications</h3>

            <div className="grid grid-cols-1 gap-6">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="certification-item bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 relative mr-4 rounded-full overflow-hidden bg-background/50 flex items-center justify-center">
                    <Image
                      src={cert.logo || "/placeholder.svg"}
                      alt={cert.issuer}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{cert.name}</h4>
                    <p className="text-sm text-foreground/70">
                      {cert.issuer} | {cert.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

