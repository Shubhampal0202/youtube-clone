import React from "react";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { IoIosArrowForward } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { PiVideoFill } from "react-icons/pi";
import { MdOutlineWatchLater } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";
import { HiDownload } from "react-icons/hi";
import { MdMovie } from "react-icons/md";
import { MdOutlineNewspaper } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { LuPodcast } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa";
import { SlScreenDesktop } from "react-icons/sl";
import { GrTechnology } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../utils/toggleSidebarSlice";

const list = [
  { name: "Home", img: <IoMdHome className="text-xl" /> ,id:0},
  { name: "Shorts", img: <SiYoutubeshorts className="text-xl" />,id:42 },
  { name: "Music", img: <MdLibraryMusic className="text-xl" /> ,id:10},
  { name: "Gaming", img: <SiYoutubegaming className="text-xl" />,id:20 },
  { name: "News", img: <MdOutlineNewspaper className="text-xl" />,id:25 },
  { name: "Sports", img: <GoTrophy className="text-xl" />,id:17 },
  { name: "Movies", img: <MdMovie className="text-xl" />,id:30 },
  { name: "Automobile", img: <FaCarSide className="text-xl" />,id:2},
  { name: "Entertainment", img: <SlScreenDesktop className="text-xl" />,id:24 },
  { name: "Technology", img: <GrTechnology className="text-xl" />,id:28 },
  { name: "Education", img: <IoBookSharp className="text-xl" /> ,id:27},
  { name: "blogs", img: <LuPodcast className="text-xl" />,id:22 },
];
const yours = [
  { name: "History", img: <GoHistory className="text-xl" /> },
  { name: "playlist", img: <MdOutlinePlaylistPlay className="text-xl" /> },
  { name: "Your videos", img: <PiVideoFill className="text-xl" /> },
  { name: "Watch later", img: <MdOutlineWatchLater className="text-xl" /> },
  { name: "Liked videos", img: <GoThumbsup className="text-xl" /> },
  { name: "Downloads", img: <HiDownload className="text-xl" /> },
];



function Sidebar() {

  const dispatch = useDispatch()
  const toggleSidebarValue = useSelector(
    (state) => state.toggleSidebar.isOpenSidebar
  );
    const categoryId = useSelector((state) => state.toggleSidebar.categoryId);

  if (!toggleSidebarValue) return null;
  return (
    <div className="w-[16%] shadow overflow-y-scroll scrollbar-hide h-[90vh] fixed z-10">
      <div className="ml-6">
        {list.map((item) => (
          <div
            className={`${categoryId === item.id ? "border-b-2 bg-gray-200":""}   flex items-center gap-4  mr-1 px-2 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer`}
            onClick={() => dispatch(updateCategory(item.id))}
          >
            {item.img}
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <hr className="ml-5 mr-2 mt-3" />
      <div>
        <div className="flex items-center ml-6 mr-2 mt-3 px-2 py-2 hover:bg-slate-100 rounded-lg">
          <h1 className="font-semibold text-lg">You</h1>
          <IoIosArrowForward className="mt-1 ml-2" />
        </div>
        {yours.map((item) => (
          <div className="flex items-center gap-4 ml-6 mr-1 px-2 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer">
            {item.img}
            <div>{item.name}</div>
          </div>
        ))}
        <hr className="ml-5 mr-2 mt-3" />
      </div>
    </div>
  );
}

export default Sidebar;
