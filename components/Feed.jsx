'use client'
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromtCartList = ({data,handlerTagClick }) =>{
  return <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handlerTagClick = {handlerTagClick}
        />
      ))}
  </div>
}

const Feed = () => {
  const [searchText,setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const searchHanler = (e) =>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
      setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  const fetchposts = async() =>{

    const response = await fetch('/api/prompt');
   
    const data = await response.json();

    setPosts(data);
  }

  useEffect(() =>{
      
      fetchposts();
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type='text'
        placeholder='search prompt'
        value={searchText}
        onChange={searchHanler}
        required
        className='search_input peer'
        />
      </form>
      {/* All Prompts */}
      {searchText ? (
        <PromtCartList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromtCartList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed