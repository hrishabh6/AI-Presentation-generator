import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React, { KeyboardEvent } from 'react'

type ListProps = {
    items: string[]
    isEditable?: boolean
    onChange: (newContent: string[]) => void
    className?: string
}

interface ListItemProps {
    item: string;
    index: number;
    onChange: (index: number, value: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
    isEditable: boolean;
    fontColor: string;
}


const ListItem: React.FC<ListItemProps> = ({
    fontColor,
    index,
    isEditable,
    item,
    onChange,
    onKeyDown,
}) => {
    return (
        <input
            type="text"
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className="bg-transparent outline-none w-full py-1"
            style={{ color: fontColor }}
            readOnly={!isEditable}
        />
    )
}

export const NumberedList: React.FC<ListProps> = ({
    items,
    isEditable = false,
    onChange,
    className
}) => {

    const { currentTheme } = useSlideStore()

    const handleChange = (index: number, value: string) => {
        if (isEditable){
            const newItems = [...items]
            newItems[index] = value
            onChange(newItems)
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key === "Enter"){
            e.preventDefault()
            const newItems = [...items]
            newItems.splice(index + 1, 0, "")
            onChange(newItems)
            setTimeout(()=>{
                const nextInput = document.querySelector(`li:nth-child(${index + 2}) input`) as HTMLInputElement 
                if(nextInput){
                    nextInput.focus()
                }
            }, 0)
        } else if (e.key === "Backspace" && items[index] === ""){
            e.preventDefault()
            const newItems = [...items]
            newItems.splice(index, 1)
            onChange(newItems)
            
        }
    }
     

    return (
        <ol
            className={cn("list-decimal list-inside space-y-1", className)}
            style={{ color: currentTheme.fontColor }}
        >
            {items.map((item, index) => (
                <li key={index} className="pl-2">
                    <ListItem
                        item={item}
                        index={index}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        isEditable={isEditable}
                        fontColor={currentTheme.fontColor}
                    />
                </li>
            ))}
        </ol>
    )
}

