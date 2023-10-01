import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;

  const visiblePosts = posts.slice(indexOfFirstPosts, indexOfLastPosts);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const numberOfPages = Math.ceil(posts.length) / postsPerPage;
  const pages = [...Array(numberOfPages + 1).keys()].slice(1);
  console.log(pages);

  const prevPageHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <div>
        {visiblePosts.map((post) => (
          <p key={post.id}>
            {post.id} {post.title}
          </p>
        ))}
      </div>

      <button onClick={prevPageHandler} disabled={currentPage === 1}>
        Prev
      </button>
      {pages.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
      <button
        onClick={nextPageHandler}
        disabled={currentPage === numberOfPages}
      >
        Next
      </button>

      <p>Show Per Page</p>
      <select name="" id="" onChange={(e) => setPostPerPage(e.target.value)}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>

      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
