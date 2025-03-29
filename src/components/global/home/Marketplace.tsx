import { DollarSign, PlusCircle, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

const imgArray = [
  {
    id: 1,
    src: "/images/template1.jpg"
  },
  {
    id: 2,
    src: "/images/template2.jpg"
  },
  {
    id: 3,
    src: "/images/template3.jpg"
  },
  {
    id: 4,
    src: "/images/template1.jpg"
  },
]


const Marketplace = () => {
  return (
    <section id="marketplace" className="py-16 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-block mb-4 md:mb-6 px-4 py-1 rounded-full bg-gray-900 border border-gray-800">
              <p className="text-sm flex items-center gap-2">
                <span className="bg-purple-500 rounded-full h-2 w-2 inline-block"></span>
                New Feature
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight leading-tight">
              Create & Sell Your Own Templates
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed">
              Design unique presentation templates and sell them on our marketplace. Turn your creativity into income
              while helping others create stunning presentations.
            </p>
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <PlusCircle className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">Create Custom Templates</h4>
                  <p className="text-sm md:text-base text-gray-400">
                    Design unique templates with our easy-to-use editor
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-pink-500/10 p-2 rounded-lg mt-1">
                  <ShoppingCart className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">List on Marketplace</h4>
                  <p className="text-sm md:text-base text-gray-400">
                    Share your templates with thousands of users worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-amber-500/10 p-2 rounded-lg mt-1">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">Earn Passive Income</h4>
                  <p className="text-sm md:text-base text-gray-400">
                    Get paid every time someone purchases your template
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg bg-white hover:bg-gray-200 text-black rounded-full">
              Learn more about selling
            </Button>
          </div>
          <div className="relative mt-10 lg:mt-0">
            <div className="absolute -inset-10 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 md:p-6 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs md:text-sm text-gray-400">Template Marketplace</div>
                <div className="w-16"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4 p-4 md:p-6">
                {imgArray.map((img, index) => (
                  <div key={index} className="bg-gray-900 rounded-xl overflow-hidden group cursor-pointer">
                    <div className="aspect-video bg-gray-800 relative">
                      <img
                        src={img.src}
                        alt={`Template ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs md:text-sm font-medium">Preview</span>
                      </div>
                    </div>
                    <div className="p-2 md:p-3">
                      <h4 className="font-medium text-xs md:text-sm mb-1">Business Template {index + 1}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">by Designer {index + 1}</span>
                        <span className="text-xs font-medium">$4.99</span>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Marketplace
