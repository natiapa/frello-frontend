import { useState } from "react";
import { Activities } from "./Activities";
import { ChangeBg } from "./ChangeBg";

export function Menu({ board, isMenuOpen, setIsMenuOpen, setCurrBoard }) {
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isChangeBgOpen, setIsChangeBgOpen] = useState(false);
  return (
    <aside className="menu">
      {isActivitiesOpen && !isChangeBgOpen && (
        <Activities board={board} setIsActivitiesOpen={setIsActivitiesOpen} />
      )}

      {isChangeBgOpen && !isActivitiesOpen && (
        <ChangeBg
          board={board}
          setCurrBoard={setCurrBoard}
          setIsChangeBgOpen={setIsChangeBgOpen}
        />
      )}

      {!isActivitiesOpen && !isChangeBgOpen && (
        <>
          {!isActivitiesOpen && !isChangeBgOpen && <h3>Menu</h3>}
          <button onClick={() => setIsActivitiesOpen(true)}>Activity</button>
          <button onClick={() => setIsChangeBgOpen(true)}>
            <span>Change background</span>
          </button>
        </>
      )}
    </aside>
  );
}
