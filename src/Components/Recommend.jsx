import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { value_converter } from "../utils/constant";

function Recommend() {
  const [recommendedData, setRecommendedData] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setRecommendedData(data.items);
  };

  return (
    <div className="px-4 w-full flex flex-col gap-6 h-screen overflow-y-scroll no-scrollbar">
      {recommendedData &&
        recommendedData.map((item) => (
          <Link
            to={`/${item.snippet.categoryId}/watch?v=` + item.id}
            className="flex w-full gap-3"
          >
            <div className="w-[200px] h-[120px]">
              <img
                className="w-full h-full rounded-sm"
                src={item.snippet.thumbnails.medium.url}
                alt=""
              />
            </div>
            <div className="w-[280px] flex flex-col">
              <h1 className="flex-1">{item.snippet.title}</h1>
              <h1 className="font-semibold">{item.snippet.channelTitle}</h1>
              <p className="mt-2">
                {value_converter(item.statistics.viewCount)} Views
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Recommend;
