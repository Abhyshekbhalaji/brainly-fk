// import React, { useState, KeyboardEvent } from "react";
// import { X } from "lucide-react";
// import { useDispatch, useSelector} from "react-redux";
// import type { RootState } from "../../store/store";
// import { closeForm } from "../../store";
// import toast from 'react-hot-toast'
// export interface FormData {
//   title: string;
//   content?: string;
//   link?: string;
//   tags: string[];
//   type: "Video" | "Document" | "Link" | "Tweet";
// }

// const FormModal = () => {
//   const isOpen = useSelector((state:RootState)=>state.modal.isFormOpen);
//   const dispatch=useDispatch();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [link, setLink] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [currentTag, setCurrentTag] = useState("");
//   const [type, setType] = useState<FormData["type"]>("Video");

//   if (!isOpen) return null;

//   const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && currentTag.trim() !== "") {
//       e.preventDefault();
//       const formattedTag = `#${currentTag.trim()}`;
//       setTags((prev) => [...prev, formattedTag]);
//       setCurrentTag("");
//     }
//   };

//   const handleRemoveTag = (tag: string) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   const handleSubmit = () => {
//     if (!title.trim()) {
//       toast.error('Title is required',{ duration: 2000});
//       return;
//     }
//     // onSubmit({ title, content, link, tags, type });
//    alert(`${title} ${content} ${link} ${tags} ${type}`)
//     dispatch(closeForm()); // close modal after submit
//     // Reset form
//     setTitle("");
//     setContent("");
//     setLink("");
//     setTags([]);
//     setCurrentTag("");
//     setType("Video");
//   };
//   function handleClose(){
//     setTitle("");
//     setContent("");
//     setLink("");
//     setTags([]);
//     setCurrentTag("");
//     setType("Video");
//     dispatch(closeForm());
//   }
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative mx-4">
        
    
//         <button
//           onClick={ handleClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h2>

//         <div className="space-y-4">

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
//             <input
//               type="text"
//               placeholder="Enter title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value as FormData["type"])}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="Video">Video</option>
//               <option value="Document">Document</option>
//               <option value="Link">Link</option>
//               <option value="Tweet">Tweet</option>
//             </select>
//           </div>

//           {/* Content */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
//             <textarea
//               placeholder="Optional description"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               rows={3}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//             />
//           </div>

//           {/* Link */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
//             <input
//               type="text"
//               placeholder="Optional link"
//               value={link}
//               onChange={(e) => setLink(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

    
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
    
//             {tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveTag(tag)}
//                       className="text-blue-600 hover:text-blue-800 ml-1"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}

//             <input
//               type="text"
//               placeholder="Add tag and press Enter"
//               value={currentTag}
//               onChange={(e) => setCurrentTag(e.target.value)}
//               onKeyDown={handleTagKeyPress}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

  
//         <div className="mt-6">
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
//           >
//             Add Item
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormModal;


import React, { useState, KeyboardEvent } from "react";
import { X, Plus, Video, FileText, Link, Twitter, Hash, Sparkles } from "lucide-react";
import { useDispatch, useSelector} from "react-redux";
import type { RootState } from "../../store/store";
import { closeForm } from "../../store";
import toast from 'react-hot-toast'

export interface FormData {
  title: string;
  content?: string;
  link?: string;
  tags: string[];
  type: "Video" | "Document" | "Link" | "Tweet";
}

const FormModal = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isFormOpen);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [type, setType] = useState<FormData["type"]>("Video");

  if (!isOpen) return null;

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      const formattedTag = currentTag.trim().replace(/^#/, ""); // Remove # if user adds it
      if (!tags.includes(formattedTag)) {
        setTags((prev) => [...prev, formattedTag]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Title is required', { duration: 2000 });
      return;
    }
    
    // Show success toast
    toast.success('Item added successfully!', { duration: 2000 });
    
    alert(`${title} ${content} ${link} ${tags} ${type}`);
    dispatch(closeForm());
    
    // Reset form
    setTitle("");
    setContent("");
    setLink("");
    setTags([]);
    setCurrentTag("");
    setType("Video");
  };

  function handleClose() {
    setTitle("");
    setContent("");
    setLink("");
    setTags([]);
    setCurrentTag("");
    setType("Video");
    dispatch(closeForm());
  }

  const getTypeIcon = (typeValue: string) => {
    const iconProps = { size: 18, className: "text-current" };
    switch (typeValue) {
      case "Video": return <Video {...iconProps} />;
      case "Document": return <FileText {...iconProps} />;
      case "Link": return <Link {...iconProps} />;
      case "Tweet": return <Twitter {...iconProps} />;
      default: return <FileText {...iconProps} />;
    }
  };

  const getTypeColor = (typeValue: string) => {
    switch (typeValue) {
      case "Video": return "from-red-500 to-red-600";
      case "Document": return "from-blue-500 to-blue-600";
      case "Link": return "from-green-500 to-green-600";
      case "Tweet": return "from-sky-500 to-sky-600";
      default: return "from-blue-500 to-blue-600";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${getTypeColor(type)} px-8 pt-8 pb-6 text-white relative`}>
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Add New Item</h2>
              <p className="text-white/90 text-sm">Build your second brain, one piece at a time</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-6 space-y-6">
          
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Content Type</label>
            <div className="grid grid-cols-4 gap-3">
              {(["Video", "Document", "Link", "Tweet"] as const).map((typeOption) => (
                <button
                  key={typeOption}
                  type="button"
                  onClick={() => setType(typeOption)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2
                    ${type === typeOption 
                      ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-md transform scale-105' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
                    }
                  `}
                >
                  {getTypeIcon(typeOption)}
                  <span className="text-xs font-medium">{typeOption}</span>
                  {type === typeOption && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Give your content a memorable title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400"
              />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Add some context or notes..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 resize-none placeholder:text-gray-400"
              />
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Link/URL</label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400"
                />
                <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Hash className="inline h-4 w-4 mr-1" />
              Tags
            </label>
            
            {/* Display current tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-xl">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-200 rounded-full p-0.5 transition-all duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Type a tag and press Enter..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyPress}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                Enter
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`
                flex-1 bg-gradient-to-r ${getTypeColor(type)} hover:shadow-xl text-white font-semibold py-3 rounded-xl 
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
                flex items-center justify-center gap-2
              `}
            >
              <Plus className="h-4 w-4" />
              Add to Brain
            </button>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-3">
            {title ? `Adding "${title}" to your second brain` : 'Fill in the details above'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormModal;