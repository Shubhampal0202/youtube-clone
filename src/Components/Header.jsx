import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../utils/toggleSidebarSlice";
import { Link } from "react-router-dom";
import { SEARCH_SUGGESTION_API } from "../utils/constant";
import { cacheSearchResult } from "../utils/searchSlice";
import { storeSearchResult } from "../utils/searchSlice";
import { useRef } from "react";

function Header() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const cacheResult = useSelector((state) => state.searchResult.cacheResult);
 
  

  const dispatch = useDispatch();
  const inputBox = useRef();
  const resultBox = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cacheResult[searchText]) {
        setSearchResult(cacheResult[searchText]);
      } else {
        fetchData();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  window.addEventListener("click", (e) => {
    if (e.target !== inputBox.current && e.target !== resultBox.current) {
      setShowSearchResult(false);
    }
  });

  const fetchData = async () => {
    const response = await fetch(SEARCH_SUGGESTION_API + searchText);
    const data = await response.json();

    setSearchResult(data[1]);
    dispatch(cacheSearchResult({ [searchText]: data[1] }));
  };

  const searchData = async (value) => {
 setSearchText(value)
    setShowSearchResult(false);
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${value}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    dispatch(storeSearchResult(data.items));
  };

  return (
    <div className="flex items-center shadow sticky top-0 bg-white">
      <div className="flex items-center w-2/12  ml-4">
        <FaBars
          className="text-xl cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        />
        <Link to={"/"}>
          <img
            className="w-24 ml-4"
            src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg"
            alt="youtube-logo"
          />
        </Link>
      </div>
      <div className="w-8/12 flex flex-col items-center relative">
        <div className="w-[65%] flex">
          <input
            ref={inputBox}
            type="text"
            placeholder="Search"
            className="w-[85%] px-4 py-[6px] rounded-l-full outline-none  outline-offset-0 border border-gray-300"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowSearchResult(true)}
          />
          <button className="px-6 py-[11px] bg-gray-100 rounded-r-full">
            <CiSearch />
          </button>
        </div>
        {showSearchResult && (
          <div
            className="w-[65%] absolute top-10 bg-white rounded-md py-2"
            ref={resultBox}
          >
            {searchResult?.map((item) => (
              <Link
                to={`/results?search_query=${item}`}
                onClick={() => searchData(item)}
                key={item}
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer block"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="w-2/12 flex justify-end mr-4">
        <img
          className="w-10"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
