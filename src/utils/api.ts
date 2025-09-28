import type { dbItem } from "../db";
import axios from "axios";
async function fetchData(tag: string, setContent: React.Dispatch<React.SetStateAction<dbItem[]>>, storeAllContent?: (data: dbItem[]) => void) {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/content", {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        
        if (response?.data.success) {
            const allContent = response.data.content;
            
            // Store all content in Redux if callback provided
            if (storeAllContent) {
                storeAllContent(allContent);
            }
            
            // Filter and set local content
            const filteredContent = filterByTag(tag, allContent);
            setContent(filteredContent);
        }
    } catch (error) {
        console.log(error);
    }
}
async function fetchAllContent(): Promise<dbItem[]> {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/content", {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        
        if (response?.data.success) {
            return response.data.content;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}
// Helper function for filtering
function filterByTag(tag: string, data: dbItem[]): dbItem[] {
    if (tag === 'All') {
        return data;
    }
    return data.filter(item => item.type === tag);
}



    interface userDataInterface{
        title:string,
        content?:string,
        link?:string,
        tags?:string[],
        type: 'Video'|'Link'|'Document'|'Tweet'
    }
    export async function postUserData({title,content,link,tags,type}:userDataInterface){
     try {
      
        let data=await axios.post("http://localhost:3000/api/v1/content",{title,content,link,tags,type},{
            headers:{
              token:localStorage.getItem('token')
            }
          }).catch((error)=>console.log(error));
          if(data?.data.success){
            console.log(data.data);
            return data.data;
          }
      } catch (error:unknown) {
          console.log(error);
      }
} 


export {filterByTag};

export default fetchData;

  