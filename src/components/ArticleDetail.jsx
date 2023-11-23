function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default function ArticleDetail({ article }) {
  const {
    headline: { main: articleTitle },
    byline: { original: author },
    pub_date: publicationDate,
    abstract,
    web_url: articleUrl, // Assuming web_url is the URL of the article
    _id,
  } = article;

  const formattedDate = formatDate(publicationDate);

  const openArticleInNewTab = () => {
    window.open(articleUrl, "_blank");
  };

  return (
    <div>
      <article
        className="bg-white p-4 rounded shadow cursor-pointer hover:text-cyan-600"
        onClick={openArticleInNewTab}
      >
        <h2 className="text-xl font-semibold mb-2 ">{articleTitle}</h2>
        <p className="mb-2">{author}</p>
        <p className="mb-2 text-gray-600">{formattedDate}</p>
        <p>{abstract}</p>
      </article>
    </div>
  );
}
