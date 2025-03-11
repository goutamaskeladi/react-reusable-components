import { useEffect, useState } from "react";
import Card from "./Card";
import useFetch from "../hooks/useFetch";

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const URL = `https://meme-api.com/gimme/${page}`; // https://github.com/D3vd/Meme_Api
  const { data, error, isLoading } = useFetch(URL);
  const { memes } = data;
  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const throttle = (fn, delay) => {
    let t = 0;
    return function (...args) {
      let now = Date.now();
      if (now - t >= delay) {
        fn.apply(this, args);
        t = now;
      }
    };
  };
  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 500));
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    data && (
      <div className="card-container">
        {memes?.map((item, index) => {
          return <Card key={index} {...item} />;
        })}
        {isLoading && <h2>Loading...</h2>}
      </div>
    )
  );
};

export default InfiniteScroll;
