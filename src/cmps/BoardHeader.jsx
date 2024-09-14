import { CgProfile } from "react-icons/cg";
import { getRandomColor } from "../services/util.service";
import { MdOutlineFilterList } from "react-icons/md";
import { Popover } from "@mui/material";
import { useState } from "react";
import { BoardFilter } from "./BoardFilter";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { filterBoard, updateBoard } from "../store/actions/board.actions";
import { RxDotsHorizontal } from "react-icons/rx";
import { HiDotsHorizontal } from "react-icons/hi";
import { useParams } from "react-router";
import { Activities } from "./Activities";
import { TbDots } from "react-icons/tb";
import { FaRegStar, FaStar } from "react-icons/fa";

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
  const [isHovered, setIsHovered] = useState(false);

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

  async function onUpdated(name, value) {
    if (!board) return;
    try {
      const updatedBoard = await boardService.updateBoard(board, null, null, {
        key: name,
        value: value,
      });
      await updateBoard(updatedBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  function setStarred() {
    if (board.isStarred) return false;
    else return true;
  }

  function handleIsStarred(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    setStarred();
    onUpdated("isStarred", setStarred());
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
      <div
        className="starred"
        onClick={(ev) => handleIsStarred(ev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!board.isStarred || isHovered ? <FaRegStar /> : <FaStar />}
      </div>
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
