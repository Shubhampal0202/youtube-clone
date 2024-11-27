import React, { useEffect, useState } from "react";
import { closeSidebar } from "../utils/toggleSidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { value_converter } from "../utils/constant";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdSave } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import Recommend from "./Recommend";

import moment from "moment";

function WatchVideo() {
  const [videoDetails, setVideoDetails] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);
    const toggleSidebarValue = useSelector(
      (state) => state.toggleSidebar.isOpenSidebar
    );

  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  useEffect(() => {
    fetchData();
  }, [videoId]);

  useEffect(() => {
    getChannelData();
  }, [videoDetails]);

  const fetchData = async () => {
    const video_detail_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const response = await fetch(video_detail_url);
    const data = await response.json();
    setVideoDetails(data.items[0]);
  };
  const getChannelData = async () => {
    const channel_data_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoDetails?.snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const response = await fetch(channel_data_url);
    const data = await response.json();

    setChannelData(data?.items?.[0]);

    const comment_data_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const res = await fetch(comment_data_url);
    const cData = await res.json();

    setCommentData(cData.items);
  };

  return (
    <div className="p-4 flex justify-between">
      <div
        className={`${
          toggleSidebarValue ? "w-[45vw] ml-[200px]" : "w-[55vw]"
        } `}
      >
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Create YouTube Clone Using React JS | Build Complete Website Like YouTube In React JS 2024"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="mt-1  border-b-2 pb-3 px-2 w-full">
          <h1 className="font-semibold">{videoDetails?.snippet.title}</h1>
          <div className="flex justify-between items-center">
            <div className="text-[12px] ">
              {value_converter(videoDetails?.statistics.viewCount)} views &bull;{" "}
              {moment(videoDetails?.snippet.publishedAt).fromNow()}
            </div>
            <div className="flex gap-3 text-[14px]">
              <div className="flex items-center">
                <AiOutlineLike />
                {value_converter(videoDetails?.statistics.likeCount)}
              </div>
              <div className="flex items-center mt-1">
                <AiOutlineDislike />
              </div>
              <div className="flex items-center">
                <IoMdShareAlt />
                Share
              </div>
              <div className="flex items-center">
                <MdSave />
                Save
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 px-1 w-full">
          <div className="flex gap-2 items-center">
            <img
              className="w-[30px] rounded-full"
              src={channelData?.snippet.thumbnails.default.url}
              alt="logo"
            />
            <div>
              <h2 className="font-semibold">
                {videoDetails?.snippet.channelTitle}
              </h2>
              <p className="text-[12px]">
                {value_converter(channelData?.statistics.subscriberCount)}{" "}
                Subscribers
              </p>
            </div>
          </div>
          <div>
            <button className="bg-red-700 px-3 py-1 rounded-sm text-white">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-full mt-2 px-8 ">
          <p className=" border-b-2 pb-3">
            {!showMore ? (
              <span>
                {videoDetails?.snippet.description.slice(0, 250)}...{" "}
                <span
                  className="cursor-pointer font-semibold"
                  onClick={() => setShowMore(true)}
                >
                  showMore
                </span>
              </span>
            ) : (
              <span>
                {videoDetails?.snippet.description}{" "}
                <span
                  className="cursor-pointer font-semibold"
                  onClick={() => setShowMore(false)}
                >
                  showLess
                </span>
              </span>
            )}
          </p>
          <h2 className="text-gray-500">
            {value_converter(videoDetails?.statistics.commentCount)} Comments
          </h2>
        </div>

        <div className="w-full mt-2 px-8">
          {commentData?.map((item) => (
            <div className="flex gap-3 mb-4">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h2>
                  <span className="font-semibold mr-1">
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                  </span>
                  <span className="text-gray-400 text-[14px]">
                    {moment(
                      item.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h2>
                <p className="text-gray-500">
                  {item.snippet.topLevelComment.snippet.textOriginal}
                </p>
                <div className="flex items-center gap-1">
                  <AiOutlineLike />
                  <span className="mr-4">
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <AiOutlineDislike />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={` ${toggleSidebarValue ? "w-[32vw]" : "w-[40vw]"} `}>
        <Recommend />
      </div>
    </div>
  );
}

export default WatchVideo;
