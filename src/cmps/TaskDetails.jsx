import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export function TaskDetails({ task, id, handleClose, anchorEl }) {
  // const { title, members, labels } = task

  return (

    <div className="task-details">

    <h1 style={{fontSize:'100px', color: 'red', zIndex: '1000'}}>baba sabbabaab</h1>
    </div>
  );
}

{/* <dialog className="task-details">
<h1> {title}</h1>
<ul>
  {members.map(member => {
    <li key={member.id}>
      {member.fullname}
    </li>
  })}
</ul>
<ul>
  {labels.map(labels => {
    <li key={labels.title}>
      {labels}
    </li>
  })}
</ul>

</dialog> */}