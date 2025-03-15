import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const FAQ = () => {
  return (
    <section id="faq" className="container mx-auto px-4 py-16 md:py-20 lg:py-32">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about SlideGenius
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
            <AccordionItem
              value="item-1"
              className="border border-gray-800 rounded-2xl px-4 md:px-6 py-1 md:py-2 bg-gray-950"
            >
              <AccordionTrigger className="text-base md:text-xl font-medium py-3 md:py-4 hover:no-underline">
                How does the AI presentation builder work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm md:text-lg pb-4 md:pb-6 pt-1 md:pt-2">
                SlideGenius uses advanced AI algorithms to analyze your content and automatically generate
                professionally designed slides. Simply input your content or topic, and our AI will create a complete
                presentation with appropriate layouts, typography, and visual elements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-gray-800 rounded-2xl px-4 md:px-6 py-1 md:py-2 bg-gray-950"
            >
              <AccordionTrigger className="text-base md:text-xl font-medium py-3 md:py-4 hover:no-underline">
                Can I customize the AI-generated presentations?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm md:text-lg pb-4 md:pb-6 pt-1 md:pt-2">
                Absolutely! While our AI creates a great starting point, you have full control to customize every aspect
                of your presentation. You can modify layouts, change colors and fonts, add or remove elements, and make
                any other adjustments to match your specific needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-gray-800 rounded-2xl px-4 md:px-6 py-1 md:py-2 bg-gray-950"
            >
              <AccordionTrigger className="text-base md:text-xl font-medium py-3 md:py-4 hover:no-underline">
                How do I sell my templates on the marketplace?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm md:text-lg pb-4 md:pb-6 pt-1 md:pt-2">
                Creating and selling templates is easy. Design your template using our editor, submit it for review, and
                once approved, it will be listed on our marketplace. You set your own price and earn a commission every
                time someone purchases your template. Our review process ensures all templates meet our quality
                standards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-gray-800 rounded-2xl px-4 md:px-6 py-1 md:py-2 bg-gray-950"
            >
              <AccordionTrigger className="text-base md:text-xl font-medium py-3 md:py-4 hover:no-underline">
                What file formats can I export my presentations to?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm md:text-lg pb-4 md:pb-6 pt-1 md:pt-2">
                SlideGenius allows you to export your presentations in multiple formats including PowerPoint (.pptx),
                PDF, Google Slides, and image formats (PNG, JPG). This ensures compatibility with whatever platform you
                need to use for your presentation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-gray-800 rounded-2xl px-4 md:px-6 py-1 md:py-2 bg-gray-950"
            >
              <AccordionTrigger className="text-base md:text-xl font-medium py-3 md:py-4 hover:no-underline">
                Is there a limit to how many presentations I can create?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm md:text-lg pb-4 md:pb-6 pt-1 md:pt-2">
                With our $5/month premium plan, you can create unlimited presentations. There are no restrictions on the
                number of slides, presentations, or exports. You also get full access to all premium templates and
                features.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

  )
}

export default FAQ
