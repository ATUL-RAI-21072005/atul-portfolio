"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GithubIcon, LinkedinIcon, MailIcon, ArrowDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import ParticlesBackground from "./particles-background"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function Avatar(props: any) {
  // Using a placeholder model for now
  const { scene } = useGLTF("/assets/3d/duck.glb")
  return <primitive object={scene} scale={2} position={[0, -1, 0]} {...props} />
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [typedText, setTypedText] = useState("")
  const fullText = "Hi, I'm Atul Rai"
  const { theme } = useTheme()

  // Typing effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline()

    tl.fromTo(".hero-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

    // Floating animation for social icons
    gsap.to(".social-icon", {
      y: -10,
      duration: 1.5,
      ease: "sine.inOut",
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Particles Background */}
      <ParticlesBackground />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="hero-content z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Web Developer</h2>
            <h1 ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              {typedText}
              <span className="inline-block w-1 h-8 md:h-12 bg-primary animate-blink ml-1"></span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-lg mb-8">
              BCA student and web developer at Parul University, specializing in creating modern and interactive web
              experiences.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="rounded-full">
                View My Work
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Contact Me
              </Button>
            </div>

            <div className="flex space-x-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-foreground/70 hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
              >
                <GithubIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-foreground/70 hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
              >
                <LinkedinIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="mailto:atul.rai@example.com"
                className="social-icon text-foreground/70 hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
              >
                <MailIcon className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="h-[400px] md:h-[500px] lg:h-[600px] w-full">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Avatar rotation={[0, Math.PI / 4, 0]} />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <ArrowDownIcon className="h-8 w-8 text-primary" />
      </motion.div>
    </section>
  )
}

