"use client"
import { OutlineCard } from '@/lib/types'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'
import AddCardButton from './AddCardButton'
type Props = {
    outlines: OutlineCard[] | [];
    editingCard: string | null;
    selectedCard: string | null;
    editText: string;
    addOutline?: (card: OutlineCard) => void;
    onEditchange: (value: string) => void;
    onCardSelect: (id: string) => void;
    onCardDoubleClick: (id: string, title: string) => void;
    setEditText: (value: string) => void;
    setEditingCard: (id: string | null) => void;
    setSelectedCard: (id: string | null) => void;
    addMultipleOutlines: (cards: OutlineCard[]) => void;
}

const CardList = ({
    addMultipleOutlines,
    editText,
    editingCard,
    onCardDoubleClick,
    onCardSelect,
    onEditchange,
    outlines,
    selectedCard,
    setEditText,
    setEditingCard,
    setSelectedCard,
    // addOutline,
}: Props) => {

    const [dragItem, setDragItem] = React.useState<OutlineCard | null>(null)
    const [draggedOverIndex, setDraggedOverIndex] = React.useState<number | null>(null)
    const dragOffSetY = React.useRef<number>(0)
    const onDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        if (!dragItem) return

        const rect = e.currentTarget.getBoundingClientRect()
        const y = e.clientY - rect.top
        const threshold = rect.height / 2

        if (y > threshold) {
            setDraggedOverIndex(index)
        } else {
            setDraggedOverIndex(index + 1)

        }

    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (!dragItem || draggedOverIndex === null) return

        const updatedCards = [...outlines]
        const draggedIndex = updatedCards.findIndex(
            (card) => card.id === dragItem.id
        )

        if (draggedIndex === -1 || draggedIndex === draggedOverIndex) return

        const [removeCard] = updatedCards.splice(draggedIndex, 1)
        updatedCards.splice(draggedOverIndex > draggedIndex ? draggedOverIndex - 1 : draggedOverIndex, 0, removeCard)

        addMultipleOutlines(updatedCards.map((card, index) => ({ ...card, order: index + 1 })))
        setDragItem(null)
        setDraggedOverIndex(null)

    }

    const onCardUpdate = (id: string, newTitle: string) => {
        addMultipleOutlines(outlines.map((card) => (card.id === id ? {...card, title : newTitle} : card)))
        setEditingCard(null)
        setSelectedCard(null)
        setEditText("")
    }

    const onCardDelete = (id: string) => {
        addMultipleOutlines(outlines.filter((card) => card.id !== id).map((card : OutlineCard, index : number) => ({ ...card, order: index + 1 })))
    }

    const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
        setDragItem(card)
        e.dataTransfer.effectAllowed = "move"

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        dragOffSetY.current = e.clientY - rect.top

        const draggedElement = e.currentTarget.cloneNode(true) as HTMLElement

        draggedElement.style.position = "absolute"
        draggedElement.style.top = `-1000px`
        draggedElement.style.opacity = `0.8`
        draggedElement.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`
        document.body.appendChild(draggedElement)
        e.dataTransfer.setDragImage(draggedElement, 0 , dragOffSetY.current)

        setTimeout(() => {
            setDraggedOverIndex(outlines.findIndex((c) => c.id === card.id))
            document.body.removeChild(draggedElement)
        }, 0)

    }

    const onDragEnd = () => {
        setDragItem(null)
        setDraggedOverIndex(null)
    }

    const getDragOverStyles = (cardIndex: number) => {
        if (draggedOverIndex === null || dragItem === null) return {}

        if (draggedOverIndex === cardIndex) {
            return {
                borderTop : "2px solid #000",
                marginTop : "0.5rem",
                transition : "margin 0.2s cubic-bezier(0.25,0.1,0.25,1)"
            }
        } else if (cardIndex === draggedOverIndex - 1 ) {
            return {
                borderBottom : "2px solid #000",
                marginBottom : "0.5rem",
                transition : "margin 0.2s cubic-bezier(0.25,0.1,0.25,1)"
            }
        }

        return {}
    }

    return (
        <motion.div className='space-y-2 ' layout
            onDragOver={(e) => {
                e.preventDefault()
                if (outlines.length === 0 || e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20) {
                    onDragOver(e, outlines.length)
                }
            }}
            onDrop={(e) => {
                e.preventDefault()
                onDrop(e)
            }}
        >
            <AnimatePresence >
                {outlines.map((card, index) => (
                    <React.Fragment key={card.id}>
                        <Card
                            onDragOver={(e) => onDragOver(e, index)}
                            card={card}
                            isEditing={editingCard === card.id}
                            isSelected={selectedCard === card.id}
                            editText={editText}
                            onEditChange={onEditchange}
                            onEditBlur={() => onCardUpdate(card.id, editText)}
                            onEditKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onCardUpdate(card.id, editText);
                                }
                            }}
                            onCardClick={() => onCardSelect(card.id)}
                            onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
                            onDeleteClick={() => onCardDelete(card.id)}
                            dragHandlers={{
                                onDragStart: (e) => onDragStart(e, card),
                                onDragEnd: onDragEnd,
                            }}
                            dragOverStyles={getDragOverStyles(index)}
                        />
                        <AddCardButton
                            // onAddCard={() => onAddCard(index)}
                        />
                    </React.Fragment>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardList