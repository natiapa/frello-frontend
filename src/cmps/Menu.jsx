import { useState } from "react";
import { Activities } from "./Activities";
import { ChangeBg } from "./ChangeBg";
import SvgIcon from "./SvgIcon";
import { IoIosArrowBack, IoMdList } from "react-icons/io";
import { useParams } from "react-router";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";

export function Menu({
  board,
  isMenuOpen,
  setIsMenuOpen,
  setCurrBoardBgStyle,
}) {
  const { taskId } = useParams();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isChangeBgOpen, setIsChangeBgOpen] = useState(false);

  if (taskId) setIsMenuOpen(false);
  return (
    <aside className="menu">
      {isActivitiesOpen && !isChangeBgOpen && (
        <Activities
          board={board}
          setIsActivitiesOpen={setIsActivitiesOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      {isChangeBgOpen && !isActivitiesOpen && (
        <ChangeBg
          board={board}
          setIsChangeBgOpen={setIsChangeBgOpen}
          setIsMenuOpen={setIsMenuOpen}
          setCurrBoardBgStyle={setCurrBoardBgStyle}
        />
      )}

      {!isActivitiesOpen && !isChangeBgOpen && (
        <>
          {/* {!isActivitiesOpen && !isChangeBgOpen && <h3>Menu</h3>} */}
          <header className="menu-header">
            <span className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <SvgIcon iconName="close" />
            </span>

            <h3>Menu</h3>
          </header>

          <button
            className="menu-btn"
            onClick={() => setIsActivitiesOpen(true)}
          >
            <FaListCheck />
            <span className="activity-btn">Activity</span>
          </button>

          <button
            className="change-bg menu-btn"
            onClick={() => setIsChangeBgOpen(true)}
          >
            <span
              className="color-container"
              style={{
                backgroundColor: board?.style?.backgroundColor
                  ? board.style.backgroundColor
                  : "none",

                backgroundImage: board?.style?.backgroundImage
                  ? `url(${board.style.backgroundImage})`
                  : "none",

                backgroundSize: "cover",
              }}
            ></span>
            <span className="change-bg-btn">Change background</span>
          </button>

          <button className="copy-board-btn menu-btn">
            <MdOutlineContentCopy />
            <span className="btn">Copy board</span>
          </button>

          <button className="menu-btn">
            <IoShareSocialOutline />
            <span className="btn">Share</span>
          </button>
        </>
      )}
    </aside>
  );
}
