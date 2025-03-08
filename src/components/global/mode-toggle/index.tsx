"use client"
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import React from 'react'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = React.useState(false)
    const{theme, setTheme} = useTheme()

    React.useEffect(() => setMounted(true), [])

    if (!mounted) return null


  return (
    <div>
        <Switch checked={theme === "light"}
            className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80"
            onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label='Toggle Dark Mode'
        >

        </Switch>
    </div>
  )
}

export default ThemeSwitcher