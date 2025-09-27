import React from 'react'
import { Trash2, Share2, ExternalLink, Play, TwitterIcon } from 'lucide-react'
import { useState, useEffect }  from 'react'

interface NoteCardProps {
  title: string
  content: string
  tags: string[]
  createdDate: string
  contentType?: 'text' | 'youtube' | 'twitter' | 'link'
  onDelete?: () => void
  onShare?: () => void
}


const NoteCard: React.FC<NoteCardProps> = ({
  title,
  content,
  tags,
  createdDate,
  contentType = 'text',
  onDelete,
  onShare
}) => {
  // const [linkPreview, setLinkPreview] = useState<any>(null)
  // const [loading, setLoading] = useState(false)
     
  // Detect content type if not provided
  const detectContentType = (content: string): string => {
    if (content.includes('youtube.com/watch') || content.includes('youtu.be/')) {
      return 'youtube'
    }
    if (content.includes('twitter.com/') || content.includes('x.com/')) {
      return 'twitter'
    }
    if (content.match(/https?:\/\//)) {
      return 'link'
    }
    return 'text'
  }

  const actualContentType = contentType === 'text' ? detectContentType(content) : contentType

  // Extract YouTube video ID
 const getYouTubeId = (url: string): string[] | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? [url, match[2]] : null
}

  // Extract Twitter/X tweet ID
  const getTweetId = (url: string): string[] | null => {
    const regExp = /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/
    const match = url.match(regExp)
  
    return match ? [url,match[1]] : null
  }

  // Format date
  const formatDate = (date: string | Date): string => {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-GB')
    }
    return date
  }
function handleClick(url:string | null){
    if(url){
      window.open(url); 
    }
   
  }
  // YouTube Preview Component
 const YouTubePreview = ({ videoContent }: { videoContent: string[] | null }) => {
  // Early return if no content
  if (!videoContent || videoContent.length < 2) {
    return <div className="text-gray-500 text-sm">Invalid YouTube URL</div>
  }

  const [videoUrl, videoId] = videoContent

  return (
    <div 
      className="relative mb-4 group cursor-pointer"
      onClick={() => handleClick(videoUrl)}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="YouTube thumbnail"
        className="w-full h-48 object-cover rounded-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        }}
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-200">
        <div className="bg-red-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
          <Play size={24} fill="white" color="white" />
        </div>
      </div>
      
      <div className="absolute top-2 right-2">
        <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          YouTube
        </span>
      </div>
      
    </div>
  )
}


  
  // Twitter/X Preview Component  
  const TwitterPreview = ({ tweetId,url }: { tweetId: string | null,url:string | null }) => (
    <div className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm"><TwitterIcon size="15px"/></span>
        </div>
        <span className="text-sm text-gray-600">X Post</span>
      </div>
      <div className="text-sm text-gray-700 mb-3">
        <p>A twitter Post</p>
        <p className="text-gray-500 text-xs mt-1">Tweet ID: {tweetId}</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer" onClick={() => handleClick(url)}>
        <ExternalLink size={12} />
        <span>Click to view on X</span>
      </div>
    </div>
  )

  // Generic Link Preview Component
  const LinkPreview = ({ url }: { url: string }) => {
    const domain = new URL(url).hostname.replace('www.', '')
    
    return (
      <div className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ExternalLink size={20} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900 truncate">{domain}</p>
            <p className="text-xs text-gray-500 truncate">{url}</p>
          </div>
        </div>
      </div>
    )
  }

  // Render content based on type
  const renderContent = () => {
    switch (actualContentType) {
      case 'youtube':
        { const videoId = getYouTubeId(content)
        if (videoId) {
          return <YouTubePreview videoContent={videoId} />
        }
        break }
      
      case 'twitter':
        { const tweetInfo:string[] | null = getTweetId(content)
        if (tweetInfo) {
          return <TwitterPreview tweetId={tweetInfo[1]?tweetInfo[1]:null} url={tweetInfo[0]?tweetInfo[0]:null} />
        }
        break }
      
      case 'link':
        return <LinkPreview url={content} />
      
      default:
        return (
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed ">
              {content}
            </p>
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-full h-fit">
      {/* Header with Title and Action Icons */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-gray-900 flex-1 pr-4 leading-tight textfit">
          {title}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onShare}
            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-all duration-200"
            title="Share note"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-200"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      
      {renderContent()}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Created Date */}
      <p className="text-xs text-gray-500">
        Created on {formatDate(createdDate)}
      </p>
    </div>
  )
}

export default NoteCard

