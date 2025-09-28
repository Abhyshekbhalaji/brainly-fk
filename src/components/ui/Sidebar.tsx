import {useMemo} from 'react';
import SidebarItem from './SidebarItem'
import SidebarHeader from './SidebarHeader'
import data from '../../db/index';

type NotificationInterface={
  All:number,
  tweet:number,
  document:number,
  video:number,
  link:number,
  tags:number
}
 interface ChildComponentProps {
  tag:string,
      setTag: React.Dispatch<React.SetStateAction<string>>; // Type for the setState function
    }
const Sidebar = ({setTag,tag}:ChildComponentProps) => {


  const count = useMemo<NotificationInterface>(() => {
    return {
      All: data.length,
      tweet: data.filter((c) => c.type === 'tweet').length,
      document: data.filter((c) => c.type === 'document').length,
      video: data.filter((c) => c.type === 'video').length,
      link: data.filter((c) => c.type === 'link').length?data.filter((c) => c.type === 'link').length:0,
      tags: 0
    };
  }, [data]);




  return (
    <div className='h-screen  flex flex-col'>
      <SidebarHeader/>
      <div className='flex-1 py-4'>
        <div className='space-y-1 px-3'>
            <SidebarItem title='Home' icon='home' isActive={tag==='All'} count= {count.All} onClick={()=>setTag('All')}/>
          <SidebarItem title='tweets' icon='twitter'  isActive={tag==='tweet'} count={count.tweet} onClick={()=>setTag('tweet')}/>
          <SidebarItem  title='Documents' icon='notes' isActive={tag==='document'} count={count.document} onClick={()=>setTag('document')}/>
          <SidebarItem  title='Videos' icon='video' isActive={tag==='video'} count={count.video} onClick={()=>setTag('video')}/>
          <SidebarItem  title='Links' icon='links'isActive={tag==='link'} count={count.link} onClick={()=>setTag('link')}/>
        </div>
      </div>
      

      <div className='p-4 border-t border-gray-100'>
       
      </div>
    </div>
  )
}

export default Sidebar