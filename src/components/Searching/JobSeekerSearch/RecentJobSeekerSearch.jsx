import { useEffect, useState } from "react";

<<<<<<< HEAD:src/components/Searching/JobSeekerSearch/RecentJobSeekerSearch.jsx

export default function RecentJobSeekerSearch() {
=======
export default function JobSeekerSearch() {
>>>>>>> 9306d8d7ac12977915f88d5af839a2cc1eccde31:src/components/Searching/JobSeekerSearch/JobSeekerSearch.jsx
    const [query, setQuery] = useState("");
    const [role, setRole] = useState("all");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    // 🔹 Load history from localStorage
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setHistory(savedHistory);
    }, []);

    const handleSearch = async (searchQuery = query, searchRole = role) => {
        try {
            setLoading(true);

            const res = await searchUsers({
                query: searchQuery,
                role: searchRole,
                page
            });

            setResults(res.data);

            // 🔥 Save search to history
            const newHistory = [
                { query: searchQuery, role: searchRole },
                ...history.filter(
                    (item) =>
                        item.query !== searchQuery || item.role !== searchRole
                )
            ].slice(0, 5); // max 5 items

            setHistory(newHistory);
            localStorage.setItem("searchHistory", JSON.stringify(newHistory));

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Pagination change
    useEffect(() => {
        handleSearch();
    }, [page]);

    return (
        <div className="p-4">

            {/* 🔍 Search Section */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by name, skills..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">All</option>
                    <option value="jobseeker">Job Seekers</option>
                    <option value="recruiter">Recruiters</option>
                </select>

                <button
                    onClick={() => {
                        setPage(1);
                        handleSearch();
                    }}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Search
                </button>
            </div>

            {/* 🔥 Recent Searches */}
            {history.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Recent Searches:</p>
                    <div className="flex gap-2 flex-wrap">
                        {history.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setQuery(item.query);
                                    setRole(item.role);
                                    setPage(1);
                                    handleSearch(item.query, item.role);
                                }}
                                className="border px-3 py-1 rounded text-sm bg-gray-100"
                            >
                                {item.query} ({item.role})
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ⏳ Loading */}
            {loading && <p>Loading...</p>}

            {/* ❌ No Results */}
            {!loading && results.length === 0 && (
                <p>No results found</p>
            )}

            {/* 📋 Results */}
            <div className="space-y-3">
                {results.map((user) => (
                    <div
                        key={user._id}
                        className="border p-3 rounded shadow-sm"
                    >
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm">{user.email}</p>

                        <p className="text-sm">
                            Skills: {user.skills?.join(", ")}
                        </p>

                        <span className="text-xs text-gray-500">
                            {user.role}
                        </span>
                    </div>
                ))}
            </div>

            {/* 🔁 Pagination */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    className="border px-3 py-1 rounded"
                >
                    Prev
                </button>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="border px-3 py-1 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}