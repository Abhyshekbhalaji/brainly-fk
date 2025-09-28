

import React, { useState, KeyboardEvent } from "react";
import { X, Plus, Video, FileText, Link, Twitter, Hash, Sparkles } from "lucide-react";
import { useDispatch, useSelector} from "react-redux";
import type { RootState } from "../../store/store";
import { closeForm, refreshContent } from "../../store";
import toast from 'react-hot-toast'
import { postUserData } from "../../utils/api";

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

  const handleSubmit = async() => {
    if (!title.trim()) {
      toast.error('Title is required', { duration: 2000 });
      return;
    }
    
    // Show success toast
   const userInput={
      title,content,link,tags,type
    }
   let data= await postUserData(userInput);
    
    if(data.success){
      toast.success('Item added successfully!', { duration: 2000 });
    }else{
      toast.error("Server Error Try again later",{ duration: 2000 });
    }
    
    dispatch(refreshContent());
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

 
        <div className="px-8 py-6 space-y-6">
          

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

 
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Hash className="inline h-4 w-4 mr-1" />
              Tags
            </label>
            

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