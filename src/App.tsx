
import  { useState } from 'react';
import {Toaster} from 'react-hot-toast'
import './App.css';
import { Provider } from 'react-redux';
import Content from './components/ui/Content';
import Sidebar from './components/ui/Sidebar';
import { store } from './store/store';
import ShareModal from './components/ui/ShareModal';
import FormModal from './components/ui/FormModal';
function App() {
  const [tags,setTags]=useState("All");
  return (
    <Provider store={store}>
   <Toaster toastOptions={{
    success: {
      style: {
        background: 'green',
      },
    },
    error: {
      style: {
        background: '#f56565',
        fontWeight:'bold'
      },

    },
  }}/>
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

     
    </Provider>
    
  )
}

export default App
