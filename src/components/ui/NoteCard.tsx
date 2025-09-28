// import React from 'react'
// import { Trash2, Share2, ExternalLink, Play, TwitterIcon } from 'lucide-react'
// import { useState, useEffect }  from 'react'

// interface NoteCardProps {
//   title: string
//   link: string | undefined,
//   tags: string[] | undefined,
//   createdDate:Date,
//     contentType?: 'text' | 'youtube' | 'twitter' | 'link' | 'video'
//   onDelete?: () => void
//   onShare?: () => void
// }



// const NoteCard: React.FC<NoteCardProps> = ({
//   title,
//   link,
//   tags,
//   createdDate,
//   contentType = 'text',
//   onDelete,
//   onShare
// }) => {
//   // const [linkPreview, setLinkPreview] = useState<any>(null)
//   // const [loading, setLoading] = useState(false)
     
//   // Detect content type if not provided
//   const detectContentType = (content: string | undefined): string => {
//   if(!content) return "";
//     if (content.includes('youtube.com/watch') || content.includes('youtu.be/')) {
//       return 'youtube'
//     }
//     if (content.includes('x.com/')) {
//       return 'twitter'
//     }
//     if (content.match(/https?:\/\//)) {
//       return 'link'
//     }
//     return 'text'
//   }

//   const actualContentType = (link && contentType === 'text') ? detectContentType(link) : contentType

//   // Extract YouTube video ID
//  const getYouTubeId = (url: string): string[] | null => {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
//   const match = url.match(regExp)
//   return match && match[2].length === 11 ? [url, match[2]] : null
// }

//   // Extract Twitter/X tweet ID
//   const getTweetId = (url: string): string[] | null => {
//     const regExp = /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/
//     const match = url.match(regExp)
  
//     return match ? [url,match[1]] : null
//   }

//   // Format date
//   const formatDate = (date: string | Date): string => {
//     if (date instanceof Date) {
//       return date.toLocaleDateString('en-GB')
//     }
//     return date
//   }
// function handleClick(url:string | null){
//     if(url){
//       window.open(url); 
//     }
   
//   }
//   // YouTube Preview Component
//  const YouTubePreview = ({ videoContent }: { videoContent: string[] | null }) => {
//   // Early return if no content
//   if (!videoContent || videoContent.length < 2) {
//     return <div className="text-gray-500 text-sm">Invalid YouTube URL</div>
//   }

//   const [videoUrl, videoId] = videoContent

//   return (
//     <div 
//       className="relative mb-4 group cursor-pointer"
//       onClick={() => handleClick(videoUrl)}
//     >
//       <img
//         src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
//         alt="YouTube thumbnail"
//         className="w-full h-48 object-cover rounded-lg"
//         onError={(e) => {
//           (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
//         }}
//       />
      
//       <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-200">
//         <div className="bg-red-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
//           <Play size={24} fill="white" color="white" />
//         </div>
//       </div>
      
//       <div className="absolute top-2 right-2">
//         <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//           YouTube
//         </span>
//       </div>
      
//     </div>
//   )
// }


  
//   // Twitter/X Preview Component  
//   const TwitterPreview = ({ tweetId,url }: { tweetId: string | null,url:string | null }) => (
//     <div className="mb-4 border border-blue-200 rounded-lg p-4 bg-blue-50">
//       <div className="flex items-center gap-2 mb-3">
//         <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
//           <span className="text-white font-bold text-sm"><TwitterIcon size="15px"/></span>
//         </div>
//         <span className="text-sm text-blue-500">X Post</span>
//       </div>
//       <div className="text-sm text-gray-700 mb-3">
//         <p>A twitter Post</p>
//         <p className="text-blue-400 text-xs mt-1">Tweet ID: {tweetId}</p>
//       </div>
//       <div className="flex items-center gap-2 text-xs text-blue-500 cursor-pointer hover:text-blue-400 transition-colors duration-200" onClick={() => handleClick(url)}>
//         <ExternalLink size={12} />
//         <span>Click to view on X</span>
//       </div>
//     </div>
//   )

//   // Generic Link Preview Component
//   const LinkPreview = ({ url }: { url: string }) => {
//     const domain = new URL(url).hostname.replace('www.', '')
    
//     return (
//       <div className="mb-4 border border-blue-200 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
//             <ExternalLink size={20} className="text-blue-500" />
//           </div>
//           <div className="flex-1">
//             <p className="font-medium text-sm text-gray-900 truncate">{domain}</p>
//             <p className="text-xs text-blue-500 truncate">{url}</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Render content based on type
//   const renderContent = () => {
//     if(actualContentType && link){
//      switch (actualContentType) {
//       case 'youtube':
//         { const videoId = getYouTubeId(link)
//         if (videoId) {
//           return <YouTubePreview videoContent={videoId} />
//         }
//         break }
      
