import {useState} from 'react'
import Content from './Content';
import Sidebar from './Sidebar';

import ShareModal from './ShareModal';
import FormModal from './FormModal';
const Home = () => {

      const [tags,setTags]=useState("All");
  return (
    <>
    <div className=' h-screen grid grid-cols-12 grid-row-4 ' >
      <div className='h-screen col-span-3'>
        <Sidebar setTag={setTags} tag={tags}/>
      </div>
      <div className=' h-screen bg-yellow-200 col-span-9 '>
      <Content tag={tags}/>
        
      </div>

    </div>
    <div>
      <ShareModal/>
      <FormModal/>
      </div> 
    </>
    
  )
}

export default Home