import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { vesselService } from '../../services/vesselService';
import { useAppStore } from '../../store/useAppStore';
import type { Vessel } from '../../types';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedVessel = useAppStore((state) => state.setSelectedVessel);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Vessel[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const matchedVessels = await vesselService.searchVessels(query);
    setResults(matchedVessels);
    setSearched(true);

    if (matchedVessels.length === 1) {
      setSelectedVessel(matchedVessels[0]);
    }
  };

  const handleSelect = (vessel: Vessel) => {
    setSelectedVessel(vessel);
    setQuery(vessel.name);
    setResults([]);
    setSearched(false);
    navigate(`/vessel/${vessel.id}`);
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] w-96">
      <div className="bg-white rounded shadow-md flex items-center overflow-hidden">
        <input
          type="text"
          placeholder="搜索船名、MMSI、IMO、港口"
          className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearched(false);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="bg-secondary text-white p-2 hover:bg-blue-700 transition-colors"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {searched && (
        <div className="mt-2 bg-white rounded shadow-lg max-h-80 overflow-auto border border-gray-100">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">未找到匹配船舶</div>
          ) : (
            results.map((vessel) => (
              <button
                key={vessel.id}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(vessel)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{vessel.name}</span>
                  <span className="text-xs text-gray-500">{vessel.type}</span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  MMSI {vessel.mmsi} · {vessel.destination} · {vessel.speed} kn
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
