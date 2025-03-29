"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skills = [
  { name: "HTML", icon: "/icons/html.svg" },
  { name: "CSS", icon: "/icons/css.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "DBMS", icon: "/icons/database.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "Three.js", icon: "/icons/threejs.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.fromTo(".about-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

    tl.fromTo(
      ".skill-badge",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.4",
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-content">
            <h3 className="text-2xl font-semibold mb-6">BCA Student & Web Developer at Parul University</h3>
            <p className="text-foreground/80 mb-6">
              I'm a passionate web developer with a strong foundation in modern web technologies. Currently pursuing my
              Bachelor's in Computer Applications at Parul University, I specialize in creating interactive and
              user-friendly web experiences.
            </p>
            <p className="text-foreground/80 mb-8">
              My journey in web development started with HTML, CSS, and JavaScript, and has evolved to include modern
              frameworks like React.js. I'm particularly interested in creating immersive user experiences with
              technologies like Three.js and GSAP animations.
            </p>

            <Button className="rounded-full group">
              <DownloadIcon className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download Resume
            </Button>
          </div>

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-badge flex flex-col items-center p-4 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)",
                  }}
                >
                  <div className="w-12 h-12 mb-3 relative">
                    <Image
                      src={`/placeholder.svg?height=48&width=48`}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

