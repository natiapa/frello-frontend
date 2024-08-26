import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";

export function TaskDetailsActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState("checklist");

  function handleClick(ev) {
    setIsModalOpen((isOpen) => !isOpen);
    const dataName = ev.currentTarget.getAttribute("data-name");
    setAnchorEl(dataName);
    console.log(anchorEl);
  }
  return (
    <section className="actions">
      <button
        data-name="checklists"
        className="checklist"
        aria-describedby="1"
        onClick={handleClick}
      >
        <span className="icon">
          <IoMdCheckboxOutline />
          <span>Checklist</span>
        </span>

        {/* {isModalOpen && (
          <form action="">
          <input type="text" placeholder="Add an item" />
          <button className="add-checklist">Add checklist</button>
          </form>
          )} */}

        <Popover
          id="1"
          open={isModalOpen}
          anchorEl={anchorEl}
          //   onClose={handleClose}
          //   anchorOrigin={{
          //     vertical: "bottom",
          //     horizontal: "left",
          //   }}
          //   sx={{ zIndex: 100000000, position: "fixed" }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
      </button>
    </section>
  );
}
