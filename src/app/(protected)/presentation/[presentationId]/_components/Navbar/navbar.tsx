"use client"
import { Button } from '@/components/ui/button'
import { useSlideStore } from '@/store/useSlideStore'
import { Home, PlayIcon, Share2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    presentationId: string
}

const Navbar = ({ presentationId }: Props) => {

    const { currentTheme } = useSlideStore()
    const [isPresentationMode, setIsPresentationMode] = React.useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`)
        toast.success("Link copied to clipboard")
    }

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 w-full h-20 flex items-center justify-between px-7 py-4 border-b'
            style={{
                backgroundColor:
                    currentTheme.navbarColor || currentTheme.backgroundColor,
                color: currentTheme.accentColor,
            }}
        >
            <Link href={"/dashboard"} passHref>
                <Button
                    variant={"outline"}
                    style={{ backgroundColor: currentTheme.backgroundColor }}
                >
                    <Home className='w-4 h-4' />
                    <span className="hidden sm:inline">Return Home</span>
                </Button>
            </Link>
            <Link
                href={"/presentation/template-market"}
                className="text-lg font-semibold hidden sm:block"
            >
                Presentation Editor
            </Link>

            <div className="flex items-center gap-4">
                <Button
                    variant={"outline"}
                    style={{ backgroundColor: currentTheme.backgroundColor }}
                    onClick={handleCopy}
                >
                    <Share2Icon className="w-4 h-4" />
                </Button>
                {/* {WIP} sell template */}
                <Button
                    variant={"default"}
                    className="flex items-center gap-2"
                    onClick={() => setIsPresentationMode(true)}
                >
                    <PlayIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Present</span>
                </Button>
            </div>

            {/* {isPresentationMode && (
                <PresentationMode/>
            )} */}


        </nav>
    )
}

export default Navbar