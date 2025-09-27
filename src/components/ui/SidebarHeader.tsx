import { Brain } from 'lucide-react'
import React from 'react'

const SidebarHeader = () => {
  return (
    
      <div className='flex items-center gap-3 p-6 border-b border-gray-100'>
        <Brain size={32} stroke='#42A5F5' strokeWidth={2} />    
        <h1 className='font-bold text-xl text-gray-800'>Second Brain</h1>
      </div>
  )
}

export default SidebarHeader