import React from "react";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";

function MainContainer() {
  const toggleSidebarValue = useSelector(
    (state) => state.toggleSidebar.isOpenSidebar
  );
  return (
    <div
      className={`${
        toggleSidebarValue ? "w-[100%] pl-[200px]" : "w-[100%]"
      } `}
    >
      <VideoContainer />
    </div>
  );
}

export default MainContainer;
