import { useState, useEffect } from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function App() {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState("everything");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${
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

    fetchArticle();
  }, [term]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">NY Times Articles</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const {
              headline: { main: articleTitle },
              byline: { original: author },
              pub_date: publicationDate,
              abstract,
              _id,
            } = article;

            const formattedDate = formatDate(publicationDate);

            return (
              <article key={_id} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">{articleTitle}</h2>
                <p className="text-gray-600 mb-2">{author}</p>
                <p className="text-gray-500 mb-2">{formattedDate}</p>
                <p>{abstract}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
