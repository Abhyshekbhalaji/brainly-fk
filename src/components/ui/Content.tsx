
import Header from './Header'
import NoteCard from './NoteCard'
import Data from '../../db/index.ts'

interface ChildComponentProps{
  tag : string
}
import { type dbItem } from '../../db/index.ts'
import { useEffect, useState } from 'react'

/* 
interface NoteCardProps {
  title: string
  content: string
  tags: string[]
  createdDate: string
  contentType?: 'text' | 'youtube' | 'twitter' | 'link'
  onDelete?: () => void
  onShare?: () => void
}



*/
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
const Content = ({tag}:ChildComponentProps) => {
    const [content,setContent]=useState<dbItem[]>([]);
  function filterByTag(tag: string, data: dbItem[]): dbItem[]{
        // If tag is "all" or empty, return all data
      
        if (tag === "All" || !tag) {
            return data;
        }
        
        
        // FIXED: Use === instead of !== to INCLUDE matching items
        switch(tag) {
            case "video":
              return data.filter((c) => c.type === tag);
            case "document":
                return data.filter((c) => c.type === tag); // Show only document items
            case "link":
                return data.filter((c) => c.type === tag); // Show only link items
            case "tweet":
                return data.filter((c) => c.type === tag); // Show only tweet items
            default:
                return data;
        }
    }
 

  useEffect(()=>{
    const res=filterByTag(tag,Data);
    setContent(res);
  },[tag])
    


  function handleDelete(index:number){
     setContent(prev => prev.filter((_,i) =>  i!== index))   
    /// data call to delete will happen here with axios: _
    
  }
  return (
    <div className='w-full min-h-screen bg-gray-50'>
      <Header />
      
      <div className='p-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {content.map((c:dbItem, index)=>(
      <NoteCard key ={index} title={c.title} link={c.content?c.content:c.link} tags={c.tags} createdDate={c.createdAt} contentType={mapContentType(c.type as DbContentType)}
      onDelete={()=>handleDelete(index)} />
    ))}
        </div>
      </div>
    </div>
  )
}

export default Content

/*
  <NoteCard
            title="Savukku Shankar video"
            content="https://youtu.be/QWbrQFvBVX0?si=4PN9rMtj8rl2v1eo"
            tags={['tutorial', 'coding']}
            createdDate="27/09/2025"
          />

          <NoteCard
            title="Interesting Tweet"
            content="https://x.com/AbhyAtTech/status/1971830218211107214"
            tags={['social', 'news']}
            createdDate="27/09/2025"
          />

          <NoteCard
            title="Useful Article"
            content="https://example.com/article"
            tags={['article', 'reading']}
            createdDate="27/09/2025"
          />

          <NoteCard
            title="Meeting Notes with some really long content that should expand properly"
            content="This is a regular text note with important information that contains much more content than the previous examples. It should demonstrate how the card expands to accommodate longer content while maintaining a clean, readable layout. The card should grow in height as needed while keeping consistent spacing and alignment with other cards in the grid."
            tags={['work', 'meeting', 'important', 'long-content']}
            createdDate="27/09/2025"
          />

          <NoteCard
            title="Another Long Example"
            content="Here's another example with substantial content to show how multiple cards with different content lengths work together in the responsive grid layout."
            tags={['example', 'demo']}
            createdDate="27/09/2025"
          />


*/


