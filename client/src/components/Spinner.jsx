import React from 'react'

export default function Spinner() {
  return (
    <div className='fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-60'>
        <div
        className='w-10 h-10 border-2 border-solid border-gray-300 border-t-transparent rounded-full animate-spin'
        >

        </div>
    </div>
  )
}
