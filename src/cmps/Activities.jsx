import { IoIosArrowBack } from "react-icons/io";
import SvgIcon from "./SvgIcon";

export function Activities({ board, setIsActivitiesOpen, setIsMenuOpen }) {
  console.log(board.activities);
  return (
    <section className="activities-container">
      <header className="activity-header">
        <span className="close-btn" onClick={() => setIsMenuOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <span className="back-btn" onClick={() => setIsActivitiesOpen(false)}>
          <IoIosArrowBack />
        </span>

        <h3>Activity</h3>
      </header>
      <ul className="activities-list">
        {board.activities.map((activity) => (
          <li key={activity.id} className="activity">
            <div
              className="member-img"
              style={{
                backgroundColor: activity.byMember.color
                  ? activity.byMember.color
                  : "none",
                // backgroundImage: activity.byMember.imgUrl
                //   ? `url(${activity.byMember.imgUrl})`
                //   : "none",
              }}
            >
              {activity.byMember.fullname[0]}
            </div>
            <section className="activity-data" style={{ gridColumn: "2" }}>
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
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
