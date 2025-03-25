"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutSlides, Slide } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { v4 } from 'uuid';
import { MasterRecursiveComponent } from './MasterRecursiveComponent';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { updateSlides } from '@/actions/project';


interface DropZoneProps {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
  
}


export const DropZone: React.FC<DropZoneProps> = ({
  index,
  isEditable,
  onDrop,
  
}) => {

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ['SLIDE', 'layout'],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  if (!isEditable) {
    return null
  }

  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "h-4 my-2 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop here
        </div>
      )}
    </div>
  )
}

interface DraggableSlidesProps {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
}

const DraggableSlides: React.FC<DraggableSlidesProps> = ({
  handleDelete,
  index,
  isEditable,
  moveSlide,
  slide,
}) => {
  const ref = useRef(null)
  const { currentSlide, currentTheme, setCurrentSlide, updateContentItem } = useSlideStore()

  const [{ isDragging }, drag] = useDrag({
    type: 'SLIDE',
    item: { index, type: 'SLIDE' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: isEditable
    })

  })

  const [, drop] = useDrop({
    accept : ['SLIDE', 'LAYOUT'],
    hover(item : {index : number; type : string}){
      if(!ref.current || !isEditable){
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if(item.type === 'SLIDE') {
        if(dragIndex === hoverIndex) {
          return
        }
        moveSlide(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    }
  })

  drag(drop(ref))

  const handleContentChange = (contentId: string, newContent: string | string[] | string[][]) => {
    console.log('Content Changed', slide, contentId, newContent)
    if (isEditable) {
      updateContentItem(slide.id, contentId, newContent)
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px] py-10",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index == currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{ backgroundImage: currentTheme.gradientBackground }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full flex-grow overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          slideId={slide.id}
          onContentChange={handleContentChange}
          isEditable={isEditable}
          isPreview={false}
        />
      </div>
      {isEditable && (
        <Popover>
          <PopoverTrigger asChild className="absolute top-2 right-2">
            <Button variant={"outline"} size={"sm"}>
              <EllipsisVertical className="w-5 h-5" />
              <span className="sr-only">Slide options</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p=-0">
            <div className="flex space-x-2">
              <Button variant={"ghost"} onClick={() => handleDelete(slide.id)}>
                <Trash2 className="w-5 h-5 text-red-500" />
                <span className="sr-only">Delete slide</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}


type Props = {
  isEditable: boolean;
  isSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Editor = ({ isEditable, isSaving }: Props) => {
  const {
    slides,
    getOrderSlides,
    currentSlide,
    removeSlide,
    reorderSlides,
    project,
    addSlideIndex,
  } = useSlideStore();

  const orderedSlide = getOrderSlides()
  const [loading, setLoading] = useState(true);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moveSlide = (dragIndex: number, HoverIndex: number) => {
    if (!isEditable) return;
    reorderSlides(dragIndex, HoverIndex);
  }

  const handleDelete = (id: string) => {
    if (isEditable) {
      console.log('Deleting', id)
    }
    removeSlide(id)
  }

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) return;
    if (item.type === "layout") {
      addSlideIndex(
        {
          ...item.component,
          id: v4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };
  
  const saveSlides = useCallback(() => {
      if(isEditable && project) {
        (async () => {
          isSaving(true)
          await updateSlides(project.id, JSON.parse(JSON.stringify(slides)))
          isSaving(false)
        })()
      }
  }, [isEditable, slides, project])

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }, [currentSlide])

  useEffect(() => {
    if(typeof window !== 'undefined') {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
     if(autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current)   
     }
     
     if(isEditable) {
        autosaveTimeoutRef.current = setTimeout(() => {
          saveSlides()
        }, 2000)
     }

      return () => {
        if(autosaveTimeoutRef.current) {
          clearTimeout(autosaveTimeoutRef.current)
        }
      }

  }, [slides, isEditable, project])




  return (
    <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {loading ? (
        <div className=" w-full px-4 flex flex-col space-y-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <ScrollArea className='flex mt-8'>
          <div className='px-4 pb-4 w-full flex flex-col gap-4 pt-2 ml-4'>
            {
              isEditable &&
               <DropZone
                index={0}
                isEditable={isEditable}
                onDrop={handleDrop}
              />
            }
            {orderedSlide.map((slide, index) => (
              <React.Fragment
                key={ index}
              >
                <DraggableSlides
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  handleDelete={handleDelete}
                  isEditable={isEditable}

                />
                
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

