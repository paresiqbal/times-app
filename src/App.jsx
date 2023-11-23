import { useState } from "react";

function App() {
  const [article, setArticle] = useState([]);
  const [term, setTerm] = useState("everyting");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchArticle = async () => {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.API_KEY}`
        );
      };
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
