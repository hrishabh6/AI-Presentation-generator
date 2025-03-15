import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Testimonials = () => {
    return (
        <>
            <section className="py-20 md:py-32 bg-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/5 to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Loved by Professionals</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">See what our users are saying about SlideGenius</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-950 p-8 rounded-3xl border border-gray-900">
                                <div className="flex items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                                    &quot;SlideGenius has completely transformed how I create presentations. What used to take hours now takes
                                    minutes, and the results look better than ever.&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                                        <img
                                            src={`/placeholder.svg?height=48&width=48&text=User${i}`}
                                            alt={`User ${i}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">Sarah Johnson</p>
                                        <p className="text-sm text-gray-500">Marketing Director</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-[1px] rounded-3xl">
                    <div className="bg-gray-950 rounded-3xl p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(120,50,255,0.15),transparent_70%)]"></div>
                        <div className="relative">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                                Ready to Transform Your Presentations?
                            </h2>
                            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                                Join thousands of professionals who are creating stunning presentations in minutes.
                            </p>
                            <Link href="/sign-in">
                                <Button className="md:px-10 py-7 text-lg bg-white hover:bg-gray-200 text-black rounded-full">
                                    Get Started for Just $5/month
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Testimonials
