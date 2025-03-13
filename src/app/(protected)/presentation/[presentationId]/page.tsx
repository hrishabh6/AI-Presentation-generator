"use client"
import { useSlideStore } from '@/store/useSlideStore'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

const Page = (props: Props) => {

  const [isLoadijng, setIsLoading] = React.useState(true)
    const {setSlides, setProject, currentTheme, setCurrentTheme} = useSlideStore()
    const {setTheme} = useTheme()
    const params = useParams()

    useEffect(() => {
      (async () => {
        try {
          const res = await getProjectById(params.presentationId as string)
        } catch (error) {
          console.log(error)
          
        }
      })()
    }, [params])

    
  return (
    <div>page</div>
  )
}

export default Page