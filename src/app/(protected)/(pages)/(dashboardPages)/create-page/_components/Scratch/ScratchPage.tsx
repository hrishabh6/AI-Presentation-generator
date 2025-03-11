import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, RotateCcwIcon } from 'lucide-react'
import {v4 as uuidv4} from 'uuid'
import useScratchStore from '@/store/useScratchStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CardList from '../Common/CardList'
import { OutlineCard } from '@/lib/types'
import { toast } from 'sonner'
import { createProject } from '@/actions/project'
import { useSlideStore } from '@/store/useSlideStore'


type Props = {
  onBack: () => void
}

const ScratchPage = ({
  onBack
}: Props) => {
  const router = useRouter()
  const { outlines, resetOutlines, addMultipleOutlines, addOutline } = useScratchStore()
  const {setProject} = useSlideStore()
  const [editText, setEditText] = React.useState<string | null>("")
  const [editingCard, setEditingCard] = React.useState<string | null>(null);
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)
      if(outlines.length === 0) {
        toast.error("Error", {
          description: "Please add atleast one card to generate the PPT"
        })
        return
      }
      const res = await createProject(outlines?.[0]?.title, outlines)
      if(res.status !== 200) {
        toast.error("Error", {
          description: "Error in creating project"
        })
      }
      if(res.data) {
        setProject(res.data)
        resetOutlines()
        toast.success("Success", {
          description: "Project created successfully"
        })
        router.push(`/presentation/${res.data.id}/select-theme`)
      } else {
        toast.error("Error", {
          description: "Failet to create project"
        })
      }
    } catch (error) {
      console.log("❌ Error in handleGenerate", error)
      toast.error("Error", {
        description: "Some Unknown error occured"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBack = () => {
    resetOutlines();
    onBack();

  }
  const resetCards = () => {
    setEditText("")
    resetOutlines()
  }

  const handleAddCard = () => {
    const newCard : OutlineCard = {
      id: uuidv4(),
      title: editText || "New Section",
      order: outlines.length + 1
    }
    
    // Create a new array with all existing cards plus the new one
    const updatedCards = [...outlines, newCard];
    
    // Use addMultipleOutlines to ensure consistent ordering
    addMultipleOutlines(updatedCards);
    setEditText("");
  }
  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button
        onClick={handleBack}
        variant={"outline"}
        className="mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            value={editText!}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter Prompt and add to the cards"
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
          />
          <div className='flex items-center gap-3'>
            <Select>
              <SelectTrigger className=" w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No Cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, index) => index + 1
                  ).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="font-semibold"
                    >
                      {num} {num === 1 ? "card" : "Cards"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

          </div>
          <Button
            variant={"destructive"}
            onClick={resetCards}
            size={"icon"}
            aria-label="Reset cards"
          >
            <RotateCcwIcon className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText!}
        onEditchange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id)
          setEditText(title)
        }}
      />
      <Button
        variant={"secondary"}
        onClick={handleAddCard}
        className="w-full "
      >
        Add Card
      </Button>
      {outlines.length > 0 && (
         <Button
         className="w-full"
         onClick={handleGenerate}
         disabled={isGenerating}
       >
         {isGenerating ? (
           <>
             <Loader2 className="animate-spin mr-2" />
             Generating...
           </>
         ) : (
           "Generate"
         )}
       </Button>
      )}
    </motion.div>
  )
}

export default ScratchPage