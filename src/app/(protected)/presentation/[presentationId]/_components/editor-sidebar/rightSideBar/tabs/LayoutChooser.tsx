"use client"
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useSlideStore } from '@/store/useSlideStore'
import { Layout } from '@/lib/types'
import { useDrag } from 'react-dnd'
import LayoutPreviewItem from './components-tabs/LayoutPreviewItem'
import { layouts } from '@/lib/constants'





export const DraggableLayoutItem = ({
  component,
  icon,
  layoutType,
  name,
  type
}: Layout) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "layout",
    item: { type, layoutType, component },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const {currentTheme} = useSlideStore()

  return (


    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      style={{
        opacity: isDragging ? "0.5" : "1",
        backgroundColor: currentTheme.slideBackgroundColor,
      }}
      className="border rounded-lg"
    >
      <LayoutPreviewItem
        name={name}
        Icon={icon}
        type={type}
        component={component}
      />
    </div>
  )
}



export const LayoutChooser = () => {
    const { currentTheme } = useSlideStore()
    
  return (
    <ScrollArea
      className="h-[400px]"
      style={{ backgroundColor: currentTheme.slideBackgroundColor }}
    >
        <div className="p-4">
        {layouts.map((group) => (
          <div key={group.name} className="mb-b">
            <h3 className="text-sm font-medium my-4">{group.name}</h3>
            <div className="grid grid-cols-3 gap-2">
              {group.layouts.map((layout) => (
                <DraggableLayoutItem key={layout.layoutType} {...layout} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

