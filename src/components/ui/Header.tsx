import React from 'react'
import Button from './Button'
import { Plus, Share2 } from 'lucide-react'
import {openForm, openShare} from '../../store/index'
import { useDispatch} from 'react-redux'
interface HeaderProps {
  title?: string
  totalCount?: number
 
}

const Header: React.FC<HeaderProps> = ({ 
  title = "All Notes", 
  totalCount,
 
}) => {

const dispatch=useDispatch();

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-10'>
      <div className='flex justify-between items-center px-6 py-4'>
 
        <div className='flex items-baseline gap-3'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {title}
          </h1>
          {totalCount !== undefined && (
            <span className='text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
              {totalCount} items
            </span>
          )}
        </div>

        <div className='flex items-center gap-3'>
          <Button 
  text='Share Brain' 
  variant='secondary' 
  size='md' 
  onClick={() => dispatch(openShare())} 
  startIcon={<Share2 size={18} />}
/>
          <Button 
            text='Add Content' 
            variant='primary' 
            size='md' 
            onClick={()=>dispatch(openForm())}
            startIcon={<Plus size={18} />}
          />
        </div>
      </div>
    </header>
  )
}

export default Header