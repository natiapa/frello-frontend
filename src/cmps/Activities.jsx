import SvgIcon from "./SvgIcon";

export function Activities({ board, setIsActivitiesOpen }) {
  return (
    <aside
      className="activities-container"
      style={{
        gridColumn: "3/4",
        gridRow: "2 / 5",
        backgroundColor: "#fff",
      }}
    >
      <span className="close-btn" onClick={() => setIsActivitiesOpen(false)}>
        <SvgIcon iconName="close" />
      </span>
      <h1>Activities</h1>
      <ul className="activities-list">
        {board.activities.map((activity) => {
          return (
            <li key={activity.id}>
              <span>{activity.byMember.fullname} </span>
              <span>{activity.title} </span>

              <span>
                at{" "}
                <a
                  className="link"
                  href={`/board/${board._id}/${activity.group.id}/${activity.task.id}`}
                >
                  {activity.task.title}
                </a>
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
