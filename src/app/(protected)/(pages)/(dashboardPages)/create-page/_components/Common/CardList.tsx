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

        // This determines whether to place before or after the current card
        if (y > threshold) {
            setDraggedOverIndex(index + 1) // After this card
        } else {
            setDraggedOverIndex(index) // Before this card
        }
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (!dragItem || draggedOverIndex === null) return

        const updatedCards = [...outlines]
        const draggedIndex = updatedCards.findIndex(
            (card) => card.id === dragItem.id
        )

        // Don't do anything if dropping at the same position
        if (draggedIndex === -1 || draggedIndex === draggedOverIndex || 
            (draggedIndex + 1 === draggedOverIndex && draggedIndex === outlines.length - 1)) return

        // Remove the dragged card
        const [removedCard] = updatedCards.splice(draggedIndex, 1)
        
        // Adjust the insertion index if needed
        const adjustedIndex = draggedIndex < draggedOverIndex ? draggedOverIndex - 1 : draggedOverIndex
        
        // Insert the card at the new position
        updatedCards.splice(adjustedIndex, 0, removedCard)

        // Update all cards with their new order
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
        e.dataTransfer.setDragImage(draggedElement, 0, dragOffSetY.current)

        setTimeout(() => {
            document.body.removeChild(draggedElement)
        }, 0)
    }

    const onDragEnd = () => {
        setDragItem(null)
        setDraggedOverIndex(null)
    }

    const getDragOverStyles = (cardIndex: number) => {
        if (draggedOverIndex === null || dragItem === null) return {}

        const currentCardId = outlines[cardIndex]?.id
        
        // Don't show indicators when hovering over the dragged card itself
        if (dragItem.id === currentCardId) return {}
        
        if (draggedOverIndex === cardIndex) {
            return {
                borderTop: "2px solid #000",
                marginTop: "0.5rem",
                transition: "margin 0.2s cubic-bezier(0.25,0.1,0.25,1)"
            }
        } else if (cardIndex === draggedOverIndex - 1) {
            return {
                borderBottom: "2px solid #000",
                marginBottom: "0.5rem",
                transition: "margin 0.2s cubic-bezier(0.25,0.1,0.25,1)"
            }
        }

        return {}
    }
    
    const onAddCard = (index?: number) => {
        const newCardIndex = index !== undefined ? index + 1 : outlines.length;
        const newCard: OutlineCard = {
            id: Math.random().toString(36).substring(2,9),
            title: editText || "New Section",
            order: newCardIndex + 1,
        };
        
        const updatedCards = [...outlines];
        // Insert the new card at the specified position
        updatedCards.splice(newCardIndex, 0, newCard);
        
        // Reorder all cards correctly
        const reorderedCards = updatedCards.map((card, idx) => ({
            ...card,
            order: idx + 1
        }));
        
        addMultipleOutlines(reorderedCards);
        setEditText('');
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
                            onAddCard={() => onAddCard(index)}
                        />
                    </React.Fragment>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardList