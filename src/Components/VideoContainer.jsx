import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";

function VideoContainer() {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);
  const categoryId = useSelector((state) => state.toggleSidebar.categoryId);
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  
 

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  const fetchData = async () => {
    setError(null);
    try {
      const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
      const response = await fetch(YOUTUBE_API_URL);
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setVideos(data.items);
      }
    } catch (error) {
      
    }
  };
  if (!videos) return null;
  return error ? (
    <h1 className="flex items-center justify-center mt-[50px]">{error}</h1>
  ) : (
    <div className="flex flex-wrap justify-center gap-10 p-4">
      {videos.map((video) => (
        <VideoCard key={video.id} info={video} />
      ))}
    </div>
  );
}

export default VideoContainer;
