"use client"
import usePromptStore from '@/store/usePromptStore'
import {motion, AnimatePresence} from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import CreatePage from './CreatePage/CreatePage'
import CreativeAI from './CreatePage/GenerateAI/CreativeAI'


const RenderPage = () => {
    const router = useRouter()
    const {page, setPage} = usePromptStore()

    const handleSelectOption = (option: string) => {
        if(option === "template") {
            router.push("/templates")
        } else if (option === "create-scratch") {
            setPage("create-scratch")
        } else {
            setPage("creative-ai")
        }
    }

    const handleBack = () => {
        setPage("create")
    }

    const renderstep = () => {
        switch (page) {
            case "create":
                return <CreatePage onSelectOption={handleSelectOption}/>
            case "creative-ai":
                return <CreativeAI onBack={handleBack}></CreativeAI>
            case "create-scratch":
                return <></>
            default:
                return null
        }
    }

  return (
    <AnimatePresence mode='wait'>
        <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {renderstep()}
        </motion.div>
    </AnimatePresence>
  )
}

export default RenderPage