import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Search() {
  const searchResults = useSelector(
    (state) => state.searchResult.searchResults
  );
 

  return (
    <div className="flex flex-col gap-8 px-16 py-4 ml-[140px]">
      {searchResults.length > 0 &&
        searchResults.map((item) => (
          <Link to={`/0/watch?v=` + item.id.videoId} className="flex w-full gap-4">
            <div className=" w-[360px] h-[300px]">
              <img
                src={item.snippet.thumbnails.high.url}
                alt=""
                className="w-full h-full rounded-sm"
              />
            </div>
            <div className="w-[550px]">
              <h1 className="font-semibold mb-2">{item.snippet.title}</h1>
              <h2>{item.snippet.description}</h2>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Search;
