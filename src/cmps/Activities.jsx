import { IoIosArrowBack } from "react-icons/io";
import SvgIcon from "./SvgIcon";

export function Activities({ board, setIsActivitiesOpen, setIsMenuOpen }) {
  return (
    <section
      className="activities-container"
      // style={{
      //   gridColumn: "3/4",
      //   gridRow: "2 / 5",
      //   backgroundColor: "#fff",
      // }}
    >
      <header className="activity-header">
        <span className="close-btn" onClick={() => setIsMenuOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <span className="back-btn" onClick={() => setIsActivitiesOpen(false)}>
          <IoIosArrowBack />
        </span>

        <h3>Activity</h3>
      </header>
      <hr></hr>
      <ul className="activities-list">
        {board.activities.map((activity) => {
          return (
            <li key={activity.id}>
              {/* <div className="member-img">{activity.byMember.fullname[0]}</div> */}
              <span className="activity-fullname">
                {activity.byMember.fullname}{" "}
              </span>
              <span className="activity-title">{activity.title} </span>

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
    </section>
  );
}
