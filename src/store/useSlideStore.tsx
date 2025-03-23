import { ContentItem, Slide, Theme } from '@/lib/types'
import { Project } from '@prisma/client'
import { v4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SlideState {
    slides: Slide[],
    project: Project | null,
    setSlides: (slides: Slide[]) => void
    setProject: (id: Project) => void
    currentTheme : Theme
    currentSlide : number
    removeSlide : (id : string) => void
    setCurrentTheme : (theme: Theme) => void
    getOrderSlides : () => Slide[]
    reorderSlides : (sourceIndex: number, destinationIndex: number) => void
    addSlideIndex : (slide : Slide, index : number) => void
    setCurrentSlide : (index : number) => void
    updateContentItem : (slideId : string, contentId : string, newContent : string | string[] | string[][]) => void
    addComponentInSlide : (slideId : string, item : ContentItem, parentId : string, index : number) => void
}

const defaultTheme : Theme = {
    name : "Default",
    fontFamily : "'Inter', sans-serif",
    fontColor : "#333333",
    backgroundColor : "#f0f0f0",
    slideBackgroundColor : "#ffffff",
    accentColor : "#3b82f6",
    type : "light"
}

export const useSlideStore = create(persist<SlideState>(
    (set, get) => ({
        project: null,
        slides: [],
        setSlides: (slides: Slide[]) => set({ slides }),
        setProject: (project: Project) => set({ project }),
        currentTheme : defaultTheme,
        currentSlide : 0,
        setCurrentTheme : (theme: Theme) => set({ currentTheme : theme }),
        getOrderSlides : () => {
            const state = get()
            return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder)
        },
        reorderSlides : (sourceIndex: number, destinationIndex: number) => {
            set((state) => {
                const newSlides = [...state.slides]
                const [removed] = newSlides.splice(sourceIndex, 1)
                newSlides.splice(destinationIndex, 0, removed)
                return {
                    slides : newSlides.map((slide, index) => ({
                        ...slide,
                        slideOrder : index
                    }))
                }
            } )
        },
        removeSlide : (id : string) => {
            set((state) => {
                return {
                    slides : state.slides.filter(slide => slide.id !== id)
                }
            })
        },
        addSlideIndex : (slide : Slide, index : number) => {
            set((state) => {
               const newSlides = [...state.slides]
               newSlides.splice(index, 0, {...slide, id: v4()})
               newSlides.forEach((slide, index) => {
                     slide.slideOrder = index
               })
               return {slides : newSlides, currentSlide : index}
            })
        },
        setCurrentSlide : (index : number) => {set({currentSlide : index})},
        updateContentItem : (slideId : string, contentId : string, newContent : string | string[] | string[][]) => {
            set((state) => {
                const updateContentRecursively = (item : ContentItem) : ContentItem => {
                    if(item.id === contentId) {
                        return {
                            ...item,
                            content : newContent
                        }
                    }
                   if(Array.isArray(item.content) && item.content.every((i) => typeof i !== 'string')) {
                        return {
                            ...item,
                            content : item.content.map((subItem) => {
                                if(typeof subItem !== 'string') {
                                    return updateContentRecursively(subItem as ContentItem)
                                }
                                return subItem
                            }) as ContentItem[]
                        }
                   }
                    return item
                }
                return {
                    slides : state.slides.map((slide) => {
                        if(slide.id === slideId) {
                            return {
                                ...slide,
                                content : updateContentRecursively(slide.content)
                            }
                        }
                        return slide
                    })
                }
            });
        },
        addComponentInSlide : (slideId : string, item : ContentItem, parentId : string, index : number) => {set((state) => {
            const updatedSlides = state.slides.map((slide) => {
                if(slide.id === slideId) {
                    const updateContentRecursively = (
                        content : ContentItem
                    ) : ContentItem => {
                        if(content.id === parentId && Array.isArray((content.content))) {
                            const updatedContent = [...content.content]
                            updatedContent.splice(index, 0, item)
                            return {
                                ...content,
                                content : updatedContent as unknown as string[]
                            }
                        }
                        return content
                    }
                    return {
                        ...slide,
                        content : updateContentRecursively(slide.content) 
                    }
                }
                return slide
            })
            return {slides : updatedSlides}
        })}
    }),
    {
        name: "slides-storage"
    }
));