"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/global/home/Header"
import Hero from "@/components/global/home/Hero"
import Demo from "@/components/global/home/Demo"
import Feature from "@/components/global/home/Feature"
import Marketplace from "@/components/global/home/Marketplace"
import Pricing from "@/components/global/home/Pricing"
import FAQ from "@/components/global/home/FAQ"
import Footer from "@/components/global/home/Footer"
import { Presentation } from "lucide-react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <Header
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col md:hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Presentation className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                HorizonAI
              </span>
            </div>
            <button className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-6 text-lg">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#marketplace"
              className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Link
              href="/sign-in"
              className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-white hover:bg-gray-200 text-black border-0 rounded-full py-3 mt-4">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero/>

      {/* Demo Preview */}
      <Demo/>

      {/* Features Section */}
      <Feature/>

      {/* Marketplace Section */}
      <Marketplace/>
      {/* Pricing Section */}
      <Pricing/>

      {/* FAQ Section */}
      <FAQ/>
      {/* Testimonials */}
      

      {/* Footer */}
      <Footer/>
    </div>
  )
}

