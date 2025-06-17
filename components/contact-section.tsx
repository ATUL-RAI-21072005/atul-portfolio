"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
  const [focused, setFocused] = useState<string | null>(null)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (name: string) => {
    setFocused(name)
  }

  const handleBlur = () => {
    setFocused(null)
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
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto backdrop-blur-md bg-background/40 p-10 rounded-xl shadow-lg border border-primary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-8 text-center">Send a Message</h3>
      
      <div className="space-y-6">
        <div className="relative">
          <motion.div 
            className="absolute inset-0 rounded-md -z-10"
            animate={{
              backgroundColor: focused === 'name' ? 'rgba(138, 43, 226, 0.05)' : 'rgba(138, 43, 226, 0)'
            }}
            transition={{ duration: 0.2 }}
          />
          <label className="text-base font-medium text-foreground/70 block mb-2 ml-1">
            Name
          </label>
          <Input
            name="name"
            placeholder="John Doe"
            value={formState.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            required
            className="bg-background/40 border border-primary/20 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-md transition-all duration-200 text-base h-12 px-4"
          />
        </div>
        
        <div className="relative">
          <motion.div 
            className="absolute inset-0 rounded-md -z-10"
            animate={{
              backgroundColor: focused === 'email' ? 'rgba(138, 43, 226, 0.05)' : 'rgba(138, 43, 226, 0)'
            }}
            transition={{ duration: 0.2 }}
          />
          <label className="text-base font-medium text-foreground/70 block mb-2 ml-1">
            Email
          </label>
          <Input
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formState.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            required
            className="bg-background/40 border border-primary/20 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-md transition-all duration-200 text-base h-12 px-4"
          />
        </div>
        
        <div className="relative">
          <motion.div 
            className="absolute inset-0 rounded-md -z-10"
            animate={{
              backgroundColor: focused === 'message' ? 'rgba(138, 43, 226, 0.05)' : 'rgba(138, 43, 226, 0)'
            }}
            transition={{ duration: 0.2 }}
          />
          <label className="text-base font-medium text-foreground/70 block mb-2 ml-1">
            Message
          </label>
          <Textarea
            name="message"
            placeholder="What would you like to discuss?"
            value={formState.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            required
            className="min-h-[150px] bg-background/40 border border-primary/20 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-md resize-none transition-all duration-200 text-base p-4"
          />
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4"
        >
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-md transition-all duration-300 shadow-md text-lg h-14"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Send Message
                <SendIcon className="ml-2 h-5 w-5" />
              </span>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.form>
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

    tl.fromTo(".contact-form", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")

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
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -z-10" />

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

        <div className="contact-form max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

