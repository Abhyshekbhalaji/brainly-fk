import React from 'react'
import Header from './Header'
import NoteCard from './NoteCard'

const Content = () => {
  return (
    <div className='w-full min-h-screen bg-gray-50'>
      <Header />
      
      <div className='p-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
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
        </div>
      </div>
    </div>
  )
}

export default Content