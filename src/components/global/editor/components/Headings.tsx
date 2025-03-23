"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"

interface HeadingProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string
    styles?: React.CSSProperties
    isPreview?: boolean
}


const createHeading = (displayName: string, defaultClassName: string) => {
    const heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>((
        {  styles, isPreview = false, className, ...prop }, ref
    ) => {
        const textarearef = useRef<HTMLTextAreaElement>(null);
        useEffect(() => {
            const textarea = textarearef.current;
            if (textarea && !isPreview) {
                const adjustHeight = () => {
                    textarea.style.height = '0';
                    textarea.style.height = `${textarea.scrollHeight}px`;
                }

                textarea?.addEventListener('input', adjustHeight)
                adjustHeight()
                return ()=> textarea.removeEventListener('input', adjustHeight)
            }
        }, [isPreview]);
        
        const previewClassName = isPreview ? 'text-xs' : '';

        return (
            <textarea
            className={cn(
              `m-5 w-full bg-transparent ${defaultClassName} ${previewClassName}
              font-normal text-gray-900 placeholder:text-gray-300
              focus:outline-none resize-none overflow-hidden leading-tight`,
              className
            )}
            style={{
              padding: 0,
              margin: 0,
              color: "inherit",
              boxSizing: "content-box",
              lineHeight: "1.2em",
              minHeight: "1.2em",
              ...styles,
            }}
            ref={(el) => {
              (textarearef.current as HTMLTextAreaElement | null) = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            readOnly={isPreview}
            {...prop}
          ></textarea>
        );
    });

    heading.displayName = displayName;
    return heading;
}

const Heading1 = createHeading("Heading1", "text-4xl");
const Heading2 = createHeading("Heading2", "text-3xl");
const Heading3 = createHeading("Heading3", "text-2xl");
const Heading4 = createHeading("Heading2", "text-xl");
const Title = createHeading("Title", "text-4xl");

export { Heading1,Heading2,Heading3,Heading4,Title };