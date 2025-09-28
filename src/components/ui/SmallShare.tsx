import React, { useState, useEffect } from 'react'
import { X, Copy } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  postTitle: string
  postLink: string
}

const SmallShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, postTitle, postLink }) => {
  const [copied, setCopied] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) setShow(true)
    else setTimeout(() => setShow(false), 200) 
  }, [isOpen])

  const handleCopy = () => {
    navigator.clipboard.writeText(postLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!show) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200
      ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`bg-white rounded-xl w-full max-w-md p-6 relative shadow-2xl transform transition-all duration-200
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
      
        <button
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          Share "{postTitle}"
        </h2>

        {/* Post Link */}
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-sm">
          <input
            type="text"
            readOnly
            value={postLink}
            className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 transition flex items-center gap-2"
            title="Copy Link"
          >
            <Copy size={16} className={copied ? 'text-green-500' : 'text-gray-600'} />
            <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

     
        
      </div>
    </div>
  )
}

export default SmallShareModal
