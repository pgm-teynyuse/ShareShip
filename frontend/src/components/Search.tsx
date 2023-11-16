// SearchComponent.tsx
import React from "react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searchBy: string;
  setSearchBy: (searchBy: string) => void;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  setSearchTerm,
  searchBy,
  setSearchBy,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 border rounded-md w-60"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="ml-2 px-3 py-2 border rounded-md"
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        <option value="title">Search by Title</option>
        <option value="category">Search by Category</option>
      </select>
    </div>
  );
};

export default Search;
