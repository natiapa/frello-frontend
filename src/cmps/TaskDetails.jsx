export function TaskDetails({ task }) {
  const { title, members, labels } = task;
  return (
    <div className="task-details">
      <h1>{title}</h1>
      <ul>
        {members?.map((member) => {
          <li key={member.id}>{member.fullname}</li>;
        })}
      </ul>
      <ul>
        {labels?.map((labels) => {
          <li key={labels.title}>{labels}</li>;
        })}
      </ul>
    </div>
  );
}

{
  //   <dialog className="task-details">
  //   <h1 style={{ fontSize: "100px", color: "red", zIndex: "1000" }}>
  //     baba sabbabaab
  //   </h1>
  //   <Outlet />
  // </dialog>
  /* <dialog className="task-details">
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

</dialog> */
}
