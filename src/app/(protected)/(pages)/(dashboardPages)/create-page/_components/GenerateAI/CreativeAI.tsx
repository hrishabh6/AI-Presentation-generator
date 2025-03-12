"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useCreativeAiStore from '@/store/useCreativeAiStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CardList from '../Common/CardList'
import usePromptStore from '@/store/usePromptStore'
import RecentPrompts from './RecentPrompts'
import { toast } from 'sonner'
// import {  generateCreativePromptOpenAi } from '@/actions/openAi'
import {v4 as uuid} from 'uuid'
import { OutlineCard } from '@/lib/types'
import { generateCreativePromptGemini } from '@/actions/geminiAI'
import { createProject } from '@/actions/project'
import { useSlideStore } from '@/store/useSlideStore'
type Props = {
    onBack : () => void
}

const CreativeAI = ({onBack}: Props) => {
    const router = useRouter()
    const[editingCard, setEditingCard] = React.useState<string | null>(null)
    const {setProject} = useSlideStore()
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState<string | null>(null)
    const [editText, setEditText] = React.useState<string | null>(null)
    const [noOfCards, setNoOfCards] = React.useState(0)
    const {currentAiPrompt,  setCurrentAiPrompt, outlines, resetOutlines, addOutline, addMultipleOutlines} = useCreativeAiStore()
    const {prompts, addPrompt} = usePromptStore()
    const handleBack = () => {
        onBack()
    }   

    const resetCards = () => {
        setEditingCard(null)
        setSelectedCard(null)
        setEditText(null)
        setCurrentAiPrompt("")
        resetOutlines()
    }   

    const generateOutline = async () => {
        if(currentAiPrompt.trim() === "") {
            toast.error("Error", {
                description: "Please enter a prompt to generate the outline"
            })
            return
        }
        setIsGenerating(true)
        // const res = await generateCreativePromptOpenAi(currentAiPrompt)
        const res = await generateCreativePromptGemini(currentAiPrompt)
        if(res.status === 200 && res?.data?.outlines ){
            const cardsData: OutlineCard[] = [];
            res.data?.outlines.map((outlines : string, idx : number) => {
                const newCard = {
                    id :uuid(),
                    title : outlines,
                    order : idx + 1

                }
                cardsData.push(newCard)
            })
            addMultipleOutlines(cardsData)
            setNoOfCards(cardsData.length)
            toast.success('Success', {
                description : "Outlines Generated Successfully"
            })
        }
        else {
            toast.error('Error', {
                description : "Failed to generate outlines, Please try again later"
            })
        }
        setIsGenerating(false)

        console.log(res)
    }

    const handleGenerate = async () => {
        setIsGenerating(true)
        if(outlines.length === 0){
            toast.error('Error', {
                description : "Please generate the outline first"
            })
            setIsGenerating(false)
            return
        }
        try {
            const res = await createProject(currentAiPrompt, outlines.slice(0, noOfCards))
            if(res.status !== 200 || !res.data){
                throw new Error("Failed to create project")
            }
            router.push(`/presentation/${res.data.id}/select-theme`)
            setProject(res.data)

            addPrompt({
                id : uuid(),
                title : currentAiPrompt || outlines?.[0]?.title,
                outlines : outlines,
                createdAt : new Date()
            })

            toast.success('Success', {
                description : "Project created successfully"
            })

            setCurrentAiPrompt("")
            resetOutlines()

        } catch (error) {
            console.log(error)
            toast.error('Error', {
                description : "Failed to create project, Please try again later"
            })
        } finally {
            setIsGenerating(false)
        }
    }

    useEffect(() => {
        setNoOfCards(outlines.length)
    
    }, [outlines.length])
    


  return (
    <motion.div
        variants={containerVariants}
        className='space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
        initial = "hidden"
        animate = "visible"
    >
        <Button
            onClick={handleBack}
            variant="outline"
            className={`mb-4`}
        >
            <ChevronLeft className='mr-2 h-4 w-4'/> Back
        </Button>

        <motion.div
            variants={itemVariants}
            className = "text-center space-y-2"
        >
            <h1 className='text-4xl font-bold text-primary'>
                Generate with <span className='text-vivid'>Creative AI</span>
            </h1>
            <p className='text-secondary-80'>
                What would you like to build today
            </p>
        </motion.div>
        <motion.div
            variants={itemVariants}
            className='bg-primary/10 p-4 rounded-xl'
        >
            <div className='flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl'>
                <Input
                    placeholder='Enter prompt and add to the cards...'
                    className='text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow'
                    value={currentAiPrompt || ""}
                    onChange={(e) => setCurrentAiPrompt(e.target.value)}
                    required
                />
                <div className='flex items-center gap-3'>
                    <Select
                        value={noOfCards.toString()}
                        onValueChange={(value) => setNoOfCards(parseInt(value))}
                    >
                        <SelectTrigger className='w-fit gap-2 font-semibold shadow-xl'>
                            <SelectValue
                                placeholder="Select number of cards"
                            />                                
                        </SelectTrigger>
                        <SelectContent
                            className='w-fit'
                        >
                            {outlines.length === 0 ? (
                                <SelectItem value='0' className='font-semibold'>
                                    No Cards
                                </SelectItem>
                            ) : (
                                Array.from({ length: outlines.length }, (_, i: number) => i + 1).map((num) => (
                                    <SelectItem
                                        key={num}
                                        value={num.toString()}
                                        className='font-semibold'
                                    >
                                        {num} {num === 1 ? 'Card' : 'Cards'}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                    <Button
                        variant={"destructive"}
                        onClick={resetCards}
                        size={"icon"}
                        aria-label='Reset Cards'
                    >
                    <RotateCcw className='h-4 w-4'/>
                    </Button>
                </div>

            </div>
        </motion.div>
        <div className='flex w-full justify-center items-center'>
            <Button
                className="font-medium text-lg flex gap-2 items-center"
                onClick={generateOutline}
                disabled={isGenerating}
            >
                {isGenerating ? (
                    <>
                    <Loader2 className='animate-spin mr-2'/>
                    Generating... 
                    
                    </>
                )
                 :

                 "Generate"}
            </Button>
        </div>

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
        {
            outlines.length > 0 && 
            <Button
                className='w-full'
                onClick={handleGenerate}
                disabled={isGenerating}
            >   
                {isGenerating ? (
                    <>
                    <Loader2 className='animate-spin mr-2'/>
                    Generating... 
                    
                    </>
                )
                 :

                 "Generate PPT"}
            </Button>
        }
        {prompts.length > 0 && 
            <RecentPrompts/>
        } 
    </motion.div>
  )
}

export default CreativeAI