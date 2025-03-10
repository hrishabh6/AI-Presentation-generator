"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { containerVariants, CreatePageCard, itemVariants } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import RecentPrompts from './GenerateAI/RecentPrompts'
import usePromptStore from '@/store/usePromptStore'
type Props = {
    onSelectOption: (option: string) => void
}

const CreatePage = ({ onSelectOption }: Props) => {
    const {prompts, setPage} = usePromptStore()

    

    return (
        <motion.div
            initial={"hidden"}
            animate={"visible"}
            className='space-y-8'
            variants={containerVariants}
        >
            <motion.div
                variants={itemVariants}
                className='text-center space-y-2'
            >
                <h1 className='text-4xl font-bold text-primary'>
                    How would you like to get started?
                </h1>
                <p className='text-secondary-80'>
                    Chose your preferred method to begin
                </p>
                <motion.div
                    variants={containerVariants}
                    className="grid gap-6 lg:grid-cols-3 md:p-7 p-4 2xl:max-w-7xl mx-auto"
                >
                    {CreatePageCard.map((option) => (
                        <motion.div
                            key={option.type}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                rotate: 1,
                                transition: { duration: 0.1 }
                            }}
                            className={`
                            ${option.highlight ? 'bg-vivid-gradient' : 'hover:bg-vivid-graadient border'}
                            rounded-xl p-[1px] transitiion-all duration-300 ease-in-out 
                        `}
                        >
                            <motion.div
                                className={`w-full p-4 flex flex-col gap-y-6 items-start bg-gradient-to-br ${option.highlight ? 'bg-gradient-to-br from-[#f8f9fc] via-[#f5ede3] to-[#dfe6ee]' : 'from-[#f8f9fc] via-[#e7ecf3] to-[#dfe6ee]'} ${option.highlight ? 'dark:bg-gradient-to-b dark:from-zinc-900 dark:via-[#2A1D17] dark:to-zinc-900' : 'dark:bg-gradient-to-br dark:from-[#181818] dark:via-[#1e1e1e] dark:to-[#2a2a2a]' } rounded-xl`}
                                whileHover={{
                                    transition: { duration: 0.1 },
                                }}
                            >
                                <div className="flex flex-col items-start w-full gap-y-3">
                                    <div>
                                        <p className="text-primary text-lg font-semibold">
                                            {option.title}
                                        </p>
                                        <p
                                            className={`${option.highlight ? "text-vivid" : "text-primary"
                                                } text-4xl font-bold`}
                                        >
                                            {option.highlightedText}
                                        </p>
                                    </div>
                                    <p className="text-muted-foreground text-sm font-normal">
                                        {option.description}
                                    </p>
                                </div>
                                <motion.div
                                    className="self-end"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant={option.highlight ? "default" : "outline"}
                                        className="w-fit rounded-xl font-bold"
                                        size={"sm"}
                                        onClick={() => onSelectOption(option.type)}
                                    >{option.buttonText}
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {prompts.length > 0 && <RecentPrompts/>}

        </motion.div>
    )
}

export default CreatePage