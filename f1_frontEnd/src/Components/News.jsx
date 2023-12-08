import React, { useEffect, useState } from "react";
import { db } from "../firebase/base";
import { doc, getDoc } from "firebase/firestore";
import { Loader } from "../loading/LoadingComponent";
import { ToastContainer, toast } from "react-toastify";

const News = () => {
  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const newsArticlesRef = doc(db, "newsArticles", "news");
        const newsArticles = await getDoc(newsArticlesRef);
        const articlesData = newsArticles.data();
        setNews(articlesData.newsArticle);
        setLoading(false);
      } catch (err) {
        toast.error("Something went wrong while fetching news", toastStyle);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full min-h-[50vh]">
          <Loader loading={loading} color="red-600" />
        </div>
      ) : (
        <div className="grid items-center w-full h-full grid-cols-1 gap-8 p-4 mt-2 text-white justify-items-center sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
          {news &&
            news.map((newsData, index) => (
              <div
                key={index}
                className="max-w-[400px] h-full border border-[#7c7b7b] rounded-b-xl hover:bg-[#e2e2e2] hover:text-[#3e3e3e] cursor-pointer hover:scale-105 transition-all duration-500 mb-4"
              >
                <a target="_blank" href={newsData.url}>
                  <img
                    loading="lazy"
                    src={newsData.newsImage}
                    alt={newsData.newsHeading}
                    className="h-[200px] w-full "
                  />
                  <p className="px-4 py-2 my-2 text-xl">
                    {newsData.newsHeading}
                  </p>
                </a>
              </div>
            ))}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      )}
    </>
  );
};

export default News;
