import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-tight">
            Create stunning presentations with AI
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into professional presentations in seconds. No design skills required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white hover:bg-gray-200 text-black rounded-full">
                Try for free
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white rounded-full"
            >
              Watch demo
            </Button>
          </div>
        </div>
      </section>
  )
}

export default Hero
