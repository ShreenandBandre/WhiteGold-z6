"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"; // shadcn/ui card
// import { motion } from "framer-motion";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

export default function AgricultureNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=agriculture&language=en&sortBy=publishedAt&pageSize=9&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading agriculture news...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🌾 Agriculture News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read more →
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
