import { Theme } from '@/lib/types'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    selectedTheme : string
    themes : Theme[]
    onThemeSelect : (theme : Theme) => void
}

const ThemePicker = ({
    onThemeSelect,
    selectedTheme
}: Props) => {
    const router = useRouter()
  return (
    <div>ThemePicker</div>
  )
}

export default ThemePicker