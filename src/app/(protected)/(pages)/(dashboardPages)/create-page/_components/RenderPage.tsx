"use client"
import usePromptStore from '@/store/usePromptStore'
import {motion, AnimatePresence} from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const RenderPage = (props: Props) => {
    const router = useRouter()
    const {page, setPage} = usePromptStore()
  return (
    <AnimatePresence mode='wait'>
        <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            
        </motion.div>
    </AnimatePresence>
  )
}

export default RenderPage