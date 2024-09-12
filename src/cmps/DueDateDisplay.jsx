import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LuClock5 } from "react-icons/lu";
import { useParams } from "react-router";

export function DueDateDisplay({ dueDate, setNewDueDate, onUpdated }) {
  const { taskId } = useParams();

  if (!dueDate) {
    return null;
  }
  const { createdAt, date, time, isComplete, completedAt } = dueDate;
  const [isChecked, setIsChecked] = useState(isComplete || false);
  const formatStartDate = createdAt ? formatDateTimeForTask(createdAt) : null;
  const formatDueDate = date ? formatDateTimeForTask(date, time) : null;
  const [isHovered, setIsHovered] = useState(false);

  function formatDateForTask(dateString) {
    const date = new Date(dateString.split("/").reverse().join("-"));
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();

    if (year === currentYear) {
      return formattedDate;
    } else {
      return `${formattedDate}, ${year}`;
    }
  }

  function formatDateTimeForTask(date, time) {
    const formattedDate = formatDateForTask(date);
    const formattedTime = time
      ? new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return formattedTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
  }

  function handleCompleteChange() {
    const newIsChecked = !isChecked;
    console.log(newIsChecked);
    setIsChecked(newIsChecked);

    const updatedDueDate = { ...dueDate, isComplete: newIsChecked };
    onUpdated("dueDate", updatedDueDate);
    setNewDueDate(updatedDueDate);

    if (newIsChecked) {
      console.log("Task completed:", updatedDueDate);
    }
  }

  function handleClick(ev) {
    if (taskId) return;
    ev.preventDefault();
    ev.stopPropagation();
  }

  if (!dueDate) return null;
  return (
    <div className="due-date-display" onClick={(ev) => handleClick(ev)}>
      {createdAt && !date && (
        <div className="date-item">
          {taskId && (
            <span
              className="date-label"
              style={{ backgroundColor: "transparent" }}
            >
              Start date :
            </span>
          )}
          <section className="date-container">
            <span
              className="date-value start-date"
              style={{ backgroundColor: "transparent" }}
            >
              <LuClock5 className="clock" />
              {formatStartDate}
            </span>
            <BsChevronDown className="date-picker-icon" />
          </section>
        </div>
      )}

      {date && !createdAt && (
        <div className="date-item">
          {taskId && <span className="date-label">Due date</span>}
          <section className={`date-container ${isChecked ? "green-bg" : ""}`}>
            {isChecked && !taskId && (
              <span
                className="checkbox-icon"
                onClick={handleCompleteChange}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? <IoMdCheckboxOutline /> : <LuClock5 />}
              </span>
            )}

            {taskId && (
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCompleteChange}
              />
            )}

            {!isChecked && !taskId && (
              <span
                className="icon-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCompleteChange}
                  />
                ) : (
                  <LuClock5 />
                )}
              </span>
            )}

            <span className="date-value due-date">
              {formatDueDate}
              {taskId && isChecked && (
                <span className="complete-badge">Complete</span>
              )}
            </span>

            <BsChevronDown className="date-picker-icon" />
          </section>
        </div>
      )}

      {createdAt && date && (
        <div className="date-item">
          {taskId && <span className="date-label">dates</span>}
          <section
            className={`date-container ${isChecked ? "green-bg" : ""}`}
            // style={{
            //   backgroundColor: !taskId && isChecked ? "#1f845a" : "transparent",
            //   color: !taskId && isChecked ? "#fff" : "#172b4d",
            // }}
          >
            {!taskId && isChecked && (
              <span
                className="checkbox-icon"
                onClick={handleCompleteChange}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? (
                  <IoMdCheckboxOutline />
                ) : (
                  <LuClock5 className="clock" />
                )}
              </span>
            )}
            {!taskId && !isChecked && (
              <span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ margin: "0" }}
              >
                {isHovered ? (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCompleteChange}
                  />
                ) : (
                  <LuClock5 className="clock" />
                )}
              </span>
            )}

            {taskId && (
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCompleteChange}
              />
            )}
            <span className="date-value">
              {`${formatStartDate} - ${formatDueDate}`}
              {taskId && isChecked && (
                <span className="complete-badge">Complete</span>
              )}
            </span>
            <BsChevronDown className="date-picker-icon" />
          </section>
        </div>
      )}
    </div>
  );
}
