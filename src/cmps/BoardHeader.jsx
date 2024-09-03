import { CgProfile } from "react-icons/cg";
import { getRandomColor } from "../services/util.service";
import { MdOutlineFilterList } from "react-icons/md";
import { Popover } from "@mui/material";
import { useState } from "react";
import { BoardFilter } from "./BoardFilter";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { filterBoard } from "../store/actions/board.actions";
import { RxDotsHorizontal } from "react-icons/rx";
import { HiDotsHorizontal } from "react-icons/hi";
import { Popover } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { Activities } from "./Activities";

export function BoardHeader({
  members,
  bgColor,
  allowDrop,
  drag,
  setIsActivitiesOpen,
  isActivitiesOpen,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleClick(ev) {
    setAnchorEl(ev.currentTarget);
    setIsPopoverOpen((isOpen) => !isOpen);
    setIsActivitiesOpen(true);
  }

  function clearFilter() {
    filterBoard(boardService.getDefaultFilter());
  }

  return (
    <section
      className="board-header"
      style={{
        gridColumn: isActivitiesOpen ? "2/3" : "2/-1",
      }}
    >
      <div className="board-header-title">Frello</div>
      <div className="board-header-actions"></div>
      <div className="filter" onClick={handleClick}>
        <p>
          <span>
            <MdOutlineFilterList />
          </span>
          Filters
          <Popover
            id={anchorEl}
            open={isPopoverOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <BoardFilter />
          </Popover>
        </p>
      </div>
      {/* <button className="btn-clear" onClick={clearFilter}>
                    Clear
                </button> */}
      <ul
        className="members"
        onDragOver={(ev) => allowDrop(ev)}
        style={{
          gridTemplateColumns: `repeat(${members.length}, 20px)`,
          placeSelf: "center end",
        }}
      >
        {members.map((member) => (
          <li
            key={member.id}
            className="member"
            draggable={true}
            onDragStart={(ev) => drag(ev)}
            style={{
              backgroundColor: member.color || "#FFA500",
              gridColumn: `${idx + 1}`,
              marginLeft: idx * -0.1 + "px",
              zIndex: members.length - idx,
            }}
          >
            {member.fullname[0]}
          </li>
        ))}
      </ul>

      {!isActivitiesOpen && (
        <div
          className="activity-menu"
          data-name="activities"
          onClick={handleClick}
        >
          <span>
            <HiDotsHorizontal />
          </span>
        </div>
      )}
    </section>
  );
}
