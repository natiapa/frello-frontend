import { CgProfile } from "react-icons/cg";
import { getRandomColor } from "../services/util.service";
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
  function handleClick(ev) {
    // const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsActivitiesOpen(true);
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
      <ul
        className="members"
        // onDrop={(ev) => drop(ev)}
        onDragOver={(ev) => allowDrop(ev)}
        style={{
          gridTemplateColumns: `repeat(${members.length}, 20px)`,
          placeSelf: "center end",
        }}
      >
        {members.map((member, idx) => (
          <li
            key={member.id}
            id={member.id}
            className="member"
            style={{
              backgroundColor: member.color || "#FFA500",
              gridColumn: `${idx + 1}`,
              marginLeft: idx * -0.1 + "px",
              zIndex: members.length - idx,
            }}
            draggable={true}
            onDragStart={(ev) => drag(ev)}
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
