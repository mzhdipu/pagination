import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([])
  const [postsPerPage, setPostPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastPosts = currentPage * postsPerPage
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage
  
  const visiblePosts = posts.slice(indexOfFirstPosts, indexOfLastPosts)

  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(res => res.json())
    .then(data => setPosts(data))
  },[])

  const numberOfPages = Math.ceil(posts.length) / postsPerPage
  const pages = [...Array(numberOfPages + 1).keys()].slice(1)
  console.log(pages)

  const prevPageHandler = () =>{
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPageHandler = () =>{
    if(currentPage !== numberOfPages){
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="App">
      
      <div>
        {
          visiblePosts.map(post => <p key={post.id}>{post.id} {post.title}</p>)
        }
      </div>
      
      <button onClick={prevPageHandler} >Prev</button>
      {
        pages.map(page => <button
          key={page}
          onClick={()=>setCurrentPage(page)}
        >{page}</button>)
      }
      <button onClick={nextPageHandler}>Next</button>

      <br /><br /><br />
    </div>
  );
}

export default App;
