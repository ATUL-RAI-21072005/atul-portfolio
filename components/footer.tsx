'use client'

import Link from "next/link"
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"

function Copyright() {
  return <p className="text-sm text-foreground/70">© {new Date().getFullYear()} Atul Rai. All rights reserved.</p>
}

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Copyright />
          </div>
          <div className="flex space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:atul.rai@example.com"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              <MailIcon className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

