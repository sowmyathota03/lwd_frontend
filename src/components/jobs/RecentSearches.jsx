import { useEffect, useState } from "react";
import {
  getRecentSearches,
  deleteSearchHistory,
  clearAllSearchHistory,
} from "../../api/searchHistoryApi";

function RecentSearches() {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    try {
      const data = await getRecentSearches(10);
      setSearches(data);
    } catch (error) {
      console.error("Failed to fetch searches", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteSearchHistory(id);
    loadSearches(); // refresh
  };

  const handleClearAll = async () => {
    await clearAllSearchHistory();
    setSearches([]);
  };

  return (
    <div>
      <h3>Recent Searches</h3>

      <button onClick={handleClearAll}>Clear All</button>

      {searches.map((s) => (
        <div key={s.id} style={{ display: "flex", gap: "10px" }}>
          <span>{s.keyword}</span>
          <button onClick={() => handleDelete(s.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default RecentSearches;