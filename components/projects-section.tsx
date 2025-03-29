"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, PresentationControls } from "@react-three/drei"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    id: 1,
    title: "AI-Powered Drone Control System",
    description: "A drone controlled via Bluetooth API, face recognition, and real-time pitch/roll/yaw movements.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "Node.js", "TensorFlow.js", "Bluetooth API"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 2,
    title: "Interactive Portfolio Website",
    description: "A highly animated personal website built with React.js, GSAP, and Three.js.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React.js", "GSAP", "Three.js", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 3,
    title: "E-Commerce Web App",
    description: "A full-stack e-commerce store with React.js, Firebase, and Stripe payment integration.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React.js", "Firebase", "Stripe", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
]

function ProjectModel({ project, index, totalProjects, ...props }: any) {
  // Using a placeholder model for now
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Position the model based on its index
  const angle = (index / totalProjects) * Math.PI * 2
  const radius = 4
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  return (
    <group position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]} {...props}>
      <primitive object={scene} scale={1.5} />
    </group>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeProject, setActiveProject] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const nextProject = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 300)
  }

  const prevProject = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
    }, 300)
  }

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

    tl.fromTo(".projects-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

    tl.fromTo(
      ".project-carousel",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-background/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 projects-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Notable Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="project-carousel">
          <div className="flex justify-center mb-12">
            <div className="h-[400px] md:h-[500px] w-full max-w-4xl">
              <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <PresentationControls
                  global
                  rotation={[0, -Math.PI / 4, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                  config={{ mass: 2, tension: 400 }}
                  snap={{ mass: 4, tension: 400 }}
                >
                  {projects.map((project, index) => (
                    <ProjectModel key={project.id} project={project} index={index} totalProjects={projects.length} />
                  ))}
                </PresentationControls>
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full">
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              <h3 className="text-2xl font-semibold">{projects[activeProject].title}</h3>
              <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full">
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>

            <div
              className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 transform perspective-1000"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div
                className="relative backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  visibility: isFlipped ? "hidden" : "visible",
                }}
              >
                <Image
                  src={projects[activeProject].image || "/placeholder.svg"}
                  alt={projects[activeProject].title}
                  width={800}
                  height={450}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <p className="mb-4">{projects[activeProject].description}</p>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-primary"
                      onClick={() => setIsFlipped(true)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 p-6 backface-hidden bg-card"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  visibility: isFlipped ? "visible" : "hidden",
                }}
              >
                <h4 className="text-xl font-semibold mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[activeProject].technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-auto">
                  <Button asChild>
                    <a href={projects[activeProject].demoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                      <ExternalLinkIcon className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={projects[activeProject].githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                      <GithubIcon className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <Button variant="ghost" className="absolute top-4 right-4" onClick={() => setIsFlipped(false)}>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

