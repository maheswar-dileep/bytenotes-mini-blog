'use client'
import { useEffect, useState } from "react"
import PostCard from "./PostCard"
import { Zoom } from "react-awesome-reveal";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      <Zoom cascade damping={0.400} triggerOnce>
        {data && data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </Zoom>
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const res = await fetch('/api/post')
    const data = await res.json()
    setPosts(data)
  }

  const searchPosts = async () => {
    const res = await fetch(`/api/post/search?searchText=${searchText}`)
    const data = await res.json()
    return data
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(async () => {
        const searchResult = await searchPosts();
        setPosts(searchResult)
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  return (
    <section className="feed">
      <form className='relative w-full flex flex-center items-baseline gap-5'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
        <button
          type='button'
          onClick={() => {
            getPosts()
          }}
          className='mt-1 w-fit black_btn'
        >
          Refresh
        </button>
      </form>
      {
        posts &&
        <PostCardList data={posts} handleTagClick={handleTagClick} />
      }

    </section>
  )
}

export default Feed
