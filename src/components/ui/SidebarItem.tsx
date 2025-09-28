// import React from 'react'
// import { Twitter, Headphones, Video, Link, FileText, Image, BookOpen, Tags, Home } from 'lucide-react'

// interface SidebarItemProps {
//   icon: 'home' | 'twitter' | 'audio' | 'video' | 'links' | 'notes' | 'images' | 'books' | 'tags'
//   title: string
//   count?: number
//   isActive?: boolean
//   onClick?: () => void
// }

// const SidebarItem = ({ 
//   icon, 
//   title, 
//   count = 0, 
//   isActive = false,
//   onClick 
// }: SidebarItemProps) => {
  
//   const getIcon = () => {
//     const iconProps = { 
//       size: 20, 
//       strokeWidth: 1.5,
//       className: `transition-colors duration-200 ${
//         isActive 
//           ? 'text-white' 
//           : 'text-gray-500 group-hover:text-white'
//       }`
//     }
    
//     switch(icon) {
//       case 'home':
//         return <Home {...iconProps} />
//       case 'twitter':
//         return <Twitter {...iconProps} />
//       case 'audio':
//         return <Headphones {...iconProps} />
//       case 'video':
//         return <Video {...iconProps} />
//       case 'links':
//         return <Link {...iconProps} />
//       case 'notes':
//         return <FileText {...iconProps} />
//       case 'images':
//         return <Image {...iconProps} />
//       case 'books':
//         return <BookOpen {...iconProps} />
//       case 'tags':
//         return <Tags {...iconProps} />
//       default:
//         return <Home {...iconProps} />
//     }
//   }

//   return (
//     <div 
//       className={`
//         flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer 
//         transition-all duration-200 group select-none
//         ${isActive 
//           ? 'bg-blue-400 text-white shadow-md transform scale-[1.02]' 
//           : 'text-gray-700 hover:bg-blue-400 hover:text-white hover:shadow-sm'
//         }
//       `}
//       onClick={onClick}
//     >
//       <div className='flex items-center gap-3'>
//         <div className="transition-colors duration-200">
//           {getIcon()}
//         </div>
//         <span className={`
//           font-medium text-sm transition-colors duration-200
//           ${isActive ? 'text-white font-semibold' : 'text-gray-700 group-hover:text-white'}
//         `}>
//           {title}
//         </span>
//       </div>
      
//       {count !== undefined && count >= 0 && (
//         <span className={`
//           px-2 py-1 rounded-full text-xs font-medium transition-all duration-200
//           ${isActive 
//             ? 'bg-white text-blue-600 shadow-sm' 
//             : 'bg-gray-200 text-gray-600 group-hover:bg-white group-hover:text-blue-600'
//           }
//         `}>
//           {count}
//         </span>
//       )}
//     </div>
//   )
// }

// export default SidebarItem

import React from 'react'
import { Twitter, Headphones, Video, Link, FileText, Image, BookOpen, Tags, Home } from 'lucide-react'

interface SidebarItemProps {
  icon: 'home' | 'twitter' | 'audio' | 'video' | 'links' | 'notes' | 'images' | 'books' | 'tags'
  title: string
  count?: number
  isActive?: boolean
  onClick?: () => void
}

const iconMap = {
  home: Home,
  twitter: Twitter,
  audio: Headphones,
  video: Video,
  links: Link,
  notes: FileText,
  images: Image,
  books: BookOpen,
  tags: Tags
}

const SidebarItem = ({ 
  icon, 
  title, 
  count = 0, 
  isActive = false,
  onClick 
}: SidebarItemProps) => {
  const Icon = iconMap[icon] || Home

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className={`
        flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out group select-none
        focus-visible:ring-2 focus-visible:ring-blue-500
        ${isActive 
          ? 'bg-blue-500 text-white shadow-lg scale-[1.02]' 
          : 'text-gray-700 hover:bg-blue-400 hover:text-white hover:shadow-md'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          flex items-center justify-center w-8 h-8 rounded-md
          transition-colors duration-200
          ${isActive 
            ? 'bg-white/20 text-white' 
            : 'text-gray-500 group-hover:text-white group-hover:bg-white/20'}
        `}>
          <Icon size={18} strokeWidth={1.6} />
        </div>
        <span className={`
          font-medium text-sm md:text-base transition-colors duration-200
          ${isActive ? 'text-white font-semibold' : 'text-gray-700 group-hover:text-white'}
        `}>
          {title}
        </span>
      </div>

      {count !== undefined && count >= 0 && (
        <span className={`
          min-w-[20px] px-2 py-0.5 rounded-full text-xs font-medium text-center
          transition-all duration-200
          ${isActive 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'bg-gray-200 text-gray-600 group-hover:bg-white group-hover:text-blue-600'}
        `}>
          {count}
        </span>
      )}
    </div>
  )
}

export default SidebarItem
