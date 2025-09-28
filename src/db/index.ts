

export interface dbItem{
    id: number;
    _id: number;
    type:string,
    title:string,
    content?:string,
    tags?:string[],
    link?:string,
    createdAt:Date
}
export type dbInterface={
    data:dbItem[]

}

const backend_call:dbItem[]=[
{
    type:"video",
    title:"Savukku Shankar video",
    tags:["politics","savukku"],
    link:"https://youtu.be/QWbrQFvBVX0?si=4PN9rMtj8rl2v1eo",
    createdAt:new Date(Date.now())
},
{
    type:"tweet",
    title:"Interesting tweet",
    link:"https://x.com/AbhyAtTech/status/1971830218211107214",
    tags:['social', 'news'],
    createdAt:new Date(Date.now())
},{
    type:"document",

     title:"Meeting Notes with some really long content that should expand properly",
    content:"This is a regular text note with important information that contains much more content than the previous examples. It should demonstrate how the card expands to accommodate longer content while maintaining a clean, readable layout. The card should grow in height as needed while keeping consistent spacing and alignment with other cards in the grid.",
            tags:['work', 'meeting', 'important', 'long-content'],
            createdAt:new Date(Date.now())
}
]



export default backend_call;

/**
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