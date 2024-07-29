import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <button
          type="submit"
          className="border-2 border-gray-500 rounded-md p-1 bg-blue-600"
        >
          Search
        </button>
        <input
          className="border-2 border-gray-500 rounded-md p-1 bg-gray-600"
          type="text"
          placeholder="Search for products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onClick={handleSearch}
        />
      </form>
    </div>
  );
};

export default SearchBox;
