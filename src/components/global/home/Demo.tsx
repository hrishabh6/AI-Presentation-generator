import React from 'react'

const Demo = () => {
  return (
    <section className="py-20 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10"></div>
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="SlideGenius Demo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Demo
