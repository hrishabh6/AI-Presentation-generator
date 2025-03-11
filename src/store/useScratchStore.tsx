import { create } from "zustand";
import { persist, devtools } from "zustand/middleware"
import { OutlineCard } from "@/lib/types";


interface OutlineStore  {
    outlines : OutlineCard[]
    resetOutlines : () => void
    addOutline : (outline: OutlineCard) => void
    addMultipleOutlines : (outlines : OutlineCard[]) => void
}

const useScratchStore = create<OutlineStore>()(
    devtools(persist((set) => ({
        outlines : [],
        resetOutlines : () => {
            set({outlines : []})
        },
        addOutline : (outline: OutlineCard) => {
            set((state) => ({
                outlines : [outline, ...state.outlines]
            }))
        },
        addMultipleOutlines : (outlines : OutlineCard[]) => {
            set(() => ({
                outlines : [...outlines]
            }))
        }
    }), {name : "scratch"}))
)

export default useScratchStore

