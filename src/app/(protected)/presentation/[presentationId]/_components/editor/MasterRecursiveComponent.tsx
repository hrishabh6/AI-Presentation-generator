import { ContentItem } from '@/lib/types';
import React, { useCallback } from 'react'
import { Motion } from 'framer-motion';
import { Heading1 } from '@/components/global/editor/components/Headings';

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
        isPreview
    }) => {

        const handleChange = useCallback((e : React.ChangeEvent<HTMLTextAreaElement>) => {
            onContentChange(content.id, e.target.value)
        }, [content.id, onContentChange])


        const commonProps = {
            placeHolder : content.placeholder,
            value : content.content as string,
            onChange : handleChange,
            isPreview : isPreview,

        }

        const animationProps = {
            initial : {opacity : 0, y : 20},
            animate : {opacity : 1, y : 0},
            transition : {duration : 0.5}
        }

        switch (content.type) {
            case "heading1":
                return <Motion.div className="w-full h-full">
                    <Heading1 {...} />
                </Motion.div>
        }

    }
);

ContentRenderer.displayName = 'ContentRenderer';

export default ContentRenderer;
