import { useState } from "react";
import { Activities } from "./Activities";
import { ChangeBg } from "./ChangeBg";
import SvgIcon from "./SvgIcon";
import { IoIosArrowBack } from "react-icons/io";

export function Menu({ board, isMenuOpen, setIsMenuOpen }) {
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isChangeBgOpen, setIsChangeBgOpen] = useState(false);
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
