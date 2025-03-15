import { Theme } from '@/lib/types'
import { useSlideStore } from '@/store/useSlideStore'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    selectedTheme : Theme
    themes : Theme[]
    onThemeSelect : (theme : Theme) => void
}

const ThemePicker = ({
    onThemeSelect,
    selectedTheme
}: Props) => {
    const router = useRouter()
    const {project, setSlide, currentTheme} = useSlideStore()
  return (
    <div
      className='w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col'
      style={{
        backgroundColor: selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.borderColor}20`
      }}
    >
      <div
        className='p-8 space-y-6 flex-shrink-0'
      >
        <div className='space-y-2'>

        </div>
      </div>
    </div>
  )
}

export default ThemePicker