import { useState, useEffect } from "react";

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
        setArticles(data.response.docs); // Assuming 'docs' holds the articles data
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [term]);

  return (
    <div>
      <h1>Hello World</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>{article.headline.main}</li>
            // Adjust the key and data properties according to the structure of the article data
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
