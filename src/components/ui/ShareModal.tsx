// import { X } from "lucide-react"; // icon for close
// import { closeShare, type StoreInterface} from "../../store"; 
// import { useDispatch,useSelector} from "react-redux";
// import type { RootState } from "../../store/store";
// import data from '../../db/index';
// export default function ShareModal() {
//   const dispatch=useDispatch();
//   const isOpen =useSelector((state:RootState)=> state.modal.isShareOpen);
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

//       <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
  
//         <button onClick={() => dispatch(closeShare())}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <X className="h-5 w-5" />
//         </button>

 
//         <h2 className="text-xl font-semibold text-gray-900">
//           Share Your Second Brain
//         </h2>


//         <p className="text-gray-600 mt-2 text-sm leading-relaxed">
//           Share your entire collection of notes, documents, tweets, and videos
//           with others. They&apos;ll be able to import your content into their
//           own Second Brain.
//         </p>

//         <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition">
//           <span>Share Brain</span>
//         </button>


//         <p className="text-center text-gray-500 text-xs mt-3">
//           {data.length} items will be shared
//         </p>
//       </div>
//     </div>
//   );
// }


import { X, Share2, Brain, Users, Copy } from "lucide-react";
import { closeShare, type StoreInterface} from "../../store";
import { useDispatch, useSelector} from "react-redux";
import type { RootState } from "../../store/store";
import data from '../../db/index';

export default function ShareModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isShareOpen);
  
  if (!isOpen) return null;
  
  const handleCopyLink = () => {

    navigator.clipboard.writeText("https://secondbrain.app/shared/your-brain");
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        
        {/* Header with gradient background */}
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
        
        {/* Content */}
        <div className="px-8 py-6">
          <div className="space-y-6">
            
            {/* Description */}
            <div className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Share your entire collection of curated content with the world. 
                Others can discover and import your notes, documents, tweets, and videos 
                into their own Second Brain.
              </p>
            </div>
            
            {/* Stats */}
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
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Share2 className="h-5 w-5" />
                <span>Generate Share Link</span>
              </button>
              
              <button 
                onClick={handleCopyLink}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-md"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Link</span>
              </button>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 text-sm">Privacy Note</h4>
                  <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                    Only the content you've added to your Second Brain will be shared. 
                    No personal information or private data is included.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Footer */}
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