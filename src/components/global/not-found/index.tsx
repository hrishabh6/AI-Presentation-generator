import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col min-h-[70vh] w-full justify-center items-center gap-12'>
        <Image src='/computer.svg' width={100} height={100} className='rounded-lg' alt='Nothing to show' />
        <div className='flex flex-col items-center justify-center text-center'>
            <p className='text-3xl font-semibold text-primary'>
                Nothing to see here
            </p>
            <p className='text-base font-normal'>
                So here is a random image generated by  <span className='text-vivid'>Creative AI</span>
            </p>
        </div>
        
    </div>
  )
}

export default NotFound