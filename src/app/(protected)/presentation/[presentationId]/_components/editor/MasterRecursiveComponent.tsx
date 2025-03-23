"use client"
import { ContentItem } from '@/lib/types';
import React, { useCallback } from 'react'
import { motion } from 'framer-motion';
import { Heading1, Heading2, Heading3, Heading4, Title } from '@/components/global/editor/components/Headings';
import { cn } from '@/lib/utils';
import DropZone from './DropZone';
import Paragraph from '@/components/global/editor/components/Paragraph';


interface MasterRecursiveProps {
    content: ContentItem;
    onContentChange: (
        contentId: string,
        newcontent: string | string[] | string[][]
    ) => void;
    isPreview?: boolean;
    isEditable?: boolean;
    slideId: string;
    index?: number;
}

const ContentRenderer: React.FC<MasterRecursiveProps> = React.memo(
    ({
        content,
        onContentChange,
        slideId,
        index,
        isEditable,
        isPreview
    }) => {

        const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onContentChange(content.id, e.target.value)
        }, [content.id, onContentChange])


        const commonProps = {
            placeHolder: content.placeholder,
            value: content.content as string,
            onChange: handleChange,
            isPreview: isPreview,

        }

        const animationProps = {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 }
        }
        //WIP complete types
        switch (content.type) {
            case "heading1":
                return (<motion.div className="w-full h-full" {...animationProps}>
                    <Heading1 {...commonProps} />
                </motion.div>)

            case "heading2":
                return (
                    <motion.div className="w-full h-full" {...animationProps}>
                        <Heading2 {...commonProps} />
                    </motion.div>
                );
            case "heading3":
                return (
                    <motion.div className="w-full h-full" {...animationProps}>
                        <Heading3 {...commonProps} />
                    </motion.div>
                );
            case "heading4":
                return (
                    <motion.div className="w-full h-full" {...animationProps}>
                        <Heading4 {...commonProps} />
                    </motion.div>
                );

            case "title":
                return (
                    <motion.div className="w-full h-full" {...animationProps}>
                        <Title {...commonProps} />
                    </motion.div>
                );
                case "paragraph":
                    return (
                      <motion.div className="w-full h-full" {...animationProps}>
                        <Paragraph {...commonProps} />
                      </motion.div>
                    );
            case "column":
                if (Array.isArray(content.content)) {
                    return (
                        <motion.div
                            {...animationProps}
                            className={cn(
                                "w-full h-full flex flex-col text-lg",
                                content.className
                            )}
                        >
                            {content.content.length > 0 ? (
                                (content.content as ContentItem[]).map(
                                    (subItem: ContentItem, subIndex: number) => (
                                        <React.Fragment key={subItem.id || `item-${subIndex}`}>
                                            {isPreview &&
                                                !subItem.restrictToDrop &&
                                                subIndex == 0 &&
                                                isEditable && (
                                                    <DropZone
                                                        index={0}
                                                        parentId={content.id}
                                                        slideId={slideId}
                                                    />
                                                )}
                                            <MasterRecursiveComponent
                                                content={subItem}
                                                onContentChange={onContentChange}
                                                isPreview={isPreview}
                                                slideId={slideId}
                                                index={subIndex}
                                                isEditable={isEditable}
                                            />
                                            {!isPreview && !subItem.restrictToDrop && isEditable && (
                                                <DropZone
                                                    index={subIndex + 1}
                                                    parentId={content.id}
                                                    slideId={slideId}
                                                />
                                            )}
                                        </React.Fragment>
                                    )
                                )
                            ) : isEditable ? (
                                <DropZone index={0} parentId={content.id} slideId={slideId} />
                            ) : null}
                        </motion.div>
                    );
                }
                return null;


            default:
                return null
        }

    }
);

ContentRenderer.displayName = 'ContentRenderer';

export const MasterRecursiveComponent: React.FC<MasterRecursiveProps> = React.memo(
    ({
        content, onContentChange, slideId, index, isPreview = false, isEditable = true
    }) => {
        if (isPreview) {
            return (
                <ContentRenderer
                    content={content}
                    onContentChange={onContentChange}
                    index={index}
                    slideId={slideId}
                    isPreview={isPreview}
                />
            )

        }
        return (
            <>
                <ContentRenderer
                    content={content}
                    onContentChange={onContentChange}
                    slideId={slideId}
                    index={index}
                    isEditable={isEditable}
                >

                </ContentRenderer>
            </>
        )
    }
)

MasterRecursiveComponent.displayName = 'MasterRecursiveComponent';

