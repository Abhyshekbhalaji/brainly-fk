


import { X, Share2, Brain, Users, Copy, Check } from "lucide-react";
import { closeShare, type StoreInterface} from "../../store";
import { useDispatch, useSelector} from "react-redux";
import type { RootState } from "../../store/store";
// Note: Make sure axios is imported in your actual component file
import { useState } from 'react';
import axios from "axios";
export default function ShareModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isShareOpen);
  const data = useSelector((state:RootState) => state.modal.allContentData);
  
  // State for link management
  const [shareUrl, setShareUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  if (!isOpen) return null;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
  
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  async function handleGenerateLink() {
    setIsLoading(true);
    try {
      let res = await axios.post("http://localhost:3000/api/v1/brain/collection/share", 
        { share: !isSharing }, 
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );

      if (res.data.success) {
        if (!isSharing) {
          // Generated new link
          setShareUrl(res.data.share_url || '');
          setIsSharing(true);
        } else {
          // Removed link
          setShareUrl('');
          setIsSharing(false);
        }
      } else {
        alert(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate share link');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-8 pt-8 pb-6 text-white relative">
          <button 
            onClick={() => dispatch(closeShare())}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Share Your Brain</h2>
              <p className="text-blue-100 text-sm">Spread knowledge, inspire others</p>
            </div>
          </div>
        </div>
        
        <div className="px-8 py-6">
          <div className="space-y-6">
            
            <div className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Share your entire collection of curated content with the world. 
                Others can discover and import your notes, documents, tweets, and videos 
                into their own Second Brain.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <div className="text-2xl font-bold text-blue-600">{data.length}</div>
                <div className="text-xs text-gray-600 font-medium">Total Items</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <div className="text-2xl font-bold text-green-600">
                  {data.filter(item => item.type === 'document').length}
                </div>
                <div className="text-xs text-gray-600 font-medium">Documents</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <div className="text-2xl font-bold text-purple-600">
                  {data.filter(item => item.type === 'video').length}
                </div>
                <div className="text-xs text-gray-600 font-medium">Videos</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleGenerateLink}
                disabled={isLoading}
                className={`
                  w-full font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]
                  ${isSharing 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <Share2 className="h-5 w-5" />
                )}
                <span>
                  {isLoading ? 'Processing...' : isSharing ? 'Stop Sharing' : 'Generate Share Link'}
                </span>
              </button>

              {/* Conditionally render input and copy button only when shareUrl exists */}
              {shareUrl && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your Share Link
                    </label>
                    <input 
                      type="text" 
                      value={shareUrl}
                      readOnly 
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share link will appear here..."
                    />
                  </div>
                  
                  <button 
                    onClick={handleCopyLink}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-md"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </>
              )}

              {/* Show helper text when no link is generated */}
              {!shareUrl && !isLoading && (
                <p className="text-center text-gray-500 text-sm italic py-4">
                  Click "Generate Share Link" to create a shareable URL for your brain collection.
                </p>
              )}
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 text-sm">Privacy Note</h4>
                  <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                    Only the content you've added to your Second Brain will be shared. 
                    No personal information or private data is included.
                    {shareUrl && ' Link expires in 30 days.'}
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="px-8 pb-6">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Sharing helps build a collaborative knowledge network 🧠✨
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}