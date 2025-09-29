import axios from 'axios'
import Header from './Header'
import NoteCard from './NoteCard'


interface ChildComponentProps{
  tag : string
}
import SmallShareModal from './SmallShare.tsx'
import { type dbItem } from '../../db/index.ts'
import { useEffect, useState } from 'react'
import fetchData, { filterByTag } from '../../utils/api.ts'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux';
import { type StoreInterface, setAllContentData, updateContent } from '../../store/index.ts'; // Added refreshContent

type DbContentType = "video" | "document" | "tweet" | "link";
type NoteCardContentType = "text" | "youtube" | "twitter" | "link";

const mapContentType = (dbType: DbContentType): NoteCardContentType => {
    switch (dbType) {
        case "video":
            return "youtube";
        case "document":
            return "text";
        case "tweet":
            return "twitter";
        case "link":
            return "link";
        default:
            return "text";
    }
}

const Content = ({tag}: ChildComponentProps) => {
    const [content, setContent] = useState<dbItem[]>([]);
    const [isShareOpen, setShareOpen] = useState(false);
    const [shareData, setShareData] = useState({ title: '', link: '' });
    
    const dispatch = useDispatch();
    const contentRefreshTrigger = useSelector((state: { modal: StoreInterface }) => state.modal.contentRefreshTrigger);
    const allContentData = useSelector((state: { modal: StoreInterface }) => state.modal.allContentData);

    // Fetch data from API when refresh trigger changes
    useEffect(() => {
        fetchData(tag, setContent, (allData) => {
            dispatch(setAllContentData(allData));
        });
    }, [contentRefreshTrigger, dispatch, tag]);

    // Filter when tag changes without API call
    useEffect(() => {
        if (allContentData.length > 0) {
            const filteredContent = filterByTag(tag, allContentData);
            setContent(filteredContent);
        }
    }, [tag, allContentData]);
    
    async function handleShare(id:string,title:string) {
     try {
        let res= await axios.post(`${import.meta.env.VITE_BACKEND_DEPLOY_URL}api/v1/brain/share`,
            {
                contentId:id,
                share:true
            },
            {
            headers:{
                token:localStorage.getItem("token")
            }    
            }
            
        )
        console.log(res);
        if(res.data.success){
          setShareData({ title: title, link: res.data.share_url });
        setShareOpen(true);  
        }
     } catch (error) {
            console.log(error);
     }
       
        
    }

    async function handleDelete(contentId: string) {
    // ✅ Add debugging
    console.log('Attempting to delete:', contentId);
    console.log('Content array before delete:', content.map(item => ({ id: item._id, title: item.title })));
    
    const prevContent = [...content];
    const prevAllContent = [...allContentData];
    

    const newContent = content.filter(item => String(item._id) !== String(contentId));
    const newAllContent = allContentData.filter(item => String(item._id) !== String(contentId));
    
    console.log('Content array after filter:', newContent.map(item => ({ id: item._id, title: item.title })));
    
    setContent(newContent);
    dispatch(setAllContentData(newAllContent));

    try {
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_DEPLOY_URL}api/v1/content/`, {
            data: { contentId: contentId }, 
            headers: { token: localStorage.getItem('token') }
        });

        if (res.data.success) {
            toast.success('Content deleted successfully');
            console.log('Delete successful on server');
        } else {
            throw new Error('Deletion failed');
        }
    } catch (err) {
        console.error('Delete failed:', err);
        toast.error('Something went wrong!');
        setContent(prevContent);
        dispatch(setAllContentData(prevAllContent));
    }
}


    return (
        <div className='w-full min-h-screen bg-gray-50'>
            <Header />
            
            <div className='p-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {content.length === 0 ? 
                        <p className="col-span-full text-center text-gray-400 text-lg font-medium py-16 border border-dashed border-gray-200 rounded-lg">
                            You haven't published any content yet!
                        </p> : 
                        content.map((c: dbItem, index) => (
                            <NoteCard 
                                key={c._id || `${index}-${c.createdAt}`} 
                                title={c.title} 
                                link={c.content ? c.content : c.link} 
                                tags={c.tags} 
                                createdDate={c.createdAt} 
                                contentType={mapContentType(c.type as DbContentType)}
                                onDelete={() => handleDelete(String(c._id))}
                                onShare={() => handleShare(String(c._id),c.title)} 
                            />
                        ))
                    }
                </div>
                <SmallShareModal
                    isOpen={isShareOpen}
                    onClose={() => setShareOpen(false)}
                    postTitle={shareData.title}
                    postLink={shareData.link}
                />
            </div>
        </div>
    )
}

export default Content