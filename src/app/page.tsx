// page.js

"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetchNews } from "./lib/fetchNews";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState("technology");
    const [page, setPage] = useState(1);
    const [source, setSource] = useState("bbc-news");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const categories = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
    ];
    const sources = [
      "bbc-news",     //97ae0d88962148c4afd1182f23db2a44
      "new-york-times"    //9a5bad17402b46f59de433786b7777eb
      // "gnews"
    ];
    useEffect(() => {
        const getNews = async () => {
            const data = await fetchNews(category, page, source, sources.findIndex((item) => item === source), searchQuery);
            setArticles(data.articles);
        };
        getNews();
    }, [category, page, source, searchQuery]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 text-success">News Aggregator</h1>
            {/* {Filtering Source} */}
            <div className="mb-3">
                <select
                    className="form-select"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                >
                    {sources.map((src) => (
                        <option key={src} value={src}>
                            {src.charAt(0).toUpperCase() + src.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            {/* Filtering Category */}
            <div className="mb-3">
                <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded w-full"
              />
              {/* <button onClick={() => fetchNews(category, page, source, sources.findIndex((item) => item === source), searchQuery)} className="ml-2 bg-blue-500 text-white p-2 rounded">
                Search
              </button> */}
            </div>
            {/* Display NewsCards */}
            <div className="row">
                {articles.length > 0 ? (articles.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={article?.urlToImage || "https://via.placeholder.com/150"}
                                className="card-img-top"
                                alt={article?.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{article?.title || "No Title Available"}</h5>
                                <p className="card-text">{article?.description || "No description available"}</p>
                                <a
                                    href={article?.url}
                                    className="btn btn-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                )))
                : (<p>No articles found.</p>)}
            </div>
            {/* Pagenation Feature */}
            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    disabled={page <= 1}
                >
                    Previous Page
                </button>
                <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
                    Next Page
                </button>
            </div>
        </div>
    );
}