//       case 'twitter':
//         { const tweetInfo:string[] | null = getTweetId(link)
//         if (tweetInfo) {
//           return <TwitterPreview tweetId={tweetInfo[1]?tweetInfo[1]:null} url={tweetInfo[0]?tweetInfo[0]:null} />
//         }
//         break }
      
//       case 'link':
//         return <LinkPreview url={link} />
      
//       default:
//         return (
//           <div className="mb-4">
//             <p className="text-gray-700 text-sm leading-relaxed ">
//               {link}
//             </p>
//           </div>
//         )
//     } 
//     }
    
//   }

//   return (
//     <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-full h-fit">
    
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="font-bold text-lg text-gray-900 flex-1 pr-4 leading-tight textfit">
//           {title}
//         </h3>
//         <div className="flex gap-2 flex-shrink-0">
//           <button
//             onClick={onShare}
//             className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-50 rounded-md transition-all duration-200"
//             title="Share note"
//           >
//             <Share2 size={16} />
//           </button>
//           <button
//             onClick={onDelete}
//             className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-200"
//             title="Delete note"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>

      
//       {renderContent()}

//       {tags && tags.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-3">
//           {tags.map((tag, index) => (
//             <span
//               key={index}
//               className="px-2 py-1 bg-blue-100 text-blue-500 text-xs font-medium rounded-full hover:bg-blue-300 transition-colors duration-200"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       )}

   
//       <p className="text-xs text-gray-500">
//         Created on {formatDate(createdDate)}
//       </p>
//     </div>
//   )
// }

// export default NoteCard


import React from 'react'
import { Trash2, Share2, ExternalLink, Play, TwitterIcon } from 'lucide-react'

interface NoteCardProps {
  title: string
  link?: string
  tags?: string[]
  createdDate: Date
  contentType?: 'text' | 'youtube' | 'twitter' | 'link' | 'video'
  onDelete: () => void
  onShare?: () => void
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  link,
  tags,
  createdDate=Date.now(),
  contentType = 'text',
  onDelete,
  onShare
}) => {
  // Detect content type
  const detectContentType = (content: string | undefined): string => {
    if (!content) return ""
    if (content.includes('youtube.com/watch') || content.includes('youtu.be/')) return 'youtube'
    if (content.includes('x.com/') || content.includes('twitter.com/')) return 'twitter'
    if (content.match(/https?:\/\//)) return 'link'
    return 'text'
  }

  const actualContentType = (link && contentType === 'text') ? detectContentType(link) : contentType

  // Helpers
const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

  const handleClick = (url: string | null) => url && window.open(url, '_blank')

  
  const YouTubePreview = ({ url }: { url: string }) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null
    if (!videoId) return null

    return (
      <div
        className="relative mb-4 group cursor-pointer rounded-lg overflow-hidden border border-gray-200"
        onClick={() => handleClick(url)}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="YouTube thumbnail"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center 
                        group-hover:bg-black/30 transition">
          <div className="bg-red-600 rounded-full p-3 shadow-lg 
                          group-hover:scale-110 transition-transform">
            <Play size={24} color="white" fill="white" />
          </div>
        </div>
        <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          YouTube
        </span>
      </div>
    )
  }

  const TwitterPreview = ({ url }: { url: string }) => (
    <div className="mb-4 border border-blue-200 rounded-lg p-4 bg-blue-50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <TwitterIcon size={15} color="white" />
        </div>
        <span className="text-sm text-blue-500 font-medium">X Post</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">A Twitter post preview</p>
      <button
        onClick={() => handleClick(url)}
        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-500 transition"
      >
        <ExternalLink size={12} />
        View on X
      </button>
    </div>
  )

  const LinkPreview = ({ url }: { url: string }) => {
    const domain = new URL(url).hostname.replace('www.', '')
    return (
      <div
        className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50 
                   hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => handleClick(url)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ExternalLink size={18} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900 truncate">{domain}</p>
            <p className="text-xs text-blue-500 truncate">{url}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (!link) return null
    switch (actualContentType) {
      case 'youtube': return <YouTubePreview url={link} />
      case 'twitter': return <TwitterPreview url={link} />
      case 'link': return <LinkPreview url={link} />
      default:
        return <p className="mb-4 text-sm text-gray-700 leading-relaxed break-words">{link}</p>
    }
  }

  return (
    <div
      className="bg-gray-100 rounded-xl border border-gray-200 p-6 shadow-sm 
                 hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
    >

      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg text-gray-900 flex-1 pr-4 leading-tight">
          {title}
        </h3>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-gray-400">{formatDate(createdDate)}</span>
          <div className="flex gap-1 bg-gray-50 rounded-md p-0.5">
            <button
              onClick={onShare}
              className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-100 rounded transition"
              title="Share note"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded transition"
              title="Delete note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

 
      {renderContent()}


      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, i) => (
            <span
              key={tag._id}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium 
                         rounded-full hover:bg-blue-200 hover:text-blue-600 transition"
            >
              #{tag.title}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default NoteCard
