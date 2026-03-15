import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query);
    // TODO: Implement search logic
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] w-80 bg-white rounded shadow-md flex items-center overflow-hidden">
      <input
        type="text"
        placeholder="搜索船舶、港口"
        className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button 
        className="bg-secondary text-white p-2 hover:bg-secondary-dark transition-colors"
        onClick={handleSearch}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
