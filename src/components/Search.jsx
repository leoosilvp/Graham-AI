import { useEffect, useRef } from 'react';
import '../css/aside.css';

function Search() {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    window.dispatchEvent(new CustomEvent("filterChats", { detail: { query } }));
  };

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <article className='search-chat'>
      <label htmlFor="search-chat">
        <i className="fa-solid fa-magnifying-glass"></i> Procurar chats
      </label>
      <input
        id='search-chat'
        ref={inputRef}
        type="text"
        placeholder='Procurar chats (Ctrl + p)'
        onChange={handleChange}
      />
    </article>
  );
}

export default Search;
