export function DueDateDisplay({ dueDate }) {
  const { createdAt, date, time, isComplete, completedAt } = dueDate;

  const formatStartDate = createdAt ? formatDateTimeForTask(createdAt) : null;
  const formatDueDate = date ? formatDateTimeForTask(date, time) : null;

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

  if (!dueDate) return null;
  return (
    <div className="due-date-display">
      {createdAt && !date && (
        <div className="date-item">
          <span className="date-label">Start date :</span>
          <span className="date-value start-date">{formatStartDate}</span>
        </div>
      )}

      {date && !createdAt && (
        <div className="date-item">
          <span className="date-label">Due date</span>
          <span className="date-value due-date">{formatDueDate}</span>
        </div>
      )}

      {createdAt && date && (
        <div className="date-item">
          <span className="date-label">dates</span>
          <span className="date-value">
            {formatStartDate} - {formatDueDate}
          </span>
        </div>
      )}
    </div>
  );
}
