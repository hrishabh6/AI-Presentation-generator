import React from 'react'
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";


const Pricing = () => {
  return (

<section id="pricing" className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Start creating amazing presentations today
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-[1px] rounded-3xl">
            <div className="bg-gray-950 rounded-3xl p-10">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
                  PREMIUM
                </span>
                <h3 className="text-3xl font-bold mb-3">Unlimited Access</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-bold">$5</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Unlimited AI-generated presentations</span>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Access to all premium templates</span>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Advanced customization options</span>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Export to PowerPoint, PDF, and more</span>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Sell your templates on marketplace</span>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Priority customer support</span>
                </div>
              </div>

              <Link href="/sign-in" className="block">
                <Button className="w-full py-6 text-lg bg-white hover:bg-gray-200 text-black rounded-full">
                  Get Started Now
                </Button>
              </Link>
              <p className="text-center text-gray-500 text-sm mt-4">No credit card required to start</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Pricing
