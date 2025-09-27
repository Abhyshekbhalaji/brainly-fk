import { X } from "lucide-react"; // icon for close
import { closeShare, type StoreInterface} from "../../store"; 
import { useDispatch,useSelector} from "react-redux";
import type { RootState } from "../../store/store";

export default function ShareModal() {
  const dispatch=useDispatch();
  const isOpen =useSelector((state:RootState)=> state.modal.isShareOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
  
        <button onClick={() => dispatch(closeShare())}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

 
        <h2 className="text-xl font-semibold text-gray-900">
          Share Your Second Brain
        </h2>


        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          Share your entire collection of notes, documents, tweets, and videos
          with others. They&apos;ll be able to import your content into their
          own Second Brain.
        </p>

        {/* CTA button */}
        <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition">
          <span>Share Brain</span>
        </button>


        <p className="text-center text-gray-500 text-xs mt-3">
          3 items will be shared
        </p>
      </div>
    </div>
  );
}
