import React from "react";
import { Link } from "react-router-dom";
import { value_converter } from "../utils/constant";
import moment from "moment";
import { IoIosCheckmarkCircle } from "react-icons/io";

function VideoCard({ info }) {
  const { thumbnails, title, channelTitle,categoryId } = info.snippet;
  const { viewCount } = info.statistics;
 

  return (
    <Link to={`/${categoryId}/watch?v=` + info.id}>
      <div className="w-[250px] border h-[100%]">
        <div>
          <img src={thumbnails.medium.url} alt="" className="rounded-lg" />
        </div>
        <div className="p-1 flex flex-col gap-2">
          <h1 className="font-semibold">{title}</h1>
          <div className="flex items-center gap-1">
            <p>{channelTitle}</p>
            <IoIosCheckmarkCircle className="mt-1" />
          </div>
          <p>
            {value_converter(viewCount)} views &bull;{" "}
            {moment(info.snippet.publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
