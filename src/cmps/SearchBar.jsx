export function SearchBar() {
  return (
    <div className="search-container">
      <form action="">
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </div>
  );
}
