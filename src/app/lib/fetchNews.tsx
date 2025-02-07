// lib/fetchNews.js

import axios from "axios";
import { API_KEYS } from "../../config";

const pageSize = 40;
export const fetchNews = async (category = "technology", page = 1, selectedSource = "bbc-news", index = 0, searchQuery = "latest") => {
    try {
        const url = `https://newsapi.org/v2/everything?q=${category}&keyword=${searchQuery || "latest"}&pageSize=${pageSize}&page=${page}&sources=${selectedSource}&apiKey=${API_KEYS[index]}`;
        // const url = `https://gnews.io/api/v4/top-headlines?q=${category}&keyword=${searchQuery || "latest"}&pageSize=${pageSize}&page=${page}&sources=${selectedSource}&apiKey=${API_KEYS[index]}`;
        console.log(searchQuery);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { articles: [] };
    }
};
