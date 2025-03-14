"use client"
import { useSlideStore } from '@/store/useSlideStore'
import { redirect, useParams, useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'
import { Theme } from '@/lib/types'

type Props = {}

const ThemePreview = (props: Props) => {
    const params = useParams()
    const router = useRouter()
    const controls = useAnimation()
    const {currentTheme, setCurrentTheme, project} = useSlideStore()
    const {selectedTheme, setSelectedTheme} = useState<Theme>(currentTheme)

    useEffect(() => {
      if(project?.slides) {
        redirect(`/presentation/${params.presentationId}`)
      }
    }, [project])

    useEffect(() => {
      controls.start("visible")
    }, [controls, selectedTheme])

  const leftCardContent = (
    <div className='space-y-4'>
      <div className='rounded-xl p-6' style={{color : selectedTheme?.color}}>
      <h3
          className="text-xl font-semibold mb-4"
          style={{ color: selectedTheme.accentColor }}
        >
          Quick Start Guide
        </h3>
        <ol
          className="list-decimal list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Choose a theme</li>
          <li>Customise colors and fonts</li>
          <li>Add your content</li>
          <li>Preview and publish</li>
        </ol>
      </div>
    </div>
  )
}

export default ThemePreview