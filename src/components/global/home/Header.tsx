import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Presentation } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = ({ setMobileMenuOpen }: {
  setMobileMenuOpen: (value: boolean) => void
}) => {
  return (
    <header className="container mx-auto py-4 md:py-6 px-4 flex items-center justify-between backdrop-blur-lg bg-black/70 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Presentation className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
        <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          SlideGenius
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">
          Features
        </a>
        <a href="#marketplace" className="text-gray-300 hover:text-white transition-colors text-sm">
          Marketplace
        </a>
        <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm">
          Pricing
        </a>
        <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm">
          FAQ
        </a>
      </div>
      <div className="flex items-center gap-4">
        <SignedIn>
          <Link href="/dashboard" className="hidden sm:block">
            <Button className="bg-white hover:bg-gray-200 text-black border-0 rounded-full px-5">Go to Dashboard</Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="hidden sm:block text-gray-300 hover:text-white transition-colors text-sm">
            Login
          </Link>
          <Link href="/sign-in" className="hidden sm:block">
            <Button className="bg-white hover:bg-gray-200 text-black border-0 rounded-full px-5">Get Started</Button>
          </Link>


        </SignedOut>
        <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
