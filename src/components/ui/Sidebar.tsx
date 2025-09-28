import { useMemo } from 'react';
import SidebarItem from './SidebarItem'
import SidebarHeader from './SidebarHeader'
import { useSelector } from 'react-redux';
import { type StoreInterface } from '../../store/index'; // Update path

type NotificationInterface = {
  All: number,
  tweet: number,
  document: number,
  video: number,
  link: number,
  tags: number
}

interface ChildComponentProps {
  tag: string,
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ setTag, tag }: ChildComponentProps) => {
  // Get ALL content data from Redux
  const allContentData = useSelector((state: { modal: StoreInterface }) => state.modal.allContentData);

  const count = useMemo<NotificationInterface>(() => {
    return {
      All: allContentData.length,
      tweet: allContentData.filter((c) => c.type === 'Tweet').length,
      document: allContentData.filter((c) => c.type === 'Document').length,
      video: allContentData.filter((c) => c.type === 'Video').length,
      link: allContentData.filter((c) => c.type === 'Link').length,
      tags: 0
    };
  }, [allContentData]);

  return (
    <div className='h-screen flex flex-col bg-gray-100'>
      <SidebarHeader />
      <div className='flex-1 py-4'>
        <div className='space-y-1 px-3'>
          <SidebarItem 
            title='Home' 
            icon='home' 
            isActive={tag === 'All'} 
            count={count.All} 
            onClick={() => setTag('All')} 
          />
          <SidebarItem 
            title='tweets' 
            icon='twitter' 
            isActive={tag === 'Tweet'} 
            count={count.tweet} 
            onClick={() => setTag('Tweet')} 
          />
          <SidebarItem 
            title='Documents' 
            icon='notes' 
            isActive={tag === 'Document'} 
            count={count.document} 
            onClick={() => setTag('Document')} 
          />
          <SidebarItem 
            title='Videos' 
            icon='video' 
            isActive={tag === 'Video'} 
            count={count.video} 
            onClick={() => setTag('Video')} 
          />
          <SidebarItem 
            title='Links' 
            icon='links' 
            isActive={tag === 'Link'} 
            count={count.link} 
            onClick={() => setTag('Link')} 
          />
        </div>
      </div>
      
      <div className='p-4 border-t border-gray-100'>
        {/* Footer content */}
      </div>
    </div>
  )
}

export default Sidebar