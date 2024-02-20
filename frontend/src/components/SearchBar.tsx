import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
const SearchBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  useEffect(() => {
    return () => {
      setShowSearchBar(false);
    };
  }, [location]);
  return (
    <div className="flex items-center gap-2 text-xs md:text-sm ">
      <button className="p-1" onClick={() => setShowSearchBar((prev) => !prev)}>
        <FiSearch size={20} />
      </button>
      {showSearchBar && (
        <>
          <input type="text" placeholder="Search for jobs..." className="p-1" />
          <button className="bg-gray-800 text-white px-4 rounded p-1">
            Search
          </button>
        </>
      )}
    </div>
  );
};

export default SearchBar;
