"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Environment, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon, ArrowDownIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setFormState({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="space-y-4">
        <div>
          <Input
            name="name"
            placeholder="Your Name"
            value={formState.name}
            onChange={handleChange}
            required
            className="bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formState.email}
            onChange={handleChange}
            required
            className="bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formState.message}
            onChange={handleChange}
            required
            className="min-h-[120px] bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Sending..." : "Send Message"}
          <SendIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />

      {/* Grid background */}
      <gridHelper args={[30, 30, "#8a2be2", "#8a2be2"]} position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Contact form */}
      <group position={[0, 0, 0]}>
        <Html
          transform
          distanceFactor={1.5}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          zIndexRange={[100, 0]}
          className="contact-form-container"
        >
          <ContactForm />
        </Html>
      </group>

      <Environment preset="city" />
    </>
  )
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

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

    tl.fromTo(".contact-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

    tl.fromTo(".contact-canvas", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")

    // Animate the bouncing arrow
    gsap.to(".bounce-arrow", {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-background/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 contact-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect!</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-foreground/80 max-w-xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
          <div className="flex justify-center mt-4">
            <ArrowDownIcon className="h-6 w-6 text-primary bounce-arrow" />
          </div>
        </motion.div>

        <div className="contact-canvas h-[500px] md:h-[600px] w-full max-w-4xl mx-auto">
          <Canvas>
            <Scene />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

