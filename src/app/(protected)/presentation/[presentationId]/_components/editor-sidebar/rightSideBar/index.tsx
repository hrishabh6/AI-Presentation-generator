"use client"
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useSlideStore } from '@/store/useSlideStore'
import { LayoutTemplateIcon, PanelLeft, Type } from 'lucide-react'
import React from 'react'
import { LayoutChooser } from './tabs/LayoutChooser'
import { ScrollArea } from '@/components/ui/scroll-area'
import { component } from '@/lib/constants'
import ComponentCard from './tabs/components-tabs/ComponentPreview'
import ThemeChooser from './tabs/ThemeChooser'



const EditorSideBar = () => {

    const { currentTheme } = useSlideStore()

    return (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
            <div
                className="rounded-xl border-r-0 border border-background-70 
      shadow-lg p-2 flex flex-col items-center space-y-4"
            >
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="h-10 w-10 rounded-full"
                        >
                            <LayoutTemplateIcon className="h-5 w-5" />
                            <span className="sr-only">Choose Layout</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="w-[480px] p-0"
                        style={{
                            backgroundColor: currentTheme.backgroundColor,
                            color: currentTheme.fontColor,
                        }}
                    >
                        <LayoutChooser />
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="h-10 w-10 rounded-full"
                        >
                            <Type className="h-5 w-5" />
                            <span className="sr-only">Choose Layout</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="w-[480px] p-0"
                        style={{
                            backgroundColor: currentTheme.backgroundColor,
                            color: currentTheme.fontColor,
                        }}
                    >
                        <ScrollArea className='h-[400px]'>
                            <div className='p-4 flex flex-col spacey-y-6'>
                                {component.map((group, index) => (
                                    <div
                                        key={index}
                                        className='space-y-2'
                                    >
                                        <h3
                                            className='text-sm font-medium text-muted-foreground px-1'
                                        >
                                            {group.name}
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {group.components.map((item) => (
                                                <ComponentCard key={item.componentType} item={item} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="h-10 w-10 rounded-full"
                        >
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Change Style</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="w-80"
                        style={{
                            backgroundColor: currentTheme.backgroundColor,
                            color: currentTheme.fontColor,
                        }}
                    >
                        <ThemeChooser />
                    </PopoverContent>
                </Popover>
                                

            </div>
        </div>
    )
}

export default EditorSideBar