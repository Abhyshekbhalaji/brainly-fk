import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
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
  const isOpen = useSelector((state:RootState)=>state.modal.isFormOpen);
  const dispatch=useDispatch();
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
      const formattedTag = `#${currentTag.trim()}`;
      setTags((prev) => [...prev, formattedTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Title is required',{ duration: 2000});
      return;
    }
    // onSubmit({ title, content, link, tags, type });
   alert(`${title} ${content} ${link} ${tags} ${type}`)
    dispatch(closeForm()); // close modal after submit
    // Reset form
    setTitle("");
    setContent("");
    setLink("");
    setTags([]);
    setCurrentTag("");
    setType("Video");
  };
  function handleClose(){
    setTitle("");
    setContent("");
    setLink("");
    setTags([]);
    setCurrentTag("");
    setType("Video");
    dispatch(closeForm());
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative mx-4">
        
    
        <button
          onClick={ handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as FormData["type"])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Video">Video</option>
              <option value="Document">Document</option>
              <option value="Link">Link</option>
              <option value="Tweet">Tweet</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              placeholder="Optional description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
            <input
              type="text"
              placeholder="Optional link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
    
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Add tag and press Enter"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyPress}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

  
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;