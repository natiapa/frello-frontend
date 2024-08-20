import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export function TaskDetails({ task, id, handleClose, anchorEl }) {
  return (
    <div className="task-details">
      <Popover
        id={task.id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
}
