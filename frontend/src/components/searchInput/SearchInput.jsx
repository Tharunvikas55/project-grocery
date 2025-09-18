import { IconSearch } from '@tabler/icons-react';
import './SearchInput.css'; // <-- import your CSS

function SearchInput({ search, setSearch }) {
  return (
    <div className="search-container">
      {/* <label className="form-label">Search</label> */}
      <div className="search-input-wrapper">
        <IconSearch stroke={2} className="search-icon" />
        <input
          type="search"
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchInput;
