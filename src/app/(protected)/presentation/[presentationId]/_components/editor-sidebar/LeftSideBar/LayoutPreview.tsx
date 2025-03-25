import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect } from 'react'
import DraggableSlidePreview from './DraggableSlidePreview'


const LayoutPreview = () => {
    const { getOrderSlides, reorderSlides } = useSlideStore()
    const slides = getOrderSlides()
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoading(false)
        }
    }, [])

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        reorderSlides(dragIndex, hoverIndex)
    }

    return (
        <div className="w-72 h-full fixed left-0 top-20 border-r overflow-y-auto">
            <ScrollArea
                className='h-full w-full'
                suppressHydrationWarning
            >
                {loading ?
                    (
                        <div className=" w-full px-4 flex flex-col space-y-6">
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    )
                    :
                    (
                        <div className="p-4 pb-32 space-y-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">
                                    SLIDES
                                </h2>
                                <span
                                    className="text-xs dark:text-gray-200 text-gray-400"
                                    suppressHydrationWarning
                                >
                                    {slides?.length} slides
                                </span>
                            </div>
                            {slides.map((slide, index) => (
                                <DraggableSlidePreview
                                    key={slide.id || index}
                                    slide={slide}
                                    index={index}
                                    moveSlide={moveSlide}
                                />
                            ))}
                        </div>
                    )
                }
            </ScrollArea>
        </div>
    )
}

export default LayoutPreview