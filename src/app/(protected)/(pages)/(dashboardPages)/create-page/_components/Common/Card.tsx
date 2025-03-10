"use client"
import { OutlineCard } from '@/lib/types'
import React from 'react'
import { motion } from 'framer-motion'
type Props = {
    card : OutlineCard
    isEditing : boolean
    isSelected : boolean
    editText : string
    onEditChange : (value: string) => void
    onEditBlur : () => void
    onCardClick : () => void
    onCardDoubleClick : () => void
    onDeleteClick : () => void
    dragHandlers : {
        onDragStart : (e : React.DragEvent) => void
        onDragEnd : () => void
    }
    onDragOver : (e : React.DragEvent) => void
    dragOverStyles : React.CSSProperties
}

const Card = ({
    card,
    dragOverStyles,
    dragHandlers,
    editText,
    isEditing,
    isSelected,
    onCardClick,
    onCardDoubleClick,
    onDeleteClick,
    onDragOver,
    onEditBlur,
    onEditChange,
    onEditKeyDown,
}: Props) => {

    const inputRef = React.useRef<HTMLInputElement>(null)



  return (

    <motion.div layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >

    </motion.div>
  )
}

export default Card