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
import { useParams } from "react-router";
import { Activities } from "./Activities";
import { TbDots } from "react-icons/tb";

export function BoardHeader({
  members,
  bgColor,
  allowDrop,
  drag,
  setIsMenuOpen,
  isMenuOpen,
}) {
  const board = useSelector((storeState) => storeState.boardModule.board);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleFilterClick(ev) {
    setAnchorEl(ev.currentTarget);
    setIsPopoverOpen((isOpen) => !isOpen);
  }

  function handleMenuBtnClick() {
    setIsMenuOpen(true);
  }

  function clearFilter() {
    filterBoard(boardService.getDefaultFilter());
  }

  return (
    <section
      className="board-header"
      style={{
        gridColumn: isMenuOpen ? "2/3" : "2/-1",
        columnGap: isMenuOpen ? "1em" : "",
      }}
    >
      <div className="board-header-title">{board?.title}</div>
      {/* <div className="board-header-actions"></div> */}
      <div
        className="filter"
        onClick={handleFilterClick}
        style={{
          gridColumn: isMenuOpen ? "3" : "2",
        }}
      >
        <p
          style={{
            paddingInlineEnd: isMenuOpen ? "0" : "10px",
          }}
        >
          <span>
            <MdOutlineFilterList />
          </span>
          <span>Filters</span>
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
          gridColumn: isMenuOpen ? "4" : "3",
          gridTemplateColumns: `repeat(${members.length}, 20px)`,
          placeSelf: "center end",
        }}
      >
        {members.map((member, idx) => (
          <li
            key={member.id}
            id={member.id}
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

      {!isMenuOpen && (
        <div
          className="activity-menu"
          data-name="activities"
          onClick={handleMenuBtnClick}
        >
          <span>
            <TbDots />
          </span>
        </div>
      )}
    </section>
  );
}
