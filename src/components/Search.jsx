import '../css/aside.css';

function Search() {
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    window.dispatchEvent(new CustomEvent("filterChats", { detail: { query } }));
  };

  return (
    <article className='search-chat'>
      <label htmlFor="search-chat">
        <i className="fa-solid fa-magnifying-glass"></i> Search chats
      </label>
      <input
        id='search-chat'
        type="text"
        placeholder='Buscar conversas...'
        onChange={handleChange}
      />
    </article>
  );
}

export default Search;
