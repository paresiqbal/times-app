import { useState, useEffect } from "react";
import ArticleDetails from "./components/ArticleDetail"; // Import the ArticleDetails component

function App() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      const data = await res.json();
      setArticles(data.response.docs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6 underline">
          New York Times Articles
        </h1>

        {/* Search Form input */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Search Article's"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 rounded-full mr-2"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-white px-4 py-2 rounded-full"
          >
            Search
          </button>
        </form>
      </div>

      {/* Article */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleDetails key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
