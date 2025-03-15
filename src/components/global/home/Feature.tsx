import { Presentation, Sparkles, Zap } from 'lucide-react'
import React from 'react'

const Feature = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-16 md:py-20 lg:py-32">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            Why Choose SlideGenius
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            The most advanced AI presentation builder on the market
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <div className="bg-gray-950 p-6 md:p-10 rounded-3xl border border-gray-900 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10 group">
            <div className="bg-purple-500/10 p-3 md:p-4 rounded-2xl w-fit mb-4 md:mb-6 group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">AI-Powered Design</h3>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Our advanced AI analyzes your content and creates perfectly designed slides with optimal layouts.
            </p>
          </div>

          <div className="bg-gray-950 p-6 md:p-10 rounded-3xl border border-gray-900 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10 group">
            <div className="bg-pink-500/10 p-3 md:p-4 rounded-2xl w-fit mb-4 md:mb-6 group-hover:bg-pink-500/20 transition-colors">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-pink-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Lightning Fast</h3>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Create professional presentations in seconds, not hours. Save time and focus on your message.
            </p>
          </div>

          <div className="bg-gray-950 p-6 md:p-10 rounded-3xl border border-gray-900 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/10 group sm:col-span-2 lg:col-span-1">
            <div className="bg-amber-500/10 p-3 md:p-4 rounded-2xl w-fit mb-4 md:mb-6 group-hover:bg-amber-500/20 transition-colors">
              <Presentation className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Premium Templates</h3>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Access hundreds of professionally designed templates for any presentation need.
            </p>
          </div>
        </div>
      </section>
  )
}

export default Feature
