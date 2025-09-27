import React from 'react'
import { Twitter, Headphones, Video, Link, FileText, Image, BookOpen, Tags, Home } from 'lucide-react'

interface SidebarItemProps {
  icon: 'home' | 'twitter' | 'audio' | 'video' | 'links' | 'notes' | 'images' | 'books' | 'tags'
  title: string
  count?: number
  isActive?: boolean
  onClick?: () => void
}

const SidebarItem= ({ 
  icon, 
  title, 
  count=0, 
  isActive = false,
  onClick 
}:SidebarItemProps) => {
  const getIcon = () => {
    const iconProps = { size: 20, strokeWidth: 1.5 }
    
    switch(icon) {
      case 'home':
        return <Home {...iconProps} />
      case 'twitter':
        return <Twitter {...iconProps} />
      case 'audio':
        return <Headphones {...iconProps} />
      case 'video':
        return <Video {...iconProps} />
      case 'links':
        return <Link {...iconProps} />
      case 'notes':
        return <FileText {...iconProps} />
      case 'images':
        return <Image {...iconProps} />
      case 'books':
        return <BookOpen {...iconProps} />
      case 'tags':
        return <Tags {...iconProps} />
      default:
        return <Home {...iconProps} />
    }
  }

  return (
    <div 
      className={`
        flex items-center justify-between  px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group
        ${isActive 
          ? 'bg-purple-100 text-purple-700 shadow-sm' 
          : 'text-black hover:bg-blue-400 hover:text-white'
        }
      `}
      onClick={onClick}
    >
      <div className='flex items-center gap-3'>
        <div className={`
          ${isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-white'}
        `}>
          {getIcon()}
        </div>
        <span className='font-medium text-sm'>{title}</span>
      </div>
      
      {count !== undefined && (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${isActive 
            ? 'bg-purple-200 text-purple-800' 
            : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
          }
        `}>
          {count}
        </span>
      )}
    </div>
  )
}

export default SidebarItem

// Usage examples:
/*
<SidebarItem icon="twitter" title="Tweets" count={12} />
<SidebarItem icon="audio" title="Audio" count={5} isActive />
<SidebarItem icon="video" title="Videos" count={8} />
<SidebarItem icon="links" title="Links" count={23} />
<SidebarItem icon="notes" title="Notes" count={45} />
<SidebarItem icon="images" title="Images" count={7} />
<SidebarItem icon="books" title="Books" count={3} />
<SidebarItem icon="tags" title="Tags" count={18} />
*/