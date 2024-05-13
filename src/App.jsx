import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetch } from './hooks/useFetch'

function App() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts')
  const { data: posts, isLoading, error } = useFetch(url);

  return (
    <>
      {/* option to change URL
      <button onClick={() => setUrl('https://jsonplaceholder.typicode.com/posts')}>posts</button> */}

      {error && <div>{error}</div>}

      {isLoading && <div>loading posts...</div>}

      {posts && posts.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </>
  )
}

export default App
