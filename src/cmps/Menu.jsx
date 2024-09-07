import { useState } from "react";
import { Activities } from "./Activities";
import { ChangeBg } from "./ChangeBg";
import SvgIcon from "./SvgIcon";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router";

export function Menu({
  board,
  isMenuOpen,
  setIsMenuOpen,
  setCurrBoardBgStyle,
}) {
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isChangeBgOpen, setIsChangeBgOpen] = useState(false);

  const { taskId } = useParams();
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

          <button onClick={() => setIsActivitiesOpen(true)}>
            <span>Activity</span>
          </button>
          <button onClick={() => setIsChangeBgOpen(true)}>
            <span>Change background</span>
          </button>
        </>
      )}
    </aside>
  );
}
