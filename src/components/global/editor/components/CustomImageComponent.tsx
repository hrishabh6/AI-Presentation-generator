import Image from 'next/image';
import React from 'react'
import UploadImage from './UploadImage';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    isPreview?: boolean;
    contentId: string;
    onContentChange: (
        contentId: string,
        newContent: string | string[] | string[][]
    ) => void;
    isEditable?: boolean;
}

const CustomImageComponent = ({
    alt,
    contentId,
    onContentChange,
    src,
    className,
    isEditable,
    isPreview,
}: ImageProps) => {

    //WIP : add openai image

    return (
        <div className='relative group w-full h-full rounded-lg'>
            <Image
                src={src}
                width={isPreview ? 48 : 800}
                height={isPreview ? 48 : 800}
                alt={alt}
                className={`object-cover w-full h-full rounded-lg ${className}`}
            />
            {
                !isPreview && isEditable && (
                    <div className='absolute top-0 left-0 hidden group-hover:block'>
                        <UploadImage
                            contentId={contentId}
                            onContentChange={onContentChange}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default CustomImageComponent