
import SidebarItem from './SidebarItem'
import SidebarHeader from './SidebarHeader'

const Sidebar = () => {
  return (
    <div className='h-screen  flex flex-col'>
      <SidebarHeader/>
      <div className='flex-1 py-4'>
        <div className='space-y-1 px-3'>
          <SidebarItem title='tweets' icon='twitter'/>
          <SidebarItem  title='Documents' icon='notes'/>
          <SidebarItem  title='Videos' icon='video'/>
          <SidebarItem  title='Links' icon='links'/>
          <SidebarItem  title='Tags' icon='tags'/>
        </div>
      </div>
      

      <div className='p-4 border-t border-gray-100'>
       
      </div>
    </div>
  )
}

export default Sidebar